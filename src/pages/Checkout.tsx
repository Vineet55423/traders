import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, CheckCircle2, CreditCard, Wallet, 
  Smartphone, Lock, Tag, ChevronRight, Check
} from "lucide-react";
import { courses, type Course } from "../data/courses";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { Input } from "../components/ui/Input";

export default function Checkout() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "paypal">("card");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Link to="/course">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "T4FREE") {
      setDiscount(course.price);
      setCouponStatus("success");
    } else {
      setDiscount(0);
      setCouponStatus("error");
    }
  };

  const finalPrice = Math.max(0, course.price - discount);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white page-hero-bg">
        <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 max-w-md w-full p-8 text-center"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-serif mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-8">
            Welcome to {course.title}. You will receive an email shortly with your access details.
          </p>
          <Link to="/course">
            <Button className="w-full">Go to Course</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground font-sans relative page-hero-bg pb-24">
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>

      <nav className="relative z-50 p-6 pt-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4">
          <Link
            to="/course"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
          <div className="text-2xl font-serif text-white tracking-wide">
            Checkout
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Course Details & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Course Summary */}
            <GlassCard className="p-8 bg-white/5 border-white/10">
              <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                Selected Course
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {course.desc}
              </p>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">What you'll learn:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Payment Methods */}
            <GlassCard className="p-8 bg-white/5 border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-primary" />
                Secure Payment
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    paymentMethod === "card" 
                      ? "bg-primary/20 border-primary text-white" 
                      : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">Card</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    paymentMethod === "upi" 
                      ? "bg-primary/20 border-primary text-white" 
                      : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <Smartphone className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">UPI</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    paymentMethod === "paypal" 
                      ? "bg-primary/20 border-primary text-white" 
                      : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <Wallet className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">PayPal</span>
                </button>
              </div>

              {/* Dynamic Payment Form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={paymentMethod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Card Number</label>
                        <Input placeholder="0000 0000 0000 0000" className="bg-black/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 uppercase tracking-wider">Expiry Date</label>
                          <Input placeholder="MM/YY" className="bg-black/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 uppercase tracking-wider">CVV</label>
                          <Input placeholder="123" type="password" maxLength={4} className="bg-black/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Cardholder Name</label>
                        <Input placeholder="John Doe" className="bg-black/50" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary flex items-start mb-4">
                        <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                        <p>Pay instantly using any UPI app (Google Pay, PhonePe, Paytm, etc.)</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Enter your UPI ID</label>
                        <Input placeholder="username@upi" className="bg-black/50" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="space-y-4 text-center py-6">
                      <Wallet className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-300 text-sm mb-4">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </GlassCard>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <GlassCard className="p-8 bg-white/5 border-white/10 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="flex justify-between items-center mb-4 text-gray-300">
                <span className="text-sm">Original Price</span>
                <span className="font-medium">₹{course.price.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center mb-4 text-primary">
                  <span className="text-sm">Discount</span>
                  <span className="font-medium">-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-white/10 my-6 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base text-white font-medium">Total</span>
                  <div className="text-right">
                    {discount > 0 && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        ₹{course.price.toLocaleString()}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-white">
                      ₹{finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-right">Includes all applicable taxes</p>
              </div>

              {/* Coupon Section */}
              <div className="mt-8 mb-8 p-4 bg-black/30 rounded-xl border border-white/5">
                <label className="text-xs text-gray-400 font-medium mb-2 flex items-center">
                  <Tag className="w-3 h-3 mr-1.5" /> Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter code" 
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponStatus("idle");
                    }}
                    className="bg-black/50 border-white/10 uppercase"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} className="border-white/20 hover:bg-white/10">
                    Apply
                  </Button>
                </div>
                {couponStatus === "success" && (
                  <p className="text-xs text-primary mt-2 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Coupon applied successfully!
                  </p>
                )}
                {couponStatus === "error" && (
                  <p className="text-xs text-red-400 mt-2">
                    Invalid coupon code.
                  </p>
                )}
              </div>

              <Button 
                className="w-full py-4 text-lg group" 
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center w-full">
                    {finalPrice === 0 ? "Enroll for Free" : "Complete Purchase"}
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
              
              <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                <Lock className="w-3 h-3 mr-1.5" />
                Guaranteed safe & secure checkout
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
}
