import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { Navbar } from "../components/Navbar";
import { GlassCard } from "../components/ui/GlassCard";
import { Users, DollarSign, Activity, FileText } from "lucide-react";

interface Transaction {
  id: string;
  user_email: string;
  course_title: string;
  created_at: string;
  amount: number;
  status: string;
}

export default function Dashboard() {
  const { session } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    revenue: 0,
    students: 0,
    newRegistrations: 0,
    coursesSold: 0
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching transactions:", error);
        return;
      }
      
      if (data) {
        setTransactions(data);
        
        let totalRev = 0;
        let successfulTx = 0;
        const uniqueUsers = new Set();
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        let newRegs = 0;

        data.forEach((tx: any) => {
          if (tx.status === 'Success') {
            totalRev += Number(tx.amount);
            successfulTx += 1;
            uniqueUsers.add(tx.user_email);
            
            const txDate = new Date(tx.created_at);
            if (txDate >= oneWeekAgo) {
              newRegs += 1;
            }
          }
        });

        setStats({
          revenue: totalRev,
          students: uniqueUsers.size,
          newRegistrations: newRegs,
          coursesSold: successfulTx
        });
      }
    };
    
    fetchTransactions();
    
    const channel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        (payload) => {
          console.log("Realtime change received!", payload);
          fetchTransactions();
        }
      )
      .subscribe((status) => {
        console.log("Supabase Realtime subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const userEmail = session?.user.email || "Admin";
  const userName = userEmail.split('@')[0];

  return (
    <div className="min-h-screen text-foreground font-sans relative page-hero-bg pb-24">
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar session={session} handleLogout={handleLogout} />

        {/* Dashboard Content */}
        <div className="pt-24 md:pt-32 max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Welcome Header */}
          <div className="mb-8 md:mb-12">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
              Overview, <span className="text-primary capitalize">{userName}</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg">Here's what's happening with T4 Traders today.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <GlassCard className="p-4 sm:p-6 bg-white/5 border-white/10 flex flex-col justify-between min-h-[8rem]">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">Total Revenue</span>
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">₹{stats.revenue.toLocaleString('en-IN')}</div>
            </GlassCard>
            
            <GlassCard className="p-4 sm:p-6 bg-white/5 border-white/10 flex flex-col justify-between min-h-[8rem]">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">Active Students</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{stats.students}</div>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 bg-white/5 border-white/10 flex flex-col justify-between min-h-[8rem]">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">New Registrations</span>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">+{stats.newRegistrations}</div>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 bg-white/5 border-white/10 flex flex-col justify-between min-h-[8rem]">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">Courses Sold</span>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{stats.coursesSold}</div>
            </GlassCard>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 w-full">
            
            {/* Left Column: Recent Activity Table */}
            <div className="lg:col-span-8 space-y-8 w-full min-w-0">
              <GlassCard className="p-0 bg-white/5 border-white/10 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Recent Transactions</h3>
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-white/5 text-gray-400 uppercase text-[10px] sm:text-xs tracking-wider">
                      <tr>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">User</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Course</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Date</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Amount</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300 text-xs sm:text-sm">
                      {transactions.length > 0 ? transactions.slice(0, 10).map((tx, i) => (
                        <tr key={tx.id || i} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{tx.user_email}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap font-medium text-white">{tx.course_title}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-gray-500">
                            {new Date(tx.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">₹{Number(tx.amount).toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                            No transactions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Quick Stats / Notifications */}
            <div className="lg:col-span-4 space-y-8 w-full min-w-0">
              <GlassCard className="p-4 sm:p-6 bg-white/5 border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">System Status</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-sm text-gray-400">Payment Gateway</span>
                    <span className="flex items-center text-xs font-medium text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-sm text-gray-400">Student Portal</span>
                    <span className="flex items-center text-xs font-medium text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-sm text-gray-400">Live Streaming API</span>
                    <span className="flex items-center text-xs font-medium text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Operational
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}