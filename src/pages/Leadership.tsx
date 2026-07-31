import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { leaders, boardMembers } from "@/data/leadership";
import { testimonials } from "@/data/testimonials";
import { ShieldCheck, Award, Heart, MapPin, Phone, Mail, Star, FileText, CheckCircle2, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Leadership = () => {
  const { toast } = useToast();
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewLocation, setReviewLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Testimonial Submitted!",
      description: "Thank you for sharing your feedback with Akirapa Home Care.",
    });
  };

  return (
    <Layout>
      <SEO
        title="About Us & Leadership | Akirapa Home Care Burlington MA"
        description="Learn about Akirapa Home Care's history since 2013, founded by Cathy Akirapa and Stuart Ssemwogerere in Burlington MA. Read client reviews and senior care decision guides."
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">

          <h1 className="text-4xl sm:text-5xl font-black text-white">
            About Akirapa Home Care
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Dedicated to providing dignified, personalized, and contract-free in-home care for seniors and individuals across Massachusetts.
          </p>
        </div>
      </section>

      {/* History & Timeline */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">


              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Over a Decade of Healthcare Compassion
              </h2>

              <p className="text-gray-700 text-base leading-relaxed">
                Akirapa Home Care was founded in 2013 by <strong>Cathy Akirapa</strong> (CNA & Financial Professional) alongside <strong>Stuart Ssemwogerere</strong> (Executive Director). Driven by personal family experiences with senior care, they established an agency that prioritizes comfort, family involvement, and certified medical standards.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] font-bold flex items-center justify-center shrink-0">
                    2013
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Founding of Akirapa Home Care</h4>
                    <p className="text-xs text-gray-600">Started providing in-home caregiver assistance and flexible scheduling for local Burlington families.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] font-bold flex items-center justify-center shrink-0">
                    2015
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Official Incorporation & Agency Expansion</h4>
                    <p className="text-xs text-gray-600">Incorporated in Massachusetts, introducing certified nursing assistant (CNA) specialized care programs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-[#40ddd3] font-bold flex items-center justify-center shrink-0">
                    2017
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Healthcare Provider Partnerships & Portal Launch</h4>
                    <p className="text-xs text-gray-600">Established partnerships with regional hospitals and introduced real-time family care portals.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#76248a] text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-6 border border-[#40ddd3]/30">
                <div className="w-14 h-14 rounded-2xl bg-[#40ddd3] text-[#76248a] flex items-center justify-center shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white">Our Mission & Promises</h3>
                <ul className="space-y-4 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#40ddd3] shrink-0 mt-0.5" />
                    <span><strong>Dignity & Respect:</strong> Treating every client like a cherished family member.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#40ddd3] shrink-0 mt-0.5" />
                    <span><strong>Flexibility Without Contracts:</strong> No long-term lock-in contracts; change care schedules anytime.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#40ddd3] shrink-0 mt-0.5" />
                    <span><strong>Family Communication:</strong> Keeping relatives updated in real time via our care coordination portal.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-white/20 text-xs text-[#40ddd3] font-semibold">
                  Headquarters: 83 Cambridge Street, Burlington, MA 01803
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Meet Our Executive Leaders
            </h2>
            <p className="text-gray-600 text-lg">
              Combining healthcare experience, financial oversight, and compassionate care management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#76248a] text-[#40ddd3] text-xs font-bold px-3 py-1 rounded-full">
                      Co-Founder
                    </div>
                  </div>
                  <div className="p-8 space-y-3">
                    <h3 className="text-2xl font-black text-gray-900">{leader.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#76248a]">{leader.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                  </div>
                </div>

                {leader.email && (
                  <div className="px-8 pb-8 pt-0">
                    <a
                      href={`mailto:${leader.email}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#76248a] hover:underline"
                    >
                      <Mail className="w-4 h-4 text-[#40ddd3]" />
                      <span>{leader.email}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Review Submission Form */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Testimonials List */}
            <div className="lg:col-span-7 space-y-6">

              <h2 className="text-3xl font-black text-gray-900">
                Stories of Care & Trust
              </h2>

              <div className="space-y-6">
                {testimonials.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-sm">"{item.text}"</p>
                    <div className="text-xs font-bold text-gray-900">
                      {item.author} — <span className="font-normal text-gray-500">{item.relation} ({item.location})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Submit Your Review */}
            <div className="lg:col-span-5">
              <div className="bg-[#76248a] text-white p-8 rounded-3xl shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-[#40ddd3]" />
                  <h3 className="text-2xl font-black text-white">Share Your Feedback</h3>
                </div>
                <p className="text-white/80 text-xs">
                  Has your family experienced care from Akirapa Home Care? Submit a testimonial.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4 text-gray-900">
                    <div>
                      <Label className="text-white text-xs font-semibold mb-1 block">Your Name</Label>
                      <Input
                        placeholder="e.g. Sarah M."
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-xs font-semibold mb-1 block">Location / City</Label>
                      <Input
                        placeholder="e.g. Burlington, MA"
                        value={reviewLocation}
                        onChange={(e) => setReviewLocation(e.target.value)}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-xs font-semibold mb-1 block">Your Experience</Label>
                      <Textarea
                        placeholder="Describe your care experience..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        className="bg-white min-h-[100px]"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-[#76248a] font-bold">
                      Submit Review
                    </Button>
                  </form>
                ) : (
                  <div className="bg-white/10 p-6 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-[#40ddd3] mx-auto" />
                    <h4 className="font-bold text-white">Thank You!</h4>
                    <p className="text-white/80 text-xs">Your review has been submitted for verification.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Senior Care Decision Guides & Downloadable Resources */}
      <section className="section-padding bg-gray-50 border-t border-gray-200">
        <div className="container-narrow mx-auto text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">

            <h2 className="text-3xl font-black text-gray-900">
              Senior Care Decision Guides & Handbooks
            </h2>
            <p className="text-gray-600 text-sm">
              Download our complimentary resources to help navigate home care choices and consumer rights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <FileText className="w-8 h-8 text-[#76248a]" />
              <h4 className="font-bold text-gray-900">Senior In-Home Care Decision Guide</h4>
              <p className="text-xs text-gray-600">A step-by-step checklist comparing home care vs assisted living facilities.</p>
              <Button variant="outline" size="sm" asChild className="w-full border-[#76248a] text-[#76248a]">
                <Link to="/contact">Request PDF Copy</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <FileText className="w-8 h-8 text-[#76248a]" />
              <h4 className="font-bold text-gray-900">Consumer Rights & Caregiver Checklist</h4>
              <p className="text-xs text-gray-600">Essential information on Massachusetts home health consumer rights and caregiver standards.</p>
              <Button variant="outline" size="sm" asChild className="w-full border-[#76248a] text-[#76248a]">
                <Link to="/contact">Request PDF Copy</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <FileText className="w-8 h-8 text-[#76248a]" />
              <h4 className="font-bold text-gray-900">Respite Caregiver Burnout Recovery Plan</h4>
              <p className="text-xs text-gray-600">Practical tips for primary family caregivers to manage stress and schedule relief shifts.</p>
              <Button variant="outline" size="sm" asChild className="w-full border-[#76248a] text-[#76248a]">
                <Link to="/contact">Request PDF Copy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Leadership;
