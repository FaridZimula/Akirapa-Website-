import { useState, useEffect } from "react";
import DonationCard from "@/components/DonationCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Heart, Target, ArrowRight, Globe, BookOpen, Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-youth.jpg";
// Images are now loaded from the public directory using static paths
import leaderImage from "@/assets/leader-1.jpg";

import { useData, initialProjects, initialPartners } from "@/context/DataContext";
import ProjectCard from "@/components/ProjectCard";
import VideoGallery from "@/components/VideoGallery";
import CountUp from "@/components/CountUp";
import SEO from "@/components/SEO";

const stats = [
  { number: "5,000+", label: "Youth Empowered", icon: Users },
  { number: "50+", label: "Active Projects", icon: Target },
  { number: "25+", label: "Communities Reached", icon: Globe },
  { number: "100+", label: "Volunteers", icon: Heart },
];


const slides = [
  {
    image: "/Slide 1.jpg",
    title: (
      <>
        Empowering Youth,{" "}
        <span className="text-yellow-400">Transforming</span> Communities
      </>
    ),
    description: "We believe in the power of young people to create lasting change. Join us in building a future where every youth has the opportunity to thrive."
  },
  {
    image: "/Slide 2 (2).jpg",
    title: (
      <>
        Building Skills{" "}
        <span className="text-yellow-400">for Tomorrow</span>
      </>
    ),
    description: "Equipping the next generation with the knowledge, technical expertise, and confidence to succeed in a rapidly evolving world."
  },
  {
    image: "/Slide3.jpg",
    title: (
      <>
        Nurturing{" "}
        <span className="text-yellow-400">Future Leaders</span>
      </>
    ),
    description: "Creating pathways for mentorship and personal growth to develop strong, compassionate leaders who serve their communities."
  }
];

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { projects, partners } = useData();
  
  // Enforce the exact original order for the featured projects
  const originalOrder = [
    "Youth Leadership in Community Action",
    "Outreach to Ishaka Adventist Hospital",
    "Basoga Nssete Leadership Training",
    "Mentorship and Career Guidance",
    "Inter-University Mentorship Front",
    "Community Outreach: Market Cleanup",
    "Community Outreach: Elderly & Orphans",
    "44th Tarehe Sita Anniversary Celebrations",
    "State Dinner: 44th Tarehe Sita Anniversary",
    "National University Leadership Training",
    "Mentorship at Bassajabalaba Secondary School",
    "Counseling and Guidance at Bassajabalaba Secondary School",
    "Tech & Innovation: Mastering the New Economy"
  ];

  const filtered = projects.filter(p => originalOrder.includes(p.title));
  
  const sortedProjects = (filtered.length > 0 ? filtered : initialProjects)
    .sort((a, b) => {
      const indexA = originalOrder.indexOf(a.title);
      const indexB = originalOrder.indexOf(b.title);
      return indexA - indexB;
    });

  // Filter and fallback for partners
  const originalPartners = ["Pamoja Foundation", "Balunywa Leadership Academy"];
  const filteredPartners = partners.filter(p => originalPartners.includes(p.name));
  const finalPartners = filteredPartners.length > 0 ? filteredPartners : initialPartners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-background">
        <div className="relative min-h-[85vh] rounded-[2.5rem] overflow-hidden flex items-center shadow-2xl">
          <div className="absolute inset-0 z-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                  src={slide.image}
                  alt={`SUYEL Youth Empowerment - ${slide.description.substring(0, 50)}...`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
              </div>
            ))}
          </div>

          <div className="w-full px-8 md:px-12 lg:px-16 relative z-10">
            <div className="max-w-2xl">
              <div key={currentSlide} className="animate-fade-up">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed shadow-sm">
                  {slides[currentSlide].description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/projects">
                    Explore Our Work
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="heroOutline" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-background">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Side - Image Card */}
            <div data-aos="fade-right" className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-xl group">
              <img
                src="/Milestone 2.jpg"
                alt="SUYEL Impact Milestone - Youth Engagement in Uganda"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>

            {/* Right Side - Content & Stats */}
            <div data-aos="fade-left" className="flex flex-col justify-center">

              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Our Milestones
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We have successfully executed impactful initiatives ranging from youth mentorship programs, community health outreach, skills training workshops, and educational support projects across various districts in Uganda.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto">
                <div className="bg-primary rounded-[2rem] p-4 sm:p-6 text-center card-elevated hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center h-[120px] sm:h-[140px]">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                    <CountUp end={6000} suffix="+" duration={4000} />
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap">Youth Empowered</div>
                </div>
                <div className="bg-primary rounded-[2rem] p-4 sm:p-6 text-center card-elevated hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center h-[120px] sm:h-[140px]">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                    <CountUp end={10} suffix="+" duration={2000} />
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap">Active Projects</div>
                </div>
                <div className="bg-primary rounded-[2rem] p-4 sm:p-6 text-center card-elevated hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center h-[120px] sm:h-[140px]">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                    <CountUp end={15} suffix="+" duration={2000} />
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap">Communities Reached</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <section
        className="relative bg-fixed bg-cover bg-center py-12 md:py-20"
        style={{ backgroundImage: "url('/Slide 1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="container-narrow mx-auto relative z-10 px-4">
          <div data-aos="zoom-in" className="max-w-4xl mx-auto border border-white/30 bg-black/30 backdrop-blur-sm rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join SUYEL today</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Be part of a thriving community that celebrates shared memories, fosters lifelong connections, and gives back. Together, we can make a difference through impactful projects, mentorship, and support for future generations.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none rounded-full px-10 text-lg h-14 shadow-lg hover:shadow-primary/25 transition-all duration-300" asChild>
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Corporate Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Corporate Partners
            </h2>
            <p className="text-muted-foreground text-lg">
              Collaborating with industry leaders to create sustainable impact.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-8">
            {finalPartners.map((partner, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
                className="bg-secondary rounded-2xl p-6 flex items-center justify-center w-64 h-48 hover:bg-secondary/80 transition-colors shadow-sm cursor-pointer group"
              >
                <img
                  src={partner.logo}
                  alt={`Official Partner of SUYEL - ${partner.name} Uganda`}
                  className="max-w-full max-h-full object-contain filter hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-background">
        <div className="bg-secondary rounded-[2.5rem] py-16 shadow-xl">
          <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
            <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-12">

              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                Featured Projects and Activities
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover how we're making a difference in the lives of young people across communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProjects.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.shortDescription}
                  images={project.images}
                  icon={project.icon}
                  showIcon={true}
                  variant="home"
                  category={project.category}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <VideoGallery />

      {/* Message from Our President */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Portrait Image */}
            <div data-aos="fade-right" className="relative">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 w-full max-w-md mx-auto lg:mr-auto">
                <img
                  src="/Presidents photo.jpg"
                  alt="KIRUNDA MUHAWUYA - SUYEL President and Founder"
                  className="w-full h-full object-cover [transform:scaleX(-1)]"
                />
              </div>

            </div>

            {/* Right Side - Article */}
            {/* Right Side - Article */}
            <div data-aos="fade-left" className="text-center lg:text-left">

              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Message from Our President
              </h2>
              <div className="prose prose-lg text-muted-foreground mx-auto lg:mx-0">
                <p className="mb-4">
                  "At SUYEL, we envision a future where every young person is empowered to reach their full potential. Our journey has been one of resilience, innovation, and unwavering commitment to our community. We believe that the youth are not just beneficiaries of development, but active partners in driving sustainable change."
                </p>
                <p className="mb-4">
                  "Seeing the transformation in the lives of the youth we work with is what drives us every day. From the classroom to the boardroom, we are nurturing a generation of leaders who will shape the destiny of our nation. Our programs are designed to bridge the gap between potential and opportunity, providing the skills and mentorship needed to succeed."
                </p>

                {isExpanded && (
                  <div className="animate-fade-in space-y-4">
                    <p>
                      "We recognize the challenges that lie ahead, but we are fueled by the passion and creativity of the young minds we engage with. Through collaboration with our partners and the community, we are building ecosystems of support that enable innovation and entrepreneurship to thrive."
                    </p>
                    <p>
                      "Our commitment extends beyond just skills training; we are fostering a culture of integrity, empathy, and social responsibility. We want our future leaders to lead with heart and purpose, making decisions that benefit not only themselves but society as a whole."
                    </p>
                    <p>
                      "We invite you to join us on this transformative journey. Together, we can build a legacy of hope and opportunity for generations to come. Your support, whether through partnership, volunteerism, or advocacy, is crucial to our mission."
                    </p>
                  </div>
                )}

                {!isExpanded && (
                  <p>
                    "We invite you to join us on this transformative journey..."
                  </p>
                )}
              </div>

              <div className="mt-6">
                {!isExpanded ? (
                  <Button
                    onClick={() => setIsExpanded(true)}
                    className="bg-primary text-white hover:bg-primary/90 rounded-full px-8"
                  >
                    Read More
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsExpanded(false)}
                    className="bg-primary text-white hover:bg-primary/90 rounded-full px-8"
                  >
                    Show Less
                  </Button>
                )}
              </div>

              <div className="mt-8 border-t border-border/50 pt-6 inline-block w-full">
                <h4 className="text-xl font-bold text-foreground">KIRUNDA MUHAWUYA</h4>
                <p className="text-primary font-medium">President & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-background">
        <div className="container-narrow mx-auto">
          <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <DonationCard
              variant="landscape"
              providerName="Stanbic Bank"
              accountName="Account Number"
              accountNumber="9030025735322"
              logoSrc="/stanbic logo.jpg"
              colorClass="bg-blue-600"
              className="lg:col-span-2 xl:col-span-1"
            />

          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-background">
        <div data-aos="zoom-in" className="relative bg-primary rounded-[2.5rem] py-16 text-center shadow-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-[0.15]">
            <img src="/Make a difference.jpg" alt="Join SUYEL to support youth empowerment projects" className="w-full h-full object-cover" />
          </div>

          <div className="container-narrow mx-auto relative z-10 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
              Whether you want to volunteer, donate, or partner with us, there are many ways to support our mission of empowering youth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero" asChild>
                <Link to="/contact">Contact Us Today</Link>
              </Button>
              <Button size="lg" variant="heroOutline" asChild>
                <Link to="/leadership">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
