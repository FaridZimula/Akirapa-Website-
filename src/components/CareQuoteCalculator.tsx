import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const CareQuoteCalculator: React.FC = () => {
  const { toast } = useToast();
  const [supportTime, setSupportTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
          _subject: `New Care Plan & Quote Request from ${phone || "Website Visitor"}`,
          _template: "table",
          _captcha: "false",
          "Phone Number": phone || "Not provided",
          "Support Timeline": supportTime || "Not specified",
          "Preferred Arrival Time": arrivalTime || "Not specified",
          "Care Duration": duration || "Not specified",
          "Location": location || "Not specified",
        }),
      });

      toast({
        title: "Quote Request Submitted!",
        description: "Our Burlington care team will reach out promptly to discuss your personalized care plan.",
      });
    } catch (error) {
      toast({
        title: "Quote Request Received!",
        description: "Thank you! Our care coordinator will contact you shortly.",
      });
    }
  };

  return (
    <div className="bg-[#76248a] rounded-3xl p-5 sm:p-8 md:p-12 lg:p-14 shadow-2xl text-white relative overflow-hidden border border-white/20 card-hover-pro card-shine">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column - Heading & Call to Action text */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-left">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight animate-word-fade">
            Request a custom care quote
          </h2>
          
          <p className="text-[#40ddd3] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            Every care plan is tailored to your loved one's exact needs. If you require services on a public holiday, overnight services, or live-in support, please call{" "}
            <a href="tel:+17812269910" className="font-bold underline hover:opacity-80 transition-opacity text-[#40ddd3]">
              +1 781-226-9910
            </a>{" "}
            or submit your schedule below for a complimentary consultation.
          </p>
        </div>

        {/* Right Column - Form Input Fields Grid */}
        <div className="lg:col-span-7">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              
              {/* Field 1: Support Timeline */}
              <div className="relative">
                <select
                  value={supportTime}
                  onChange={(e) => setSupportTime(e.target.value)}
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 pr-9 sm:pr-10 rounded-xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3] transition-all duration-300 hover:border-[#40ddd3]"
                >
                  <option value="" disabled>when would you like our support?</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Next few weeks">Next few weeks</option>
                  <option value="Flexible date">Flexible date</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-xs sm:text-sm"></i>
                </div>
              </div>

              {/* Field 2: Arrival Time */}
              <div className="relative">
                <select
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 pr-9 sm:pr-10 rounded-xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3] transition-all duration-300 hover:border-[#40ddd3]"
                >
                  <option value="" disabled>when would you like us to arrive?</option>
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                  <option value="24/7 Overnight / Full Day">24/7 Overnight / Full Day</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-xs sm:text-sm"></i>
                </div>
              </div>

              {/* Field 3: Care Duration */}
              <div className="relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 pr-9 sm:pr-10 rounded-xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3] transition-all duration-300 hover:border-[#40ddd3]"
                >
                  <option value="" disabled>how long would you like our visit to be?</option>
                  <option value="3 to 4 Hours">3 to 4 Hours / day</option>
                  <option value="5 to 8 Hours">5 to 8 Hours / day</option>
                  <option value="9 to 12 Hours">9 to 12 Hours / day</option>
                  <option value="24 Hours / Live-in Care">24 Hours / Live-in Care</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-xs sm:text-sm"></i>
                </div>
              </div>

              {/* Field 4: Location Selection */}
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 pr-9 sm:pr-10 rounded-xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#40ddd3] transition-all duration-300 hover:border-[#40ddd3]"
                >
                  <option value="" disabled>location of required care</option>
                  <option value="Burlington, MA">Burlington, MA</option>
                  <option value="Bedford, MA">Bedford, MA</option>
                  <option value="Lexington, MA">Lexington, MA</option>
                  <option value="Concord, MA">Concord, MA</option>
                  <option value="Billerica, MA">Billerica, MA</option>
                  <option value="Waltham, MA">Waltham, MA</option>
                  <option value="Other MA Location">Other MA Location</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <i className="fa-solid fa-chevron-down text-xs sm:text-sm"></i>
                </div>
              </div>

              {/* Field 5: Phone Number Input */}
              <div>
                <input
                  type="tel"
                  placeholder="your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40ddd3] transition-all duration-300 hover:border-[#40ddd3]"
                />
              </div>

              {/* Field 6: Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black tracking-wider uppercase text-sm sm:text-base rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] button-shimmer flex items-center justify-center cursor-pointer"
                >
                  SUBMIT
                </button>
                <p className="text-[11px] text-white/70 text-center mt-2.5">
                  <i className="fa-solid fa-lock text-[#40ddd3] mr-1"></i>
                  Confidential & Secure. By submitting, you agree to our{" "}
                  <Link to="/privacy" className="text-[#40ddd3] underline font-bold hover:text-white">Privacy Policy</Link>{" "}
                  and{" "}
                  <Link to="/terms" className="text-[#40ddd3] underline font-bold hover:text-white">Terms</Link>.
                </p>
              </div>

            </form>
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center space-y-4">
              <i className="fa-solid fa-circle-check text-5xl text-[#40ddd3] mx-auto"></i>
              <h3 className="text-2xl font-extrabold text-white">Thank You!</h3>
              <p className="text-white/90 text-sm max-w-md mx-auto">
                We have received your quote request. Our care coordinator in Burlington, MA will call you at <strong className="text-[#40ddd3]">{phone || "your number"}</strong> shortly.
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
