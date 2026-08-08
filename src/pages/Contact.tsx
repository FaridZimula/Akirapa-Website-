import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/context/DataContext";

const Contact = () => {
  const { toast } = useToast();
  const { sendMessage } = useData();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    careType: "hourly",
    city: "",
    message: "",
  });

  const faqs = [
    {
      question: "Does having home care result in a loss of independence?",
      answer:
        "No, in fact home care enhances independence! Our trained caregivers assist with routine daily activities so seniors can continue living safely, comfortably, and confidently in their own homes."
    },
    {
      question: "How can I trust a caregiver in my home?",
      answer:
        "All Akirapa caregivers undergo thorough multi-state criminal background checks, reference verifications, and comprehensive in-person interviews. We only hire compassionate professionals we would trust in our own homes."
    },
    {
      question: "How does Akirapa Home Care attract the best caregivers?",
      answer:
        "We offer competitive compensation, ongoing specialized nursing training, and a supportive family-oriented culture. Only 1 in 25 applicants meet our rigorous hiring standards."
    },
    {
      question: "What if we don't like our caregiver?",
      answer:
        "Your total comfort and peace of mind are paramount. If for any reason the personality or care match isn't perfect, we will promptly pair you with an alternative caregiver who aligns with your preferences."
    },
    {
      question: "Will we have a choice in selecting the caregiver?",
      answer:
        "Yes! We involve you and your family in the matching process to ensure personality compatibility, care skills alignment, and mutual confidence."
    },
    {
      question: "What is the process of finding a caregiver?",
      answer:
        "It begins with a free in-home assessment to evaluate your specific care needs. We then craft a customized care plan and introduce a dedicated, licensed caregiver tailored to your family."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save message to Supabase & DataContext
      await sendMessage({
        full_name: formData.name,
        email: formData.email,
        subject: `Care Request (${formData.careType}) - ${formData.city || 'Burlington'}`,
        content: `Phone: ${formData.phone} | Program: ${formData.careType} | City: ${formData.city || 'N/A'} | Message: ${formData.message || 'N/A'}`
      });

      const response = await fetch("https://formsubmit.co/ajax/info@akirapahomecareus.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Free Care Assessment Request from ${formData.name}`,
          _template: "table",
          _captcha: "false",
          "Full Name": formData.name,
          "Phone Number": formData.phone,
          "Email Address": formData.email,
          "Care Program": formData.careType,
          "City/Town": formData.city || "Not provided",
          "Care Needs / Message": formData.message || "None provided",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: "Assessment Requested!",
          description: "Thank you for reaching out to Akirapa Home Care. Our care manager will contact you shortly.",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      // Fallback submission indication
      setSubmitted(true);
      toast({
        title: "Request Received!",
        description: "Thank you for reaching out to Akirapa Home Care.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <SEO
        title="Contact Us | Free Care Assessment | Akirapa Home Care Burlington MA"
        description="Contact Akirapa Home Care at 83 Cambridge Street, Burlington, MA 01803. Call our 24/7 helpline at 339 970 1214 or 781 472 9375 to schedule a free in-home assessment."
      />

      {/* Hero Header with 29% Opacity Background Image */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        {/* Background Image at 29% Opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (19).jpg"
            alt="Akirapa Contact Caregivers"
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/70" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Contact Akirapa Home Care
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Have questions about senior care options or need immediate assistance? We are here to help 24/7.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-black text-gray-900">
                Burlington, MA Office & 24/7 Helpline
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Address Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center mb-2 shadow-xs">
                    <i className="fa-solid fa-location-dot text-lg text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Office Address</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    83 Cambridge Street<br />
                    Burlington, MA 01803
                  </p>
                </div>

                {/* Phone Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center mb-2 shadow-xs">
                    <i className="fa-solid fa-phone text-lg text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">24/7 Helpline</h4>
                  <a href="tel:3399701214" className="text-[#76248a] font-black text-lg block hover:underline">
                    339 970 1214
                  </a>
                  <p className="text-gray-500 text-xs">Secondary: 781 472 9375</p>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center mb-2 shadow-xs">
                    <i className="fa-solid fa-envelope text-lg text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Email Enquiries</h4>
                  <p className="text-gray-600 text-xs">info@akirapahomecareus.com</p>
                </div>

                {/* Hours Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center mb-2 shadow-xs">
                    <i className="fa-solid fa-clock text-lg text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Hours of Operation</h4>
                  <p className="text-gray-600 text-xs">Office: Mon–Fri (8am - 6pm)</p>
                  <p className="text-[#76248a] font-bold text-xs">Care Services: 24/7 Available</p>
                </div>
              </div>

              {/* Trust Box */}
              <div className="bg-[#76248a] text-white p-6 rounded-2xl space-y-3 shadow-lg flex items-center gap-4">
                <i className="fa-solid fa-shield-halved text-3xl text-white shrink-0"></i>
                <div>
                  <h4 className="font-bold text-white text-base">Contract-Free & Flexible</h4>
                  <p className="text-white/80 text-xs">No long-term commitments required. Modify your care hours as needed.</p>
                </div>
              </div>
            </div>

            {/* Right: Consultation Request Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Request a Free In-Home Assessment</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Fill out the form below and our care coordinator will reach out to discuss your options.
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-xs font-semibold text-gray-700">Your Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-50 mt-1"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-xs font-semibold text-gray-700">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          required
                          placeholder="339-970-1214"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-gray-50 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-xs font-semibold text-gray-700">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="info@akirapahomecareus.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-50 mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="careType" className="text-xs font-semibold text-gray-700">Care Program Needed</Label>
                        <select
                          id="careType"
                          name="careType"
                          value={formData.careType}
                          onChange={handleChange}
                          className="w-full h-10 mt-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none"
                        >
                          <option value="hourly">Hourly Home Care</option>
                          <option value="daily">Daily & 24/7 Home Care</option>
                          <option value="hospital">Hospital to Home Recovery</option>
                          <option value="respite">Respite Care</option>
                          <option value="specialized">Specialized Alzheimer's Care</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-xs font-semibold text-gray-700">City / Town in MA</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="e.g. Burlington, MA"
                          value={formData.city}
                          onChange={handleChange}
                          className="bg-gray-50 mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-xs font-semibold text-gray-700">Care Needs or Questions</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please describe your family's current care situation..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-gray-50 mt-1 h-28"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-bold text-base h-12 rounded-xl"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
                          Submitting...
                        </span>
                      ) : (
                        "Request Free Assessment"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-3">
                    <i className="fa-solid fa-circle-check text-4xl text-green-600 mx-auto"></i>
                    <h4 className="text-2xl font-bold text-green-900">Assessment Request Received!</h4>
                    <p className="text-green-800 text-sm">
                      Thank you {formData.name}. Our Burlington care manager will contact you at {formData.phone} shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section (Placed Below Contact Form) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Side: Expandable FAQ Questions List */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#76248a] tracking-tight">
                Frequently asked questions
              </h2>

              <div className="space-y-3 pt-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border-b border-gray-100 pb-4 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left flex items-start gap-3 py-2 group cursor-pointer focus:outline-none"
                      >
                        <span className="text-[#40ddd3] text-xl font-bold shrink-0 transition-transform duration-200 mt-0.5">
                          {isOpen ? "−" : "+"}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#76248a] group-hover:text-[#561868] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pl-7 pt-2 text-sm text-gray-600 leading-relaxed animate-fadeIn">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Blog Insights Preview Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6 text-left">
              <div className="space-y-6">
                <Link to="/blog" className="flex items-start gap-4 group">
                  <div className="bg-[#40ddd3] text-white p-3 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 w-14 text-center shadow-xs">
                    <span className="text-xl font-black leading-none">21</span>
                    <span className="text-[10px] font-bold uppercase leading-none mt-1">Mar</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#76248a] transition-colors leading-snug">
                      5 ways to regain your energy after caregiver burnout
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      As a caregiver of an aging loved one, practical strategies can restore your well-being...
                    </p>
                  </div>
                </Link>

                <div className="border-t border-gray-100 pt-5">
                  <Link to="/blog" className="flex items-start gap-4 group">
                    <div className="bg-[#40ddd3] text-white p-3 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 w-14 text-center shadow-xs">
                      <span className="text-xl font-black leading-none">17</span>
                      <span className="text-[10px] font-bold uppercase leading-none mt-1">Mar</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#76248a] transition-colors leading-snug">
                        How family caregivers can benefit from respite care
                      </h4>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        What is Respite Care? Respite care provides temporary, contract-free support...
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <Link to="/blog" className="flex items-start gap-4 group">
                    <div className="bg-[#40ddd3] text-white p-3 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 w-14 text-center shadow-xs">
                      <span className="text-xl font-black leading-none">14</span>
                      <span className="text-[10px] font-bold uppercase leading-none mt-1">Mar</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#76248a] transition-colors leading-snug">
                        Four fall prevention strategies for seniors
                      </h4>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        Implement essential environmental and physical modifications to keep your home safe...
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Burlington Location Map */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-gray-900">Visit Our Burlington Office</h2>
            <p className="text-gray-600 text-sm">83 Cambridge Street, Burlington, MA 01803</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-[400px]">
            <iframe
              title="Akirapa Home Care Burlington MA Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2941.56429388307!2d-71.19694162388358!3d42.5028989711792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37517c5df9121%3A0x6b77c5c0a37db7fa!2s83%20Cambridge%20St%2C%20Burlington%2C%20MA%2001803!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
