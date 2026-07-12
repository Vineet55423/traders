
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { UserProfile } from "../components/ui/UserProfile";
import { MobileMenu } from "../components/MobileMenu";
import { GlassCard } from "../components/ui/GlassCard";
import logoi from "../assets/logoi.png";
import { Users, DollarSign, Activity, FileText } from "lucide-react";
import { isAdmin } from "../lib/admin";

export default function Dashboard() {
  const { session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const userEmail = session?.user.email || "Admin";
  const userName = userEmail.split('@')[0];

  return (
    <div className="min-h-screen text-foreground font-sans relative page-hero-bg pb-24">
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-6 pt-8">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 relative">
            <div className="flex items-center z-10 -ml-22 md:-ml-32">
              <Link to="/#home" className="flex items-center">
                <img 
                  src={logoi}
                  alt="T4 Trader" 
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain transform origin-left"
                />
              </Link>
            </div>

            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-16 bg-white/10 backdrop-blur-md border border-white/10 px-12 py-2.5 rounded-full shadow-lg z-10">
              <Link to="/#home" className="text-sm font-medium hover:text-white transition-colors text-white/70">Home</Link>
              <Link to="/course" className="text-sm font-medium hover:text-white transition-colors text-white/70">Course</Link>
              {session && isAdmin(session.user?.email) && (
                <Link to="/dashboard" className="text-sm font-medium text-white hover:text-white transition-colors">Dashboard</Link>
              )}
              <Link to="/#faq" className="text-sm font-medium text-white/70 hover:text-white transition-colors">FAQs</Link>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4 z-10">
              {session && (
                <UserProfile session={session} handleLogout={handleLogout} />
              )}

              <MobileMenu
                links={[
                  { label: "Home", to: "/#home" },
                  { label: "Course", to: "/course" },
                  ...(session && isAdmin(session.user?.email) ? [{ label: "Dashboard", to: "/dashboard" }] : []),
                  { label: "FAQs", to: "/#faq" },
                ]}
              />
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="pt-32 max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Welcome Header */}
          <div className="mb-12">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              Admin Portal
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Overview, <span className="text-primary capitalize">{userName}</span>
            </h1>
            <p className="text-gray-400 text-lg">Here's what's happening with T4 Traders today.</p>
          </div>

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mb-8">
            <GlassCard className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">Total Revenue</span>
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">₹1,24,500</div>
            </GlassCard>
            
            <GlassCard className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">Active Students</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">342</div>
            </GlassCard>

            <GlassCard className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">New Registrations</span>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">+12</div>
            </GlassCard>

            <GlassCard className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-medium text-sm">Courses Sold</span>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">89</div>
            </GlassCard>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column: Recent Activity Table */}
            <div className="lg:col-span-8 space-y-8">
              <GlassCard className="p-0 bg-white/5 border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-medium">User</th>
                        <th className="px-6 py-4 font-medium">Course</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Amount</th>
                        <th className="px-6 py-4 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {[
                        { user: "johndoe@gmail.com", course: "SMC (Smart Money Concept)", date: "Today, 10:23 AM", amount: "₹30,000", status: "Success" },
                        { user: "meera.s@yahoo.com", course: "Price Action", date: "Today, 09:15 AM", amount: "₹20,000", status: "Success" },
                        { user: "rahul99@gmail.com", course: "Advanced Concept (MSNR)", date: "Yesterday, 04:30 PM", amount: "₹25,000", status: "Success" },
                        { user: "karan.v@gmail.com", course: "Risk Management", date: "Yesterday, 11:20 AM", amount: "₹15,000", status: "Failed" },
                      ].map((tx, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">{tx.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{tx.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{tx.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{tx.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Quick Stats / Notifications */}
            <div className="lg:col-span-4 space-y-8">
              <GlassCard className="p-6 bg-white/5 border-white/10">
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