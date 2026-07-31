import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceNeeded: "Hourly Home Care",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Free Assessment Requested!",
        description: "Thank you for contacting Akirapa Home Care. Our Burlington care coordinator will reach out shortly.",
      });
      setFormData({ name: "", phone: "", email: "", serviceNeeded: "Hourly Home Care", message: "" });
    }, 600);
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

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[#76248a] via-[#561868] to-[#40ddd3] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#40ddd3] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            24/7 Service • Free In-Home Consultation
          </span>
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
              <span className="text-xs font-black uppercase tracking-widest text-[#76248a] bg-[#76248a]/10 px-4 py-1.5 rounded-full">
                Get In Touch
              </span>
              <h2 className="text-3xl font-black text-gray-900">
                Burlington, MA Office & 24/7 Helpline
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Address Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Headquarters</h4>
                  <p className="text-gray-600 text-sm">83 Cambridge Street<br />Burlington, MA 01803</p>
                </div>

                {/* 24/7 Phone Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Helpline (24/7)</h4>
                  <p className="text-[#76248a] font-bold text-sm">339 970 1214</p>
                  <p className="text-gray-600 text-xs">781 472 9375</p>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Email Enquiries</h4>
                  <p className="text-gray-600 text-xs">care@akirapahomecare.com</p>
                  <p className="text-gray-600 text-xs">cathy@akirapahomecare.com</p>
                  <p className="text-gray-600 text-xs">stuart@akirapahomecare.com</p>
                </div>

                {/* Hours Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">Office & Shift Hours</h4>
                  <p className="text-gray-600 text-xs">Caregivers available 24 hours a day, 7 days a week, 365 days a year.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#76248a] to-[#561868] text-white p-6 rounded-2xl shadow-lg border border-[#40ddd3]/30 flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 text-[#40ddd3] shrink-0" />
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

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-800 text-xs font-semibold mb-1 block">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-50"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-gray-800 text-xs font-semibold mb-1 block">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="339-970-1214"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-800 text-xs font-semibold mb-1 block">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="care@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="serviceNeeded" className="text-gray-800 text-xs font-semibold mb-1 block">Care Program Needed</Label>
                      <select
                        id="serviceNeeded"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#76248a]"
                      >
                        <option value="Hourly Home Care">Hourly Home Care</option>
                        <option value="Daily & 24/7 Home Care">Daily & 24/7 Home Care</option>
                        <option value="Hospital to Home Care">Hospital to Home Care</option>
                        <option value="Respite Home Care">Respite Home Care</option>
                        <option value="Specialized Care (Alzheimer's/Parkinson's)">Specialized Care (Alzheimer's/Parkinson's)</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-800 text-xs font-semibold mb-1 block">Care Details / Questions</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your care needs or questions..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-gray-50 min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-bold text-base h-12 rounded-xl shadow-md"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-[#40ddd3]" />
                          Submitting...
                        </div>
                      ) : (
                        "Submit Consultation Request"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                    <h4 className="text-xl font-bold text-green-900">Request Submitted!</h4>
                    <p className="text-green-800 text-sm">
                      Thank you for contacting Akirapa Home Care. A care manager will reach out at {formData.phone} shortly.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-green-600 text-green-700"
                    >
                      Submit Another Message
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Burlington Location Map */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#76248a] bg-[#76248a]/10 px-4 py-1.5 rounded-full">
              Our Location
            </span>
            <h2 className="text-3xl font-black text-gray-900">Visit Our Burlington Office</h2>
            <p className="text-gray-600 text-sm">83 Cambridge Street, Burlington, MA 01803</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-[400px]">
            <iframe
              title="Akirapa Home Care Burlington MA Location"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=83+Cambridge+Street+Burlington+MA+01803&output=embed"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
