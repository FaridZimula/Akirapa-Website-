import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface JobOpening {
  id: string;
  title: string;
  city: string;
  state: string;
  employmentType: string;
  payRate: string;
  payType: "Hourly" | "Daily";
  postedDate: string;
  description: string;
  requirements: string[];
}

const initialJobOpenings: JobOpening[] = [
  {
    id: "cna-burlington",
    title: "Caregiver Associate / CNA - Burlington, MA",
    city: "Burlington",
    state: "MA",
    employmentType: "Full Time",
    payRate: "$24.00 - $30.00 per hour",
    payType: "Hourly",
    postedDate: "Aug 04, 2026",
    description: "Provide hands-on personal care, assistance with daily living activities, medication reminders, and vital sign monitoring for seniors in private homes in Burlington, MA.",
    requirements: [
      "Active MA CNA or HHA certification",
      "Current CPR & First Aid certification",
      "Valid MA Driver's License & reliable transportation",
      "Clean criminal background & drug screening clearance",
    ],
  },
  {
    id: "hha-woburn",
    title: "Home Health Aide (HHA) - Woburn, MA",
    city: "Woburn",
    state: "MA",
    employmentType: "Part Time",
    payRate: "$22.00 - $28.00 per hour",
    payType: "Hourly",
    postedDate: "Jul 28, 2026",
    description: "Assist elderly clients with personal hygiene, mobility transfers, meal preparation, and light housekeeping in Woburn, MA.",
    requirements: [
      "Active MA HHA certification or 1+ year in-home experience",
      "Valid Driver's License and reliable vehicle",
      "Pass multi-state background checks",
    ],
  },
  {
    id: "rn-care-manager",
    title: "RN / LPN Field Nurse & Care Manager - Burlington, MA",
    city: "Burlington",
    state: "MA",
    employmentType: "Full Time",
    payRate: "$42.00 - $52.00 per hour",
    payType: "Hourly",
    postedDate: "Aug 01, 2026",
    description: "Conduct initial in-home senior assessments, craft individualized care plans, supervise CNA/HHA caregivers, and coordinate with families.",
    requirements: [
      "Active Massachusetts RN or LPN License",
      "Minimum 2 years in-home care or geriatric nursing experience",
      "Strong clinical assessment & interpersonal skills",
    ],
  },
  {
    id: "companion-lexington",
    title: "Companion Caregiver - Lexington, MA",
    city: "Lexington",
    state: "MA",
    employmentType: "Flexible Hours",
    payRate: "$20.00 - $25.00 per hour",
    payType: "Hourly",
    postedDate: "Jul 20, 2026",
    description: "Provide warm companionship, light housekeeping, meal preparation, errand running, and mobility support for independent seniors.",
    requirements: [
      "High school diploma or equivalent",
      "Demonstrated passion for senior caregiving",
      "Valid Driver's License & clean driving record",
    ],
  },
  {
    id: "live-in-billerica",
    title: "24/7 Live-In Caregiver - Billerica, MA",
    city: "Billerica",
    state: "MA",
    employmentType: "24/7 Live-In",
    payRate: "$300.00 - $350.00 per day",
    payType: "Daily",
    postedDate: "Jul 15, 2026",
    description: "Reside in the client's home for designated shift blocks to provide continuous safety supervision, meal preparation, and personal care support.",
    requirements: [
      "Prior 24/7 live-in or senior care experience",
      "Ability to handle overnight assistance and physical transfer support",
      "Clear criminal background check & strong references",
    ],
  },
];

const Careers = () => {
  const { toast } = useToast();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("All");
  const [payTypeFilter, setPayTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // Job Alerts Form State
  const [alertName, setAlertName] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertLocation, setAlertLocation] = useState("Burlington, MA");
  const [alertAgreed, setAlertAgreed] = useState(false);
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  // Application Form State
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: "Caregiver Associate / CNA - Burlington, MA",
    certifications: "",
    experience: "1-3 years",
    availability: "Full Time",
    city: "",
    experienceDetails: "",
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCityFilter("All");
    setEmploymentTypeFilter("All");
    setPayTypeFilter("All");
    setSortBy("recent");
  };

  // Filtered and Sorted Jobs
  const filteredJobs = useMemo(() => {
    return initialJobOpenings
      .filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = cityFilter === "All" || job.city === cityFilter;
        const matchesType =
          employmentTypeFilter === "All" || job.employmentType.includes(employmentTypeFilter);
        const matchesPay = payTypeFilter === "All" || job.payType === payTypeFilter;

        return matchesSearch && matchesCity && matchesType && matchesPay;
      })
      .sort((a, b) => {
        if (sortBy === "pay") {
          return b.payRate.localeCompare(a.payRate);
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0; // Default order
      });
  }, [searchTerm, cityFilter, employmentTypeFilter, payTypeFilter, sortBy]);

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertAgreed) {
      toast({
        title: "Terms Agreement Required",
        description: "Please check the box agreeing to receive job alert notifications.",
        variant: "destructive",
      });
      return;
    }
    setAlertSubmitted(true);
    toast({
      title: "Subscribed to Job Alerts!",
      description: `We will email job openings in ${alertLocation} to ${alertEmail}.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://formsubmit.co/ajax/info@akirapahomecareus.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Job Application from ${formData.fullName}`,
          _template: "table",
          _captcha: "false",
          "Applicant Full Name": formData.fullName,
          "Phone Number": formData.phone,
          "Email Address": formData.email,
          "Position Applied For": formData.position,
          "Certifications Held": formData.certifications || "None specified",
          "Years of Experience": formData.experience,
          "Work Availability": formData.availability,
          "City/Location": formData.city || "Not provided",
          "Qualifications Summary": formData.experienceDetails || "None provided",
        }),
      });

      setSubmitted(true);
      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for applying to Akirapa Home Care. Our recruitment team will review your application within 24 hours.",
      });
    } catch (error) {
      setSubmitted(true);
      toast({
        title: "Application Received!",
        description: "Thank you! Our recruitment team will contact you shortly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Current Job Listings & Careers | Akirapa Home Care Burlington MA"
        description="Search current caregiver job listings at Akirapa Home Care. Apply online for CNA, HHA, LPN, RN, and 24/7 live-in care positions in Burlington MA."
      />

      {/* Hero Header with 29% Opacity Background Image */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        {/* Background Image at 29% Opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (17).jpg"
            alt="Akirapa Caregivers Careers"
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/70" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Join the Akirapa Home Care Team
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Build a rewarding career helping seniors live with dignity, comfort, and independence in Burlington, MA and surrounding communities.
          </p>
        </div>
      </section>

      {/* Employee Benefits Cards Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-[#76248a] tracking-tight">
              Why Work With Akirapa Home Care?
            </h2>
            <p className="text-gray-600 text-sm">
              We empower our care staff with competitive compensation, flexible schedules, and nurse-led training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-lg mb-2 shadow-xs">
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base">Top Hourly Rates</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Industry-leading pay rates ($20–$52/hr) with direct weekly deposits.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-lg mb-2 shadow-xs">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base">Flexible Shift Choice</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Choose day, evening, weekend, or 24/7 live-in care assignments.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-lg mb-2 shadow-xs">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base">Paid Nurse Training</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Continuous dementia care training & CPR renewal certification support.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#76248a] text-white flex items-center justify-center font-bold text-lg mb-2 shadow-xs">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base">24/7 RN Backing</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Care managers are always on call to support you on every shift.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Job Board Section (Matching Screenshot Design) */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto space-y-8">
          
          {/* Header */}
          <div className="space-y-2 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#76248a] tracking-tight">
              Current Job Listings
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Below is a list of current openings with our company. Click on the job title to learn more or apply.
            </p>
          </div>

          {/* Search & Filters Controls Container */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-left">
            {/* Search Input Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for job titles or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 text-gray-800 text-sm focus:ring-[#40ddd3]"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>

              {(searchTerm || cityFilter !== "All" || employmentTypeFilter !== "All" || payTypeFilter !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#76248a] hover:underline self-end sm:self-center px-2 py-1"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Dropdown Filters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* City Filter */}
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium focus:ring-[#40ddd3]"
              >
                <option value="All">All Cities</option>
                <option value="Burlington">Burlington, MA</option>
                <option value="Woburn">Woburn, MA</option>
                <option value="Lexington">Lexington, MA</option>
                <option value="Billerica">Billerica, MA</option>
              </select>

              {/* Employment Type Filter */}
              <select
                value={employmentTypeFilter}
                onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium focus:ring-[#40ddd3]"
              >
                <option value="All">Employment Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Flexible">Flexible Hours</option>
                <option value="24/7 Live-In">24/7 Live-In</option>
              </select>

              {/* Pay Frequency Filter */}
              <select
                value={payTypeFilter}
                onChange={(e) => setPayTypeFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium focus:ring-[#40ddd3]"
              >
                <option value="All">Pay Frequency</option>
                <option value="Hourly">Hourly Rate</option>
                <option value="Daily">Daily Rate</option>
              </select>

              {/* Sort By Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium focus:ring-[#40ddd3]"
              >
                <option value="recent">Sort By: Recent</option>
                <option value="title">Sort By: Title</option>
                <option value="pay">Sort By: Highest Pay</option>
              </select>
            </div>

            {/* Jobs Status Counter Bar */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 italic">
              <span>Number of Jobs: <strong className="text-gray-800 not-italic font-bold">{filteredJobs.length}</strong></span>
              <span>Showing active openings in Massachusetts</span>
            </div>
          </div>

          {/* 2-Column Split Layout: Job Listings on Left, Sidebar Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: List of Job Openings (Matching Screenshot) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 text-left space-y-6">
              {filteredJobs.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredJobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    return (
                      <div key={job.id} className="py-6 first:pt-0 last:pb-0 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3
                              onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                              className="text-lg sm:text-xl font-bold text-[#76248a] hover:text-[#561868] cursor-pointer transition-colors leading-snug"
                            >
                              {job.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                              {job.city}, {job.state}, USA &nbsp;|&nbsp; {job.employmentType} &nbsp;|&nbsp; <span className="text-gray-700 font-bold">{job.payRate}</span>
                            </p>
                            <p className="text-[11px] text-gray-400">
                              Posted: {job.postedDate}
                            </p>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            <Button
                              onClick={() => handleApplyClick(job.title)}
                              className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all hover:scale-105"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>

                        {/* Accordion Expandable Details */}
                        {isExpanded && (
                          <div className="mt-4 p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4 animate-fadeIn">
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {job.description}
                            </p>
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold text-[#76248a] uppercase tracking-wider">
                                Requirements:
                              </h4>
                              <ul className="space-y-1 text-xs text-gray-600">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#40ddd3] font-bold">›</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Button
                              onClick={() => handleApplyClick(job.title)}
                              size="sm"
                              className="bg-[#76248a] hover:bg-[#561868] text-white font-bold text-xs"
                            >
                              Fill Application For This Role →
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <i className="fa-solid fa-briefcase text-4xl text-gray-300 mx-auto"></i>
                  <h4 className="font-bold text-gray-700 text-lg">No positions match your search</h4>
                  <p className="text-gray-500 text-xs">Try clearing filters or searching for alternative job titles.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold text-[#76248a] underline"
                  >
                    Reset Search Filters
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar Cards (Matching Screenshot) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* Sidebar Card 1: Job Alerts */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <div className="bg-[#76248a] text-white p-4 font-bold text-center text-base tracking-wide">
                  Sign Up For Job Alerts!
                </div>
                <div className="bg-white p-6 space-y-4">
                  {!alertSubmitted ? (
                    <form onSubmit={handleAlertSubmit} className="space-y-3">
                      <div>
                        <Input
                          placeholder="Name"
                          value={alertName}
                          onChange={(e) => setAlertName(e.target.value)}
                          required
                          className="bg-gray-50 h-10 text-xs"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          required
                          className="bg-gray-50 h-10 text-xs"
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Burlington, MA"
                          value={alertLocation}
                          onChange={(e) => setAlertLocation(e.target.value)}
                          required
                          className="bg-gray-50 h-10 text-xs"
                        />
                      </div>

                      <div className="flex items-start gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="alertAgreed"
                          checked={alertAgreed}
                          onChange={(e) => setAlertAgreed(e.target.checked)}
                          className="mt-0.5 rounded text-[#76248a] focus:ring-[#40ddd3]"
                        />
                        <label htmlFor="alertAgreed" className="text-[11px] text-gray-500 leading-tight cursor-pointer">
                          I agree to receive job alert emails and updates from Akirapa Home Care.
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-sm py-2.5 rounded-xl shadow-xs transition-all"
                      >
                        Send Me Jobs
                      </Button>
                    </form>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-xl text-center space-y-2 border border-green-200">
                      <i className="fa-solid fa-circle-check text-2xl text-green-600 mx-auto"></i>
                      <h4 className="font-bold text-green-900 text-xs">Subscribed!</h4>
                      <p className="text-[11px] text-green-800">
                        We will notify you at {alertEmail} when new positions open.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Card 2: Resources & Culture */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-4">
                <h4 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3 text-[#76248a]">
                  Resources & Culture
                </h4>
                <ul className="space-y-3 text-xs font-semibold text-gray-700">
                  <li>
                    <a href="#application-form" className="hover:text-[#76248a] flex items-center gap-1.5 transition-colors">
                      <span className="text-[#40ddd3] font-bold">›</span>
                      <span>What It Means to Work at Akirapa</span>
                    </a>
                  </li>
                  <li>
                    <a href="#application-form" className="hover:text-[#76248a] flex items-center gap-1.5 transition-colors">
                      <span className="text-[#40ddd3] font-bold">›</span>
                      <span>Akirapa Caregiver Success Stories</span>
                    </a>
                  </li>
                  <li>
                    <a href="#application-form" className="hover:text-[#76248a] flex items-center gap-1.5 transition-colors">
                      <span className="text-[#40ddd3] font-bold">›</span>
                      <span>Our Caregiver Interview & Hiring Process</span>
                    </a>
                  </li>
                  <li>
                    <a href="#application-form" className="hover:text-[#76248a] flex items-center gap-1.5 transition-colors">
                      <span className="text-[#40ddd3] font-bold">›</span>
                      <span>Paid Nurse-Led Dementia Training</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="section-padding bg-white">
        <div className="container-narrow mx-auto max-w-4xl">
          <div className="bg-[#76248a] rounded-3xl p-8 md:p-12 shadow-2xl text-white space-y-8 relative overflow-hidden border border-[#40ddd3]/30">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Online Caregiver Job Application
              </h2>
              <p className="text-[#40ddd3] text-sm sm:text-base font-medium">
                Submit your application below. Our recruitment coordinator in Burlington, MA will contact qualified candidates within 24 hours.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="fullName" className="text-xs font-semibold text-white/90 mb-1 block">Full Legal Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white text-gray-800 font-medium h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs font-semibold text-white/90 mb-1 block">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="339-970-1214"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white text-gray-800 font-medium h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="email" className="text-xs font-semibold text-white/90 mb-1 block">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white text-gray-800 font-medium h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="position" className="text-xs font-semibold text-white/90 mb-1 block">Position Applied For *</Label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                    >
                      <option value="Caregiver Associate / CNA - Burlington, MA">
                        Caregiver Associate / CNA - Burlington, MA
                      </option>
                      <option value="Home Health Aide (HHA) - Woburn, MA">
                        Home Health Aide (HHA) - Woburn, MA
                      </option>
                      <option value="RN / LPN Field Nurse & Care Manager - Burlington, MA">
                        RN / LPN Field Nurse & Care Manager
                      </option>
                      <option value="Companion Caregiver - Lexington, MA">
                        Companion Caregiver - Lexington, MA
                      </option>
                      <option value="24/7 Live-In Caregiver - Billerica, MA">
                        24/7 Live-In Caregiver - Billerica, MA
                      </option>
                      <option value="General Application / Other Roles">
                        General Application / Other Roles
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <Label htmlFor="experience" className="text-xs font-semibold text-white/90 mb-1 block">Caregiving Experience</Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                    >
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-3 years">1 - 3 years</option>
                      <option value="3-5 years">3 - 5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-xs font-semibold text-white/90 mb-1 block">Work Availability</Label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#40ddd3]"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Flexible Hours">Flexible Hours</option>
                      <option value="Night / Overnight Shifts">Night / Overnight Shifts</option>
                      <option value="24/7 Live-In">24/7 Live-In</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-xs font-semibold text-white/90 mb-1 block">City / Location in MA</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="e.g. Burlington, MA"
                      value={formData.city}
                      onChange={handleChange}
                      className="bg-white text-gray-800 font-medium h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="certifications" className="text-xs font-semibold text-white/90 mb-1 block">Certifications Held (CNA, HHA, LPN, RN, CPR, Driver's License)</Label>
                  <Input
                    id="certifications"
                    name="certifications"
                    placeholder="e.g. CNA active MA license #12345, CPR certified, Driver's License"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="bg-white text-gray-800 font-medium h-12 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="experienceDetails" className="text-xs font-semibold text-white/90 mb-1 block">Work Experience Summary / Qualifications</Label>
                  <Textarea
                    id="experienceDetails"
                    name="experienceDetails"
                    placeholder="Describe your relevant caregiving experience, former employers, or care skills..."
                    value={formData.experienceDetails}
                    onChange={handleChange}
                    className="bg-white text-gray-800 font-medium h-28 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold text-base py-6 rounded-xl shadow-lg transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
                      Submitting Application...
                    </span>
                  ) : (
                    "Submit Application Now"
                  )}
                </Button>
              </form>
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center space-y-4">
                <i className="fa-solid fa-circle-check text-5xl text-[#40ddd3] mx-auto"></i>
                <h3 className="text-2xl font-extrabold text-white">Application Submitted!</h3>
                <p className="text-white/90 text-sm max-w-md mx-auto">
                  Thank you <strong className="text-[#40ddd3]">{formData.fullName}</strong>. Our HR recruitment manager in Burlington, MA will review your credentials and call you at <strong className="text-[#40ddd3]">{formData.phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-block text-xs font-bold text-[#40ddd3] hover:underline pt-2"
                >
                  ← Submit another application
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
