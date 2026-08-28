import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { detailedServices } from "@/data/detailedServicesData";
import { testimonials } from "@/data/testimonials";
import { CareQuoteCalculator } from "@/components/CareQuoteCalculator";

const heroSlides = [
  {
    id: 1,
    title: "In-Home Senior Care & Specialized Caregiving in Bedford, MA",
    subtitle: "Compassionate, high-quality home care tailored to your family's schedule. Headquartered at 209 Burlington Rd, Bedford, MA—serving Greater Boston & Middlesex County.",
    bgImage: "/CARE GIVER  (4).jpg"
  },
  {
    id: 2,
    title: "Dedicated 24/7 Home Care & Clinical Management",
    subtitle: "Hourly care, round-the-clock shift support, respite relief, and specialized Alzheimer's care delivered safely at home.",
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

    return () => setInterval(timer);
  }, [isPaused]);

  const slide = heroSlides[currentSlide];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Akirapa Home Care",
    "url": "https://akirapahomecareus.com",
    "description": "In-home senior care and caregiver services in Bedford, MA and surrounding Middlesex County."
  };

  return (
    <Layout>
      <SEO
        title="Akirapa Home Care | In-Home Senior Care & 24/7 Caregiving — Bedford, MA"
        description="Trusted in-home senior care in Bedford, MA. Hourly care, 24/7 care, post-hospital recovery, respite care & Alzheimer's support. Headquartered at 209 Burlington Rd, Bedford, MA. Call 339-970-1214."
        path="/"
        schemaExtra={[websiteSchema]}
      />

      {/* Hero Section */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white text-gray-900 overflow-hidden border-b border-gray-100 min-h-[520px] md:min-h-[580px] flex items-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroSlides.map((item, index) => (
            <img
              key={item.id}
              src={item.bgImage}
              alt="Akirapa Home Care Bedford MA Caregiver"
              className={`absolute inset-0 w-full h-full object-cover object-right md:object-right-top transition-all duration-1000 ease-in-out transform ${
                index === currentSlide ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 -z-10"
              }`}
            />
          ))}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white via-55% sm:via-white sm:via-60% md:via-white md:via-65% lg:via-white/95 lg:via-60% to-transparent pointer-events-none" />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === currentSlide ? "w-8 bg-[#76248a]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-20">
          <div className="max-w-3xl lg:max-w-4xl space-y-6 text-left pl-1 sm:pl-2">
            <div key={slide.id} className="space-y-4 transition-all duration-700 ease-in-out animate-fadeIn">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#76248a] tracking-tight leading-[1.2] text-left">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl text-left italic">
                {slide.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center pt-6">
              <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-bold text-base h-14 px-8 rounded-xl shadow-lg border-none">
                <Link to="/contact">Book Free In-Home Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/95 hover:bg-white border-2 border-[#76248a] text-[#76248a] font-bold text-base h-14 px-8 rounded-xl shadow-md">
                <Link to="/services">Explore 15 Care Services</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-300/60 flex flex-wrap justify-start gap-8 text-xs sm:text-sm font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3] text-base"></i>
                <span>Bedford Headquarters: 209 Burlington Rd</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3] text-base"></i>
                <span>24/7 Helpline: 339 970 1214</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#40ddd3] text-base"></i>
                <span>Middlesex County & Greater Boston</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helpline Banner */}
      <section className="bg-gray-50/80 pt-6 pb-4">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 -mt-14 sm:-mt-16 relative z-20">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-16 h-16 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shrink-0 shadow-md">
                <i className="fa-solid fa-phone-volume text-2xl text-white"></i>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="bg-[#76248a] text-white text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full">Bedford Helpline</span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">Need Immediate Senior Care Assistance?</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Speak directly with our local Bedford care management team 24/7.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <a
                href="tel:3399701214"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg text-base"
              >
                <i className="fa-solid fa-phone text-lg text-[#40ddd3]"></i>
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block uppercase leading-none">Hotline</span>
                  <span className="text-lg font-black text-[#40ddd3]">339 970 1214</span>
                </div>
              </a>
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-base h-14 px-6 rounded-2xl shadow-md">
                <Link to="/contact">Schedule Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#76248a] font-extrabold text-xs uppercase tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full inline-block">
              Our Service Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Dedicated In-Home Care Services in Bedford, MA
            </h2>
            <p className="text-gray-600 text-base">
              Explore our full range of non-medical and clinical support programs designed to help seniors age comfortably at home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedServices.map((srv) => (
              <div key={srv.slug} className="bg-gray-50/70 p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shadow-sm">
                    <i className={`${srv.icon} text-xl`}></i>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">{srv.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{srv.shortDescription}</p>
                </div>
                <div className="pt-2 border-t border-gray-200/60">
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-[#76248a] font-extrabold text-xs uppercase tracking-wider hover:text-[#40ddd3] flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Care Program</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bedford Location Highlight Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#76248a] text-white rounded-3xl p-8 md:p-12 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-[#40ddd3] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Bedford Local Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Headquartered in Bedford, MA — Serving Greater Boston
              </h2>
              <p className="text-white/90 text-base leading-relaxed">
                Located at <strong>209 Burlington Rd, Bedford, MA 01730</strong>, our local agency delivers dependable senior care, respite relief, and specialized Alzheimer's support across Bedford, Lexington, Concord, Billerica, Burlington, Woburn, and Middlesex County.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Button asChild size="lg" className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold rounded-2xl h-14">
                <Link to="/locations/bedford-ma">Visit Bedford Location Hub</Link>
              </Button>
              <a
                href="tel:3399701214"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold py-3 rounded-2xl text-sm hover:bg-white/10 transition-colors"
              >
                <i className="fa-solid fa-phone"></i>
                <span>(339) 970-1214</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Estimator */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <CareQuoteCalculator />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
