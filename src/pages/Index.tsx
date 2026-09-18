import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { careServices } from "@/data/careServices";
import { testimonials } from "@/data/testimonials";
import { leaders } from "@/data/leadership";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const heroSlides = [
  {
    id: 1,
    title: "Concierge In-Home Care. Sophisticated Clinical Management.",
    subtitle: "Managed securely via the AkiVault System—providing real-time documentation, automated Electronic Visit Verification (EVV), and an exclusive, fully encrypted 24/7 client family portal.",
    bgImage: "/CARE GIVER  (4).jpg"
  },
  {
    id: 2,
    title: "Elite Private-Duty Care Management Powered by Secured Infrastructure.",
    subtitle: "Premium in-home care designed for discerning families and institutional payers. Advanced technology meets exceptional clinical expertise at your convenience.",
    bgImage: "/CARE GIVER  (16).jpg"
  }
];

const whyChooseCards = [
  {
    icon: "fa-user-doctor",
    bg: "bg-[#6b1d6f]",
    title: "Daily care experts",
    description: "We specialize in around the clock care to help seniors live well at home."
  },
  {
    icon: "fa-headset",
    bg: "bg-[#aa2a78]",
    title: "Available 24/7",
    description: "We are available 24 hours a day to provide your loved one with a caregiver."
  },
  {
    icon: "fa-wheelchair",
    bg: "bg-[#e03b4e]",
    title: "Balanced care",
    description: "Our unique approach to care promotes healthy mind, body and spirit."
  },
  {
    icon: "fa-heart-pulse",
    bg: "bg-[#f29807]",
    title: "High caliber caregivers",
    description: "We typically hire only 1 in 25 applicants and provide ongoing training."
  },
  {
    icon: "fa-gem",
    bg: "bg-[#65b741]",
    title: "Peace of mind",
    description: "Independent industry surveys place our client satisfaction rate at 97%."
  },
  {
    icon: "fa-user-shield",
    bg: "bg-[#23509e]",
    title: "A trusted partner",
    description: "Akirapa Home Care is the trusted referral choice for elder care professionals."
  },
  {
    icon: "fa-flask",
    bg: "bg-[#1b99a4]",
    title: "Cognitive therapeutics",
    description: "Fun yet effective activities designed by experts to keep aging minds sharp."
  },
  {
    icon: "fa-file-contract",
    bg: "bg-[#158d88]",
    title: "No long term contract",
    description: "Use our services only as long as you're 100% satisfied."
  }
];

const technologyPillars = [
  {
    icon: "fa-triangle-exclamation",
    title: "Instant Red-Flag Safeguards",
    description:
      "Any concerning welfare check response instantly triggers high-priority alerts to Care Coordinators and family members.",
    badge: "Real-Time Protection",
  },
  {
    icon: "fa-shield-halved",
    title: "HIPAA Family Portal & Messaging",
    description:
      "Encrypted messaging and real-time activity feeds keep family members informed of shift completions, vitals, and caregiver updates.",
    badge: "Family Transparency",
  },
  {
    icon: "fa-file-shield",
    title: "Immutable Compliance & Audits",
    description:
      "Complete timestamped audit logging tracks every shift modification, location override, and coordinator review for total compliance.",
    badge: "Regulatory Standard",
  },
  {
    icon: "fa-user-group",
    title: "Smart Care Pod Allocation",
    description:
      "Algorithmically assigns primary and backup caregivers to form consistent Care Pods, ensuring clients never receive a stranger at their door.",
    badge: "Care Continuity",
  },
  {
    icon: "fa-clipboard-check",
    title: "8-Point Welfare Diagnostics",
    description:
      "Standardized end-of-shift questions track appetite drops, medication compliance, mood shifts, fall risks, and pain levels in real time.",
    badge: "Clinical Intelligence",
  },
  {
    icon: "fa-location-dot",
    title: "GPS-Verified EVV & Geofencing",
    description:
      "Automated Electronic Visit Verification confirms caregivers are physically on site before clocking in, preventing shift fraud and ensuring punctuality.",
    badge: "Verification Engine",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Testimonial submission form states
  const [author, setAuthor] = useState("");
  const [relation, setRelation] = useState("");
  const [location, setLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Testimonial Submitted!",
      description: "Thank you for sharing your feedback with Akirapa Home Care.",
    });
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = heroSlides[currentSlide];

  return (
    <Layout>
      <SEO
        title="Akirapa Home Care | In-Home Senior Care & 24/7 Services — Burlington, MA"
        description="Compassionate in-home senior care in Burlington, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support. Call 339-970-1214."
        path="/"
      />

      {/* Light Elegant Hero Section with Landscape Background & Refined Gradient Mask */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white text-gray-900 overflow-hidden border-b border-gray-100 min-h-[520px] md:min-h-[600px] flex items-center"
      >
        {/* Animated Background Landscape Images with Smooth Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroSlides.map((item, index) => (
            <img
              key={item.id}
              src={item.bgImage}
              alt="Hero Caregiver Background"
              className={`absolute inset-0 w-full h-full object-cover object-right md:object-right-top transition-all duration-1000 ease-in-out transform ${
                index === currentSlide
                  ? "opacity-100 scale-105 z-0"
                  : "opacity-0 scale-100 -z-10"
              }`}
            />
          ))}

          {/* Refined Smooth Gradient: clear readable text zone on the left while revealing the warm caregiver photos on the right/center */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-white/85 via-45% md:via-white/65 md:via-55% to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/90 via-white/40 to-transparent sm:hidden pointer-events-none" />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-[#76248a]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-6 text-left bg-white/70 sm:bg-white/50 md:bg-transparent backdrop-blur-xs sm:backdrop-blur-sm md:backdrop-blur-none p-5 sm:p-7 md:p-0 rounded-3xl border border-white/60 md:border-none shadow-sm md:shadow-none">
            <div key={slide.id} className="space-y-4 animate-fade-up">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#76248a]/10 text-[#76248a] text-xs font-black uppercase tracking-wider shadow-xs">
                <i className="fa-solid fa-heart-pulse text-[#40ddd3]"></i>
                Compassionate Concierge In-Home Care
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#76248a] tracking-tight leading-[1.2] text-left">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed max-w-2xl text-left">
                {slide.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-stretch sm:items-center pt-4 sm:pt-6">
              <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-base h-14 px-8 rounded-xl shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105 button-shimmer border-none">
                <Link to="/contact">Explore Concierge Private Care</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/95 hover:bg-white border-2 border-[#76248a] text-[#76248a] font-bold text-base h-14 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Link to="/services">View Care Services</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-300/60 flex flex-wrap justify-start gap-8 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3] text-base"></i>
                <span>Licensed Caregivers</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3] text-base"></i>
                <span>24/7 Premium Support</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3] text-base"></i>
                <span>Bedford, MA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Impact Helpline Callout Banner */}
      <section className="bg-gray-50/80 pt-6 pb-4">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 -mt-14 sm:-mt-16 relative z-20">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-16 h-16 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shrink-0 shadow-md">
                <i className="fa-solid fa-phone-volume text-2xl text-white"></i>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="bg-[#76248a] text-white text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full">24/7 Helpline</span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">Need Care Right Away?</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Speak directly with our senior care coordinator in Bedford, MA.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <a
                href="tel:3399701214"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 text-base button-shimmer"
              >
                <i className="fa-solid fa-phone text-lg text-[#40ddd3]"></i>
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block uppercase leading-none">Main Hotline</span>
                  <span className="text-lg font-black text-[#40ddd3]">339 970 1214</span>
                </div>
              </a>

              <Button asChild size="lg" className="w-full sm:w-auto bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-base h-14 px-6 rounded-2xl shadow-md button-shimmer transition-all duration-300 hover:scale-105">
                <Link to="/contact">Request Immediate Callback</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Technology Pillars of AkiVault Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#76248a] font-extrabold text-sm uppercase tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full inline-block">
              Advanced Technology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              AkiVault Features
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Six technological pillars ensuring security, transparency, and clinical excellence in every shift.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-[#76248a] hover:bg-[#561868] text-white font-bold text-base h-12 px-6 rounded-2xl shadow-md button-shimmer transition-all duration-300 hover:scale-105">
                <Link to="/akivault">
                  Explore AkiVault Features →
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyPillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#76248a] text-white flex items-center justify-center mb-6 shadow-md group-hover:bg-[#40ddd3] group-hover:text-gray-950 transition-colors">
                  <i className={`fa-solid ${pillar.icon} text-2xl`}></i>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#76248a] bg-[#76248a]/10 px-2.5 py-1 rounded-full">
                  {pillar.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase Section with Images from Public Folder */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-6 sm:px-12 lg:px-16 space-y-10">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#76248a] tracking-tight leading-tight text-left">
            Would you rather stay at home than go into a health care facility or nursing home?
          </h2>

          {/* Sub-row with Teal Line and Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-16 h-1 bg-[#40ddd3] rounded-full shrink-0 mt-3 hidden sm:block"></div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-left">
                Akirapa Home Care Inc provides the following home health care programs at flexible schedules and cost-friendly service rates.
              </p>
            </div>

            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold uppercase text-sm h-14 px-8 rounded-none shadow-md border-none shrink-0">
              <Link to="/services">View Care Services</Link>
            </Button>
          </div>

          {/* 5 Services Images Grid (Horizontal Scroll on Mobile, 5-Col Grid on Desktop) */}
          <div className="flex overflow-x-auto gap-5 sm:gap-6 pt-4 pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 sm:-mx-12 sm:px-12 lg:grid lg:grid-cols-5 lg:gap-8 lg:mx-0 lg:px-0 lg:overflow-visible">
            {/* Service 1 */}
            <Link to="/services" className="group space-y-3.5 text-center w-[220px] sm:w-[250px] shrink-0 snap-start lg:w-auto lg:shrink">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50">
                <img
                  src="/CARE GIVER  (1).jpg"
                  alt="Hourly home care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#76248a] group-hover:text-[#40ddd3] transition-colors">
                Hourly home care
              </h3>
            </Link>

            {/* Service 2 */}
            <Link to="/services" className="group space-y-3.5 text-center w-[220px] sm:w-[250px] shrink-0 snap-start lg:w-auto lg:shrink">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50">
                <img
                  src="/CARE GIVER  (5).jpg"
                  alt="Daily home care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#76248a] group-hover:text-[#40ddd3] transition-colors">
                Daily home care
              </h3>
            </Link>

            {/* Service 3 */}
            <Link to="/services" className="group space-y-3.5 text-center w-[220px] sm:w-[250px] shrink-0 snap-start lg:w-auto lg:shrink">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50">
                <img
                  src="/CARE GIVER  (8).jpg"
                  alt="Hospital to home care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#76248a] group-hover:text-[#40ddd3] transition-colors">
                Hospital to home care
              </h3>
            </Link>

            {/* Service 4 */}
            <Link to="/services" className="group space-y-3.5 text-center w-[220px] sm:w-[250px] shrink-0 snap-start lg:w-auto lg:shrink">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50">
                <img
                  src="/CARE GIVER  (14).jpg"
                  alt="Respite home care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#76248a] group-hover:text-[#40ddd3] transition-colors">
                Respite home care
              </h3>
            </Link>

            {/* Service 5 */}
            <Link to="/services" className="group space-y-3.5 text-center w-[220px] sm:w-[250px] shrink-0 snap-start lg:w-auto lg:shrink">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50">
                <img
                  src="/CARE GIVER  (16).jpg"
                  alt="Specialized care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#76248a] group-hover:text-[#40ddd3] transition-colors">
                Specialized care
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 24/7 Helpline Purple CTA Banner with 27% Opacity Background Image */}
      <section className="relative min-h-[300px] py-10 md:py-12 bg-[#76248a] text-white overflow-hidden flex items-center justify-center">
        {/* Background Image with 27% Opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (10).jpg"
            alt="Akirapa Caregivers"
            className="w-full h-full object-cover opacity-[0.27] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/75" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Ready to Begin Your Home Care Journey?
          </h2>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            Call our 24/7 helpline today or request a free, contract-free in-home assessment in Bedford, MA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="tel:3399701214"
              className="inline-flex items-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-xl px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 button-shimmer animate-btn-pulse"
            >
              <i className="fa-solid fa-phone text-xl text-white"></i>
              <span>Call Us Now</span>
            </a>
            <Button asChild variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-bold text-lg h-14 px-8 rounded-2xl transition-all duration-300 hover:scale-105">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Akirapa Home Care Section with Automatic Loop Scroll */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container-narrow mx-auto px-6 sm:px-12 lg:px-16 space-y-10">
          {/* Section Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#76248a] tracking-tight leading-tight text-left">
            Why choose akirapa home care?
          </h2>

          {/* Sub-row with Teal Accent Line and Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-16 h-1 bg-[#40ddd3] rounded-full shrink-0 mt-3 hidden sm:block"></div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-left">
                We are committed to being your shoulder to lean on and providing honest advice for your loved one's situation during this delicate time.
              </p>
            </div>

            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold uppercase text-sm h-14 px-8 rounded-xl shadow-md border-none shrink-0 button-shimmer transition-all duration-300 hover:scale-105">
              <a href="#stories-of-care">READ TESTIMONIALS</a>
            </Button>
          </div>

          {/* Automatic Infinite Scrolling Marquee Row with Seamless Loop */}
          <div className="relative w-full overflow-hidden py-4 -mx-6 px-6 sm:-mx-12 sm:px-12 lg:-mx-16 lg:px-16 group">
            <div className="animate-marquee gap-6 flex">
              {[...whyChooseCards, ...whyChooseCards].map((card, idx) => (
                <div
                  key={idx}
                  className={`${card.bg} text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[250px] w-[280px] sm:w-[320px] shrink-0`}
                >
                  <div className="space-y-4">
                    <i className={`fa-solid ${card.icon} text-4xl text-white`}></i>
                    <h3 className="text-xl font-bold text-white leading-tight capitalize">{card.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Subtle Gradient Overlays at left and right edges */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* Featured 99% Satisfaction & Client Review Highlight Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-6 sm:px-12 lg:px-16 space-y-10">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#76248a] tracking-tight leading-tight text-left">
            Our 99% client satisfaction rate is unparalleled in our field.
          </h2>

          {/* Sub-row with Teal Line and Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-16 h-1 bg-[#40ddd3] rounded-full shrink-0 mt-3 hidden sm:block"></div>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed text-left">
                Read below what our clients have to say and learn more about what makes us the premier provider of in-home senior care.
              </p>
            </div>

            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold uppercase text-sm h-14 px-8 rounded-xl shadow-md border-none shrink-0 button-shimmer transition-all duration-300 hover:scale-105">
              <a href="#submit-feedback">WRITE REVIEW</a>
            </Button>
          </div>

          {/* Split Feature Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 min-h-[380px] group">
            {/* Left Card - Theme Color with White Text */}
            <div className="order-2 lg:order-1 lg:col-span-6 bg-[#218981] text-white p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Shara M.
                </h3>
                <p className="text-white/80 text-base sm:text-lg font-normal">
                  caregiving daughter
                </p>
              </div>

              <div className="space-y-4">
                <i className="fa-solid fa-quote-left text-3xl sm:text-4xl text-[#40ddd3]"></i>
                <p className="text-white text-base sm:text-lg font-medium leading-relaxed italic">
                  "Your help and assistance in caring for my mother has been nothing short of extraordinary. The peace of mind your team provides is priceless."
                </p>
              </div>
            </div>

            {/* Right Card - Image from Public Folder with smooth zoom */}
            <div className="order-1 lg:order-2 lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <img
                src="/CARE GIVER  (13).jpg"
                alt="Shara M. Caregiver and Mother"
                className="absolute inset-0 w-full h-full object-cover img-zoom-hover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stories of Care & Trust and Review Submission Form (Relocated from About Us) */}
      <section id="stories-of-care" className="section-padding bg-gray-50 border-t border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Testimonials List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[#76248a] font-extrabold text-xs uppercase tracking-wider bg-[#76248a]/10 px-3.5 py-1 rounded-full inline-block">
                  Verified Family Testimonials
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                  Stories of Care & Trust
                </h2>
                <p className="text-gray-600 text-sm">
                  Hear firsthand experiences from families who rely on Akirapa Home Care for compassionate, professional senior assistance.
                </p>
              </div>

              <div className="space-y-4">
                {testimonials.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 space-y-3 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-sm"></i>
                        ))}
                      </div>
                      <i className="fa-solid fa-quote-right text-gray-200 group-hover:text-[#40ddd3] transition-colors text-xl"></i>
                    </div>
                    <p className="text-gray-700 italic text-sm leading-relaxed">"{item.text}"</p>
                    <div className="text-xs font-bold text-gray-900 flex items-center justify-between border-t border-gray-50 pt-2">
                      <span>{item.author}</span>
                      <span className="font-normal text-gray-500">{item.relation ? `${item.relation} • ` : ""}{item.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Submit Your Review */}
            <div id="submit-feedback" className="lg:col-span-5 scroll-mt-28">
              <div className="bg-[#76248a] text-white p-8 rounded-3xl shadow-xl space-y-6 border border-[#561868]">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-comment-dots text-2xl text-[#40ddd3]"></i>
                  <h3 className="text-2xl font-black text-white">Share Your Feedback</h3>
                </div>
                <p className="text-white/80 text-xs">
                  Has your family experienced care from Akirapa Home Care? Submit a testimonial to help other families make informed care decisions.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4 text-gray-900">
                    <div>
                      <Label htmlFor="author" className="text-white text-xs font-semibold">Your Name</Label>
                      <Input
                        id="author"
                        placeholder="e.g. Mary Higgins"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="bg-white text-gray-900 mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="relation" className="text-white text-xs font-semibold">Relation</Label>
                        <Input
                          id="relation"
                          placeholder="e.g. Daughter"
                          value={relation}
                          onChange={(e) => setRelation(e.target.value)}
                          required
                          className="bg-white text-gray-900 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-white text-xs font-semibold">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g. Bedford, MA"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          className="bg-white text-gray-900 mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="rating" className="text-white text-xs font-semibold">Rating (1 to 5 Stars)</Label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none mt-1"
                      >
                        <option value={5}>5 Stars - Exceptional Care</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Satisfactory</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="review" className="text-white text-xs font-semibold">Your Review / Comments</Label>
                      <Textarea
                        id="review"
                        placeholder="Describe how Akirapa Home Care helped your family..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        className="bg-white h-24 text-gray-900 mt-1"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-base h-12 rounded-xl button-shimmer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Submit Feedback
                    </Button>
                  </form>
                ) : (
                  <div className="bg-white/10 p-6 rounded-2xl text-center space-y-2">
                    <i className="fa-solid fa-circle-check text-4xl text-[#40ddd3] mx-auto"></i>
                    <h4 className="font-bold text-white text-lg">Thank You!</h4>
                    <p className="text-white/80 text-xs">Your testimonial has been submitted for review.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
