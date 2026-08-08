import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { careServices } from "@/data/careServices";
import { testimonials } from "@/data/testimonials";
import { leaders } from "@/data/leadership";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const heroSlides = [
  {
    id: 1,
    title: "You can't always be there. But we can.",
    subtitle: "We offer a person-centred approach to keep seniors safe and sound at home, instead of anywhere else.",
    bgImage: "/CARE GIVER  (4).jpg"
  },
  {
    id: 2,
    title: "Would you rather stay at home than go into a health care facility?",
    subtitle: "We will come to your convenient location. Akirapa Home Care provides flexible, compassionate, and professional in-home care.",
    bgImage: "/CARE GIVER  (16).jpg"
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <Layout>
      <SEO
        title="Akirapa Home Care | In-Home Senior Care & 24/7 Services"
        description="Compassionate in-home senior care in Burlington, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support. Care Your Way."
      />

      {/* Light Elegant Hero Section with Landscape Background & Strong White Gradient Overlay */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white text-gray-900 overflow-hidden border-b border-gray-100 min-h-[520px] md:min-h-[580px] flex items-center"
      >
        {/* Animated Background Landscape Images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroSlides.map((item, index) => (
            <img
              key={item.id}
              src={item.bgImage}
              alt="Hero Caregiver Background"
              className={`absolute inset-0 w-full h-full object-cover object-right md:object-right-top transition-all duration-1000 ease-in-out transform ${
                index === currentSlide
                  ? "opacity-100 scale-100 z-0"
                  : "opacity-0 scale-105 -z-10"
              }`}
            />
          ))}

          {/* Strong White Gradient: 100% solid white across the text area (0-60%), smooth fade to transparent on the right */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white via-55% sm:via-white sm:via-60% md:via-white md:via-65% lg:via-white/95 lg:via-60% to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/80 via-30% to-transparent sm:hidden pointer-events-none" />
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
          <div className="max-w-3xl lg:max-w-4xl space-y-6 text-left pl-1 sm:pl-2">
            <div key={slide.id} className="space-y-6 transition-all duration-700 ease-in-out animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold sm:font-extrabold text-[#76248a] tracking-tight leading-[1.15] text-left">
                {slide.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#218981] font-semibold leading-relaxed max-w-2xl text-left">
                {slide.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center pt-4">
              <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold uppercase tracking-normal text-sm h-14 px-8 rounded-none shadow-md border-none">
                <Link to="/contact">Schedule Free Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/90 hover:bg-white border border-gray-300 text-gray-800 font-extrabold uppercase tracking-normal text-sm h-14 px-8 rounded-none shadow-xs">
                <Link to="/services">Explore Care Programs</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-300/80 flex flex-wrap justify-start gap-6 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#218981]"></i>
                <span>Licensed Caregivers</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#218981]"></i>
                <span>24/7 Helpline Support</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#218981]"></i>
                <span>Burlington, MA</span>
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
                  Speak directly with our senior care coordinator in Burlington, MA.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <a
                href="tel:3399701214"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-base"
              >
                <i className="fa-solid fa-phone text-lg text-[#40ddd3]"></i>
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block uppercase leading-none">Main Hotline</span>
                  <span className="text-lg font-black text-[#40ddd3]">339 970 1214</span>
                </div>
              </a>

              <Button asChild size="lg" className="w-full sm:w-auto bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-base h-14 px-6 rounded-2xl shadow-md">
                <Link to="/contact">Request Immediate Callback</Link>
              </Button>
            </div>
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

          {/* 5 Services Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-4">
            {/* Service 1 */}
            <Link to="/services" className="group space-y-3.5 text-center">
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
            <Link to="/services" className="group space-y-3.5 text-center">
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
            <Link to="/services" className="group space-y-3.5 text-center">
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
            <Link to="/services" className="group space-y-3.5 text-center">
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
            <Link to="/services" className="group space-y-3.5 text-center">
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
            Call our 24/7 helpline today or request a free, contract-free in-home assessment in Burlington, MA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="tel:3399701214"
              className="inline-flex items-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-xl px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              <i className="fa-solid fa-phone text-xl text-white"></i>
              <span>Call 339 970 1214</span>
            </a>
            <Button asChild variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-bold text-lg h-14 px-8 rounded-2xl">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Akirapa Home Care Section matching screenshots */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
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

            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold uppercase text-sm h-14 px-8 rounded-none shadow-md border-none shrink-0">
              <a href="#testimonials">READ TESTIMONIALS</a>
            </Button>
          </div>

          {/* 8 Colorful Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {/* Card 1 - Dark Purple */}
            <div className="bg-[#6b1d6f] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-user-doctor text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">Daily care experts</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We specialize in around the clock care to help seniors live well at home.
                </p>
              </div>
            </div>

            {/* Card 2 - Medium Magenta */}
            <div className="bg-[#aa2a78] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-headset text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">Available 24/7</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We are available 24 hours a day to provide your loved one with a caregiver.
                </p>
              </div>
            </div>

            {/* Card 3 - Coral Red */}
            <div className="bg-[#e03b4e] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-wheelchair text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">Balanced care</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Our unique approach to care promotes healthy mind, body and spirit.
                </p>
              </div>
            </div>

            {/* Card 4 - Golden Orange */}
            <div className="bg-[#f29807] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-heart-pulse text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">high caliber caregivers</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We typically hire only 1 in 25 applicants and provide ongoing training.
                </p>
              </div>
            </div>

            {/* Card 5 - Vibrant Green */}
            <div className="bg-[#65b741] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-gem text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">Peace of mind</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Independent industry surveys place our client satisfaction rate at 97%.
                </p>
              </div>
            </div>

            {/* Card 6 - Deep Blue */}
            <div className="bg-[#23509e] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-user-shield text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">A trusted partner</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Akirapa Home Care is the trusted referral choice for elder care professionals.
                </p>
              </div>
            </div>

            {/* Card 7 - Teal */}
            <div className="bg-[#1b99a4] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-flask text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">Cognitive therapeutics</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Fun yet effective activities designed by experts to keep aging minds sharp.
                </p>
              </div>
            </div>

            {/* Card 8 - Dark Teal */}
            <div className="bg-[#158d88] text-white p-8 rounded-2xl space-y-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[250px]">
              <div className="space-y-4">
                <i className="fa-solid fa-file-contract text-4xl text-white"></i>
                <h3 className="text-xl font-bold text-white leading-tight">No long term contract</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Use our services only as long as you're 100% satisfied.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured 99% Satisfaction & Client Review Highlight Section matching screenshot */}
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

            <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold uppercase text-sm h-14 px-8 rounded-none shadow-md border-none shrink-0">
              <Link to="/contact">WRITE REVIEW</Link>
            </Button>
          </div>

          {/* Split Feature Box (Left: Theme Color Box with White Text, Right: Image from Public Folder) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 min-h-[380px]">
            {/* Left Card - Theme Color with White Text */}
            <div className="lg:col-span-6 bg-[#218981] text-white p-8 sm:p-12 flex flex-col justify-between space-y-6">
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

            {/* Right Card - Image from Public Folder */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
              <img
                src="/CARE GIVER  (13).jpg"
                alt="Shara M. Caregiver and Mother"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container-narrow mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start">
            {testimonials.map((item) => (
              <div key={item.id} className="space-y-4 text-left">
                {/* Cyan Quote Icon */}
                <div className="text-left">
                  <i className="fa-solid fa-quote-left text-3xl sm:text-4xl text-[#40ddd3]"></i>
                </div>

                {/* Author Name and Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#76248a] tracking-tight">
                    {item.author}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 font-normal pt-0.5">
                    {item.location}
                  </p>
                </div>

                {/* Remark Text */}
                <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
