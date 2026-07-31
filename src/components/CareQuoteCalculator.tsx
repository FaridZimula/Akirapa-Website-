import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const CareQuoteCalculator: React.FC = () => {
  const { toast } = useToast();
  const [careType, setCareType] = useState<"hourly" | "daily" | "respite" | "specialized">("hourly");
  const [hoursPerDay, setHoursPerDay] = useState<number>(4);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hourly base rates ($32 - $38/hr)
  const HOURLY_RATE = 35;
  const DAILY_RATE = 320; // 24-hr shift flat rate estimate

  const calculateEstimate = () => {
    if (careType === "daily") {
      return DAILY_RATE * daysPerWeek * 4; // Monthly estimate
    }
    return HOURLY_RATE * hoursPerDay * daysPerWeek * 4; // Monthly estimate
  };

  const estimatedMonthly = calculateEstimate();
  const estimatedWeekly = Math.round(estimatedMonthly / 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Quote Request Received!",
      description: "Our Burlington care coordinator will contact you shortly with a personalized care proposal.",
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#76248a] flex items-center justify-center text-[#40ddd3] shadow-md">
            <i className="fa-solid fa-calculator text-2xl text-[#40ddd3]"></i>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">
              Free Care Cost Estimator
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Calculate an instant estimated care plan or request a personalized quote.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Care Type Selection */}
          <div>
            <Label className="text-gray-900 font-bold text-base mb-3 block">
              1. Select Type of Home Care Needed
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "hourly", label: "Hourly Care", iconClass: "fa-solid fa-clock" },
                { id: "daily", label: "24/7 Daily Care", iconClass: "fa-solid fa-calendar-days" },
                { id: "respite", label: "Respite Care", iconClass: "fa-solid fa-hand-holding-heart" },
                { id: "specialized", label: "Specialized Care", iconClass: "fa-solid fa-shield-halved" },
              ].map((item) => {
                const isSelected = careType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCareType(item.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col items-center justify-center text-center gap-2 ${
                      isSelected
                        ? "border-[#76248a] bg-[#76248a] text-white shadow-md"
                        : "border-gray-200 bg-gray-50/50 text-gray-700 hover:border-[#76248a]/50"
                    }`}
                  >
                    <i className={`${item.iconClass} text-xl ${isSelected ? "text-[#40ddd3]" : "text-[#76248a]"}`}></i>
                    <span className="font-bold text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hours & Days Selection */}
          {careType !== "daily" && (
            <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div>
                <Label className="text-gray-800 font-bold text-sm mb-2 block">
                  Hours Needed Per Visit: <span className="text-[#76248a]">{hoursPerDay} hours</span>
                </Label>
                <input
                  type="range"
                  min={3}
                  max={12}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  className="w-full accent-[#76248a] h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3 hrs</span>
                  <span>6 hrs</span>
                  <span>12 hrs</span>
                </div>
              </div>

              <div>
                <Label className="text-gray-800 font-bold text-sm mb-2 block">
                  Days Per Week: <span className="text-[#76248a]">{daysPerWeek} days</span>
                </Label>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                  className="w-full accent-[#76248a] h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>4 days</span>
                  <span>7 days</span>
                </div>
              </div>
            </div>
          )}

          {/* Estimate Display Box */}
          <div className="bg-[#76248a] p-6 rounded-2xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-[#40ddd3]/30">
            <div>
              <span className="text-[#40ddd3] text-xs font-black uppercase tracking-wider block mb-1">
                Estimated Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-white">
                  ${estimatedWeekly.toLocaleString()}
                </span>
                <span className="text-white/80 text-sm font-medium">/ week</span>
                <span className="text-[#40ddd3] text-xs font-semibold ml-2">
                  (~${estimatedMonthly.toLocaleString()}/mo)
                </span>
              </div>
              <p className="text-white/70 text-xs mt-1">
                *Final rates are confirmed during your free in-home assessment.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-white/90 bg-[#40ddd3]/20 px-3 py-1 rounded-full font-bold">
                Contract-Free & Flexible
              </span>
            </div>
          </div>

          {/* Contact Details to Lock in Quote */}
          {!isSubmitted ? (
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-gray-900 text-lg">Lock in Your Free Care Quote</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q-name" className="text-xs font-semibold text-gray-700 mb-1 block">Full Name</Label>
                  <Input
                    id="q-name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="q-phone" className="text-xs font-semibold text-gray-700 mb-1 block">Phone Number</Label>
                  <Input
                    id="q-phone"
                    placeholder="339-970-1214"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="q-email" className="text-xs font-semibold text-gray-700 mb-1 block">Email Address</Label>
                  <Input
                    id="q-email"
                    type="email"
                    placeholder="info@akirapahomecareus.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-bold text-lg py-6 rounded-2xl shadow-lg">
                Submit Quote Request
              </Button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-2">
              <i className="fa-solid fa-circle-check text-4xl text-green-600 mx-auto"></i>
              <h4 className="text-xl font-bold text-green-900">Thank You!</h4>
              <p className="text-green-800 text-sm">
                Your quote estimate has been sent to our Burlington care team. We will call you at {phone} to confirm details.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
