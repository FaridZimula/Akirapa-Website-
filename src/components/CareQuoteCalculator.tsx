import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const CareQuoteCalculator: React.FC = () => {
  const { toast } = useToast();
  const [supportTime, setSupportTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic estimate calculation based on selected duration
  const getEstimatedWeekly = () => {
    if (duration.includes("24 Hours") || duration.includes("Live-in")) {
      return 2240; // Flat rate for 24/7 care (~$320/day * 7)
    }
    if (duration.includes("9 to 12")) {
      return 1400; // ~$35/hr * 10 hrs * 4 days
    }
    if (duration.includes("5 to 8")) {
      return 980; // ~$35/hr * 7 hrs * 4 days
    }
    if (duration.includes("3 to 4")) {
      return 560; // ~$35/hr * 4 hrs * 4 days
    }
    return 700; // Default estimate
  };

  const estimatedWeekly = getEstimatedWeekly();
  const estimatedMonthly = estimatedWeekly * 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await fetch("https://formsubmit.co/ajax/info@akirapahomecareus.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Quote Calculator Request from ${phone || "Website Visitor"}`,
          _template: "table",
          _captcha: "false",
          "Phone Number": phone || "Not provided",
          "Support Timeline": supportTime || "Not specified",
          "Preferred Arrival Time": arrivalTime || "Not specified",
          "Care Duration": duration || "Not specified",
          "Location": location || "Not specified",
          "Estimated Weekly Investment": `$${estimatedWeekly.toLocaleString()}`,
          "Estimated Monthly Investment": `$${estimatedMonthly.toLocaleString()}`,
        }),
      });

      toast({
        title: "Quote Request Submitted!",
        description: "Our Bedford care team will reach out promptly to discuss your care quote.",
      });
    } catch (error) {
      toast({
        title: "Quote Request Received!",
        description: "Thank you! Our care coordinator will contact you shortly.",
      });
    }
  };

  return (
    <div className="bg-[#76248a] rounded-3xl p-8 md:p-12 lg:p-14 shadow-2xl text-white relative overflow-hidden border border-white/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column - Heading & Call to Action text */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Quote calculator
          </h2>
          
          <p className="text-[#40ddd3] text-base md:text-lg leading-relaxed font-medium">
            If you require services on a public holiday, overnight services or live-in services, please call{" "}
            <a href="tel:3399701214" className="font-bold underline hover:opacity-80 transition-opacity text-[#40ddd3]">
              339 970 1214
            </a>{" "}
            so we can discuss prices with you.
          </p>

          {/* Real-time Estimated Badge */}
          {duration && (
            <div className="pt-2">
              <div className="bg-[#40ddd3]/15 border border-[#40ddd3]/40 rounded-2xl p-4 inline-block">
                <span className="text-xs uppercase font-extrabold text-[#40ddd3] block">Estimated Care Rate</span>
                <span className="text-2xl font-black text-white">${estimatedWeekly.toLocaleString()} <span className="text-xs font-normal text-white/80">/ week</span></span>
                <span className="text-xs text-[#40ddd3] block mt-0.5">(~${estimatedMonthly.toLocaleString()}/mo)</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Form Input Fields Grid */}
        <div className="lg:col-span-7">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              
              {/* Field 1: Support Timeline */}
              <div className="relative">
                <select
                  value={supportTime}
                  onChange={(e) => setSupportTime(e.target.value)}
                  className="w-full h-14 px-5 pr-10 rounded-xl bg-white text-gray-800 font-semibold text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                >
                  <option value="" disabled>when would you like our support?</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Next few weeks">Next few weeks</option>
                  <option value="Flexible date">Flexible date</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </div>
              </div>

              {/* Field 2: Arrival Time */}
              <div className="relative">
                <select
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full h-14 px-5 pr-10 rounded-xl bg-white text-gray-800 font-semibold text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                >
                  <option value="" disabled>when would you like us to arrive?</option>
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                  <option value="24/7 Overnight / Full Day">24/7 Overnight / Full Day</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </div>
              </div>

              {/* Field 3: Duration (Cyan highlighted field as in screenshot) */}
              <div className="relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full h-14 px-5 pr-10 rounded-xl bg-[#40ddd3] text-gray-900 font-bold text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="" disabled className="bg-white text-gray-800">how long should we stay?</option>
                  <option value="3 to 4 hours per visit" className="bg-white text-gray-800">3 to 4 hours per visit</option>
                  <option value="5 to 8 hours per visit" className="bg-white text-gray-800">5 to 8 hours per visit</option>
                  <option value="9 to 12 hours per visit" className="bg-white text-gray-800">9 to 12 hours per visit</option>
                  <option value="24 Hours / Live-in Care" className="bg-white text-gray-800">24 Hours / Live-in Care</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-900">
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </div>
              </div>

              {/* Field 4: Location */}
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-14 px-5 pr-10 rounded-xl bg-white text-gray-800 font-semibold text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                >
                  <option value="" disabled>where are you located?</option>
                  <option value="Bedford, MA">Bedford, MA</option>
                  <option value="Woburn, MA">Woburn, MA</option>
                  <option value="Lexington, MA">Lexington, MA</option>
                  <option value="Billerica, MA">Billerica, MA</option>
                  <option value="Waltham, MA">Waltham, MA</option>
                  <option value="Other MA Location">Other MA Location</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </div>
              </div>

              {/* Field 5: Phone Number Input */}
              <div>
                <input
                  type="tel"
                  placeholder="your phone number if you'd like us to call"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-14 px-5 rounded-xl bg-white text-gray-800 font-semibold text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                />
              </div>

              {/* Field 6: Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-14 bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold tracking-wider uppercase text-base rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center"
                >
                  SUBMIT
                </button>
              </div>

            </form>
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center space-y-4">
              <i className="fa-solid fa-circle-check text-5xl text-[#40ddd3] mx-auto"></i>
              <h3 className="text-2xl font-extrabold text-white">Thank You!</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto">
                We have received your quote request. Our care coordinator in Bedford, MA will call you at <strong className="text-[#40ddd3]">{phone || "your number"}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="inline-block text-xs font-bold text-[#40ddd3] hover:underline pt-2"
              >
                ← Calculate another quote
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
