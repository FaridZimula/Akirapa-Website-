import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { leaders } from "@/data/leadership";
import { testimonials } from "@/data/testimonials";
import { useToast } from "@/hooks/use-toast";

const Leadership = () => {
  const { toast } = useToast();
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

  return (
    <Layout>
      <SEO
        title="About Us & Leadership | Akirapa Home Care Burlington MA"
        description="Learn about Akirapa Home Care's history since 2013, founded by Cathy Akirapa and Stuart Ssemwogerere in Burlington MA. Read client reviews and senior care decision guides."
        path="/about"
      />

      {/* Hero Header with 29% Opacity Background Image */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        {/* Background Image at 29% Opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (18).jpg"
            alt="About Akirapa Home Care"
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/70" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
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
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Founded in 2013 by <strong>Cathy Akirapa</strong> (CNA & Financial Professional) and <strong>Stuart Ssemwogerere</strong> (Executive Director), Akirapa Home Care was created out of a deep personal commitment to senior well-being and accessible healthcare management.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                After official incorporation in 2015, Akirapa Home Care expanded regional caregiver training programs in 2017, establishing a benchmark for high-quality, contract-free in-home support across Burlington, MA and neighboring communities.
              </p>

              {/* Milestones List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    2013
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Founded in Burlington, MA</h4>
                    <p className="text-xs text-gray-600">Established by Cathy Akirapa & Stuart Ssemwogerere to provide personal in-home care.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    2015
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Official Incorporation & Caregiver Standards</h4>
                    <p className="text-xs text-gray-600">Incorporated as a licensed home health care organization with certified nursing assistants.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
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
              <div className="bg-[#76248a] text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-6 border border-white/20">
                <div className="w-14 h-14 rounded-2xl bg-[#40ddd3] text-white flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-award text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-black text-white">Our Mission & Promises</h3>
                <ul className="space-y-4 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#40ddd3] text-lg shrink-0 mt-0.5"></i>
                    <span><strong>Dignity & Respect:</strong> Treating every client like a cherished family member.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#40ddd3] text-lg shrink-0 mt-0.5"></i>
                    <span><strong>Flexibility Without Contracts:</strong> No long-term lock-in contracts; change care schedules anytime.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-[#40ddd3] text-lg shrink-0 mt-0.5"></i>
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
                        <i key={i} className="fa-solid fa-star text-sm"></i>
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
                  <i className="fa-solid fa-comment-dots text-2xl text-white"></i>
                  <h3 className="text-2xl font-black text-white">Share Your Feedback</h3>
                </div>
                <p className="text-white/80 text-xs">
                  Has your family experienced care from Akirapa Home Care? Submit a testimonial.
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
                        className="bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="relation" className="text-white text-xs font-semibold">Relation</Label>
                        <Input
                          id="relation"
                          placeholder="e.g. Daughter of Client"
                          value={relation}
                          onChange={(e) => setRelation(e.target.value)}
                          required
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-white text-xs font-semibold">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g. Burlington, MA"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          className="bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="rating" className="text-white text-xs font-semibold">Rating (1 to 5 Stars)</Label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none"
                      >
                        <option value={5}>5 Stars - Excellent Care</option>
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
                        className="bg-white h-24"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-bold text-base h-12 rounded-xl">
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
              <i className="fa-solid fa-file-lines text-3xl text-[#76248a]"></i>
              <h4 className="font-bold text-gray-900">Senior In-Home Care Decision Guide</h4>
              <p className="text-xs text-gray-600">A step-by-step checklist comparing home care vs assisted living facilities.</p>
              <Button variant="outline" size="sm" asChild className="w-full border-[#76248a] text-[#76248a]">
                <Link to="/contact">Request PDF Copy</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <i className="fa-solid fa-file-lines text-3xl text-[#76248a]"></i>
              <h4 className="font-bold text-gray-900">Caregiver Burnout & Respite Handbook</h4>
              <p className="text-xs text-gray-600">Strategies for family members managing elder care responsibilities.</p>
              <Button variant="outline" size="sm" asChild className="w-full border-[#76248a] text-[#76248a]">
                <Link to="/contact">Request PDF Copy</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
              <i className="fa-solid fa-file-lines text-3xl text-[#76248a]"></i>
              <h4 className="font-bold text-gray-900">Massachusetts Consumer Rights Guide</h4>
              <p className="text-xs text-gray-600">Understanding home health care regulations, privacy, and client safeguards.</p>
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
