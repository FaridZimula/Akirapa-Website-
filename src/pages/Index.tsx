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

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 text-gray-700 hover:text-[#76248a] hover:bg-white flex items-center justify-center transition-all"
        >
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 text-gray-700 hover:text-[#76248a] hover:bg-white flex items-center justify-center transition-all"
        >
          <i className="fa-solid fa-chevron-right text-lg"></i>
        </button>

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

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-6 text-left">
            <div key={slide.id} className="space-y-6 transition-all duration-700 ease-in-out animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold sm:font-extrabold text-[#76248a] tracking-tight leading-[1.15] text-left">
                {slide.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#218981] font-semibold leading-relaxed max-w-2xl text-left">
                {slide.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center pt-4">
              <Button asChild size="lg" className="bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold uppercase tracking-normal text-sm h-14 px-8 rounded-none shadow-md border-none">
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

              <Button asChild size="lg" className="w-full sm:w-auto bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold text-base h-14 px-6 rounded-2xl shadow-md">
                <Link to="/contact">Request Immediate Callback</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding bg-gray-50/80">
        <div className="container-narrow mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Our Core Home Care Services
            </h2>
            <p className="text-gray-600 text-lg">
              Designed to help seniors live safely, independently, and comfortably at home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#76248a] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <i className={`${service.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#76248a] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#76248a] font-semibold text-xs uppercase tracking-normal">
                    {service.tagline}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {service.features.slice(0, 3).map((f, idx) => (
                      <li key={idx} className="text-xs font-medium text-gray-700 flex items-center gap-2">
                        <span className="text-[#40ddd3] font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-[#76248a] font-bold text-sm hover:text-[#561868] transition-colors"
                  >
                    <span>Learn More</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                </div>
              </div>
            ))}

            {/* Quick Consultation Highlight Card */}
            <div className="bg-[#76248a] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-[#40ddd3]/30">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#40ddd3] text-[#76248a] flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-award text-2xl text-[#76248a]"></i>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Not Sure Which Care Plan Fits Best?
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our licensed care managers in Burlington MA offer free, no-obligation in-home assessments to help you evaluate daily needs.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20">
                <Button asChild className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-bold h-12 rounded-xl text-base">
                  <Link to="/contact">Schedule Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <CareQuoteCalculator />
        </div>
      </section>

      {/* Founders & About Story Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Image / Founders */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1581579438747-1dc8d1e05842?auto=format&fit=crop&q=80&w=800"
                    alt="Cathy Akirapa & Stuart Ssemwogerere"
                    className="w-full h-[420px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#76248a] text-white p-6 rounded-2xl shadow-xl border border-[#40ddd3]/30 hidden sm:block max-w-xs">
                  <p className="text-2xl font-black text-[#40ddd3]">10+ Years</p>
                  <p className="text-xs text-white/90 font-medium">Of Compassionate Senior Care Excellence (Est. 2013)</p>
                </div>
              </div>
            </div>

            {/* Right Story */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Founded on Personal Compassion & Dedicated Care
              </h2>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Akirapa Home Care was founded in 2013 by <strong>Cathy Akirapa</strong> (CNA & Financial Professional) alongside <strong>Stuart Ssemwogerere</strong> (Executive Director) with a singular mission: to ensure seniors can live comfortably and safely in their own homes.
              </p>

              <p className="text-gray-600 text-base leading-relaxed">
                Incorporated in 2015 and expanding regional healthcare partnerships in 2017, Akirapa Home Care has grown into a trusted home health care provider across Burlington, MA, and surrounding communities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
                  <h4 className="font-bold text-[#76248a]">Cathy Akirapa</h4>
                  <p className="text-xs text-gray-600">Founder, CNA & Financial Professional</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
                  <h4 className="font-bold text-[#76248a]">Stuart Ssemwogerere</h4>
                  <p className="text-xs text-gray-600">Co-Founder & Executive Director</p>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild size="lg" className="bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-2xl">
                  <Link to="/about">Read Our Full Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
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

      {/* 24/7 Helpline Bottom Banner */}
      <section className="py-16 bg-[#76248a] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Begin Your Home Care Journey?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Call our 24/7 helpline today or request a free, contract-free in-home assessment in Burlington, MA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a
              href="tel:3399701214"
              className="inline-flex items-center gap-3 bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-extrabold text-xl px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              <i className="fa-solid fa-phone text-xl"></i>
              <span>Call 339 970 1214</span>
            </a>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8 rounded-2xl">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
