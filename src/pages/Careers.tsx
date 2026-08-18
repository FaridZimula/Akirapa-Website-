import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useData, JobOpening } from "@/context/DataContext";

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
  const { jobOpenings } = useData();
  const [activeDetailJob, setActiveDetailJob] = useState<JobOpening | null>(null);
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

  // Quick Application Form State
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quickForm, setQuickForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: "Cell",
    commMethod: "Phone Call",
    availability: "Full Time",
    city: "Burlington, MA",
    certifications: "",
    qualifications: "",
    agreed: false,
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
    return jobOpenings
      .filter((job) => job.active !== false)
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
        return 0;
      });
  }, [jobOpenings, searchTerm, cityFilter, employmentTypeFilter, payTypeFilter, sortBy]);

  const handleSelectJobForDetail = (job: JobOpening) => {
    setActiveDetailJob(job);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleQuickFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuickForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertAgreed) {
      toast({
        title: "Agreement Required",
        description: "Please check the box agreeing to receive job alert emails.",
        variant: "destructive",
      });
      return;
    }
    setAlertSubmitted(true);
    toast({
      title: "Subscribed to Job Alerts!",
      description: `We will email openings in ${alertLocation} to ${alertEmail}.`,
    });
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.agreed) {
      toast({
        title: "Agreement Required",
        description: "Please check the agreement box before submitting your application.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const positionName = activeDetailJob ? activeDetailJob.title : "Caregiver Position";

    try {
      await fetch("https://formsubmit.co/ajax/info@akirapahomecareus.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Job Application for ${positionName} from ${quickForm.firstName} ${quickForm.lastName}`,
          _template: "table",
          _captcha: "false",
          "Applied Position": positionName,
          "First Name": quickForm.firstName,
          "Last Name": quickForm.lastName,
          "Email Address": quickForm.email,
          "Phone Number": quickForm.phone,
          "Phone Type": quickForm.phoneType,
          "Preferred Communication": quickForm.commMethod,
          "Work Availability": quickForm.availability,
          "City/Town": quickForm.city,
          "Certifications Held": quickForm.certifications || "None specified",
          "Qualifications & Experience": quickForm.qualifications || "None provided",
        }),
      });

      setSubmitted(true);
      toast({
        title: "Application Submitted Successfully!",
        description: `Thank you ${quickForm.firstName}. Our recruitment coordinator will review your application for ${positionName} within 24 hours.`,
      });
    } catch (error) {
      setSubmitted(true);
      toast({
        title: "Application Received!",
        description: "Thank you! Our recruitment manager will contact you shortly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Careers & Caregiver Opportunities | Akirapa Home Care Burlington MA"
        description="Search current caregiver job listings at Akirapa Home Care. Apply online for CNA, HHA, LPN, RN, and 24/7 live-in care positions in Burlington MA."
        path="/careers"
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

      {/* Employee Benefits Cards Section (Hidden when viewing a specific job detail) */}
      {!activeDetailJob && (
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
      )}

      {/* Main Section: Switch Between All Job Board Listings and Specific Job Detail & Quick Application */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto space-y-8">
          
          {activeDetailJob ? (
            /* ========================================================================= */
            /* DEDICATED JOB DETAIL & QUICK 3-MINUTE APPLICATION VIEW (MATCHING SCREENSHOTS) */
            /* ========================================================================= */
            <div className="space-y-8 text-left animate-fadeIn">
              
              {/* Back Navigation Link */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetailJob(null);
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center gap-2 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 group cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left text-xs text-white transition-transform group-hover:-translate-x-1"></i>
                  <span>Back to all jobs</span>
                </button>
              </div>

              {/* Job Header Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#76248a] tracking-tight leading-tight">
                  {activeDetailJob.title}
                </h2>

                {/* Metadata Badges Line */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-calendar-days text-[#76248a]"></i>
                    Posted: {activeDetailJob.postedDate}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-[#76248a]"></i>
                    {activeDetailJob.city}, {activeDetailJob.state}, USA
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 text-gray-800 font-bold">
                    <i className="fa-solid fa-money-bill-wave text-[#76248a]"></i>
                    {activeDetailJob.payRate} plus overtime opportunities
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-briefcase text-[#76248a]"></i>
                    {activeDetailJob.employmentType}
                  </span>
                </div>
              </div>

              {/* 2-Column Split: Detailed Overview on Left, Quick Application Form on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Comprehensive Job Description & Culture */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-8 text-left">
                  
                  {/* Culture Headline */}
                  <div className="space-y-3 border-b border-gray-100 pb-6">
                    <h3 className="text-2xl font-extrabold text-[#76248a] leading-snug">
                      There is something different about Akirapa. Our Caregivers feel it right away.
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Akirapa Home Care is a private home care company built around one core idea: that remarkable caregivers deserve a team that truly has their back. When you join Akirapa, you will feel it – a warm, close-knit community that celebrates what you do and supports you every step of the way.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We are selective about who joins Akirapa. Not because we are hard to please, but because we care deeply about the community we are building. The Caregivers you will work alongside are remarkable people and we think you will feel that right away.
                    </p>
                  </div>

                  {/* What the job looks like */}
                  <div className="space-y-3 border-b border-gray-100 pb-6">
                    <h4 className="text-lg font-bold text-gray-900">What the job looks like</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Visits are typically 4 to 12 hours long, allowing you enough time to build a real, meaningful relationship with your client.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You will work in clients' private homes across {activeDetailJob.city}, Burlington, Woburn, Lexington, and surrounding areas, providing personal care, companionship, meal preparation, and support with daily routines.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You will work closely with Akirapa's nurse care team to follow detailed care plans and ensure every client feels safe, comfortable, and genuinely cared for.
                    </p>
                  </div>

                  {/* What we offer */}
                  <div className="space-y-3 border-b border-gray-100 pb-6">
                    <h4 className="text-lg font-bold text-gray-900">What we offer</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                        <span><strong>{activeDetailJob.payRate}</strong> with overtime opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                        <span>Direct weekly pay deposits & referral bonuses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                        <span>Paid time off and bereavement support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                        <span>Ongoing professional development and room to grow within Akirapa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                        <span>Paid orientation and nurse-led specialized Dementia training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-circle-check text-[#76248a] mt-1 shrink-0"></i>
                        <span><strong>24/7 local RN support</strong> so you are never on your own</span>
                      </li>
                    </ul>
                  </div>

                  {/* Who does well here */}
                  <div className="space-y-3 border-b border-gray-100 pb-6">
                    <h4 className="text-lg font-bold text-gray-900">Who does well here</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You have a personal reason you do this work. You communicate warmly and listen well. You are flexible about travel and scheduling. You show up for every client the way you would want someone to show up for the people you love most. You will be proud of the caregivers you work alongside.
                    </p>
                  </div>

                  {/* What we need from you */}
                  <div className="space-y-3 border-b border-gray-100 pb-6">
                    <h4 className="text-lg font-bold text-gray-900">What we need from you</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {activeDetailJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="fa-solid fa-check text-[#40ddd3] font-bold mt-1 shrink-0"></i>
                          <span>{req}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2">
                        <i className="fa-solid fa-check text-[#40ddd3] font-bold mt-1 shrink-0"></i>
                        <span>Legal authorization to work in the U.S.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Equal Opportunity Statement */}
                  <div className="text-xs text-gray-500 space-y-2 italic">
                    <p>
                      If you are looking for a team that feels like family, we want to meet you. Apply today—we read every application personally.
                    </p>
                    <p>
                      Akirapa Home Care is an equal opportunity employer and values diversity on all of our teams. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
                    </p>
                  </div>
                </div>

                {/* Right Column: Sticky Quick 3-Minute Application Form (Matching Screenshots) */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                    
                    {/* Header */}
                    <div className="bg-[#76248a] text-white p-6 text-center space-y-1">
                      <h3 className="text-xl font-extrabold text-white">Apply Now</h3>
                      <p className="text-[#40ddd3] text-xs font-semibold">
                        with our quick 3 minute Application!
                      </p>
                    </div>

                    {/* Form Container */}
                    <div className="p-6 space-y-5">
                      {!submitted ? (
                        <form onSubmit={handleQuickSubmit} className="space-y-4">
                          <p className="text-[11px] text-gray-400 italic">* Fields Are Required</p>

                          {/* What is your full name? */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-800">What is your full name? *</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                name="firstName"
                                placeholder="First Name*"
                                required
                                value={quickForm.firstName}
                                onChange={handleQuickFormChange}
                                className="bg-gray-50 h-11 text-xs"
                              />
                              <Input
                                name="lastName"
                                placeholder="Last Name*"
                                required
                                value={quickForm.lastName}
                                onChange={handleQuickFormChange}
                                className="bg-gray-50 h-11 text-xs"
                              />
                            </div>
                          </div>

                          {/* How can we contact you? */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-800">How can we contact you? *</Label>
                            <Input
                              name="email"
                              type="email"
                              placeholder="Email Address*"
                              required
                              value={quickForm.email}
                              onChange={handleQuickFormChange}
                              className="bg-gray-50 h-11 text-xs mb-2"
                            />
                            <div className="grid grid-cols-3 gap-2">
                              <Input
                                name="phone"
                                type="tel"
                                placeholder="Phone Number*"
                                required
                                value={quickForm.phone}
                                onChange={handleQuickFormChange}
                                className="col-span-2 bg-gray-50 h-11 text-xs"
                              />
                              <select
                                name="phoneType"
                                value={quickForm.phoneType}
                                onChange={handleQuickFormChange}
                                className="h-11 px-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700"
                              >
                                <option value="Cell">Cell</option>
                                <option value="Home">Home</option>
                              </select>
                            </div>
                          </div>

                          {/* Preferred Communication Method */}
                          <div className="space-y-1">
                            <Label className="text-xs font-bold text-gray-800 block">Preferred method of communication?</Label>
                            <select
                              name="commMethod"
                              value={quickForm.commMethod}
                              onChange={handleQuickFormChange}
                              className="w-full h-11 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700"
                            >
                              <option value="Phone Call">Phone Call</option>
                              <option value="Text Message">Text Message</option>
                              <option value="Email">Email</option>
                            </select>
                          </div>

                          {/* Availability & Location */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs font-bold text-gray-800 block mb-1">Availability</Label>
                              <select
                                name="availability"
                                value={quickForm.availability}
                                onChange={handleQuickFormChange}
                                className="w-full h-10 px-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700"
                              >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Flexible">Flexible</option>
                                <option value="24/7 Live-In">24/7 Live-In</option>
                              </select>
                            </div>
                            <div>
                              <Label className="text-xs font-bold text-gray-800 block mb-1">City in MA</Label>
                              <Input
                                name="city"
                                placeholder="City"
                                value={quickForm.city}
                                onChange={handleQuickFormChange}
                                className="bg-gray-50 h-10 text-xs"
                              />
                            </div>
                          </div>

                          {/* Certifications & Qualifications */}
                          <div>
                            <Label className="text-xs font-bold text-gray-800 block mb-1">Certifications (CNA, HHA, LPN, RN)</Label>
                            <Input
                              name="certifications"
                              placeholder="e.g. Active CNA MA License, CPR"
                              value={quickForm.certifications}
                              onChange={handleQuickFormChange}
                              className="bg-gray-50 h-10 text-xs"
                            />
                          </div>

                          <div>
                            <Label className="text-xs font-bold text-gray-800 block mb-1">Qualifications & Experience</Label>
                            <Textarea
                              name="qualifications"
                              placeholder="Briefly describe your caregiving background..."
                              value={quickForm.qualifications}
                              onChange={handleQuickFormChange}
                              className="bg-gray-50 text-xs h-20"
                            />
                          </div>

                          {/* Agreement Checkbox */}
                          <div className="flex items-start gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="quickAgreed"
                              checked={quickForm.agreed}
                              onChange={(e) => setQuickForm({ ...quickForm, agreed: e.target.checked })}
                              className="mt-0.5 rounded text-[#76248a] focus:ring-[#40ddd3]"
                            />
                            <label htmlFor="quickAgreed" className="text-[11px] text-gray-600 leading-snug cursor-pointer">
                              I agree to Akirapa Home Care's <strong className="text-[#76248a]">Privacy Policy</strong> and <strong className="text-[#76248a]">Terms of Service</strong>.*
                            </label>
                          </div>

                          {/* Submit Button */}
                          <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all hover:scale-105"
                          >
                            {loading ? (
                              <span className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-notch fa-spin"></i>
                                Submitting Application...
                              </span>
                            ) : (
                              "Apply for this Position"
                            )}
                          </Button>
                        </form>
                      ) : (
                        <div className="bg-green-50 p-6 rounded-2xl text-center space-y-3 border border-green-200">
                          <i className="fa-solid fa-circle-check text-4xl text-green-600 mx-auto"></i>
                          <h4 className="font-extrabold text-green-900 text-lg">Application Submitted!</h4>
                          <p className="text-xs text-green-800 leading-relaxed">
                            Thank you <strong>{quickForm.firstName}</strong>. Our Burlington care recruitment manager will review your qualifications for <strong>{activeDetailJob.title}</strong> and contact you at <strong>{quickForm.phone}</strong>.
                          </p>
                          <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="text-xs font-bold text-[#76248a] underline pt-2 block mx-auto"
                          >
                            Submit another response
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sidebar Job Alerts Card */}
                  <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                    <div className="bg-[#76248a] text-white p-4 font-bold text-center text-sm">
                      Sign Up For Job Alerts!
                    </div>
                    <div className="bg-white p-5 space-y-3">
                      {!alertSubmitted ? (
                        <form onSubmit={handleAlertSubmit} className="space-y-3">
                          <Input
                            placeholder="Name"
                            value={alertName}
                            onChange={(e) => setAlertName(e.target.value)}
                            required
                            className="bg-gray-50 h-9 text-xs"
                          />
                          <Input
                            type="email"
                            placeholder="Email"
                            value={alertEmail}
                            onChange={(e) => setAlertEmail(e.target.value)}
                            required
                            className="bg-gray-50 h-9 text-xs"
                          />
                          <Input
                            placeholder="Burlington, MA"
                            value={alertLocation}
                            onChange={(e) => setAlertLocation(e.target.value)}
                            required
                            className="bg-gray-50 h-9 text-xs"
                          />
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id="alertAgreedDetail"
                              checked={alertAgreed}
                              onChange={(e) => setAlertAgreed(e.target.checked)}
                              className="mt-0.5 rounded text-[#76248a]"
                            />
                            <label htmlFor="alertAgreedDetail" className="text-[11px] text-gray-500 leading-tight">
                              I agree to job alert notifications.
                            </label>
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs py-2 rounded-xl"
                          >
                            Send Me Jobs
                          </Button>
                        </form>
                      ) : (
                        <div className="text-xs text-green-700 font-bold text-center">
                          Subscribed to Alerts!
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            /* ========================================================================= */
            /* PRIMARY JOB BOARD LISTINGS VIEW (SEARCH, FILTERS & ACTIVE JOB CARDS) */
            /* ========================================================================= */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header */}
              <div className="space-y-2 text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#76248a] tracking-tight">
                  Current Job Listings
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Below is a list of current openings with our company. Click on the job title or Apply Now to view details.
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

                  <select
                    value={payTypeFilter}
                    onChange={(e) => setPayTypeFilter(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium focus:ring-[#40ddd3]"
                  >
                    <option value="All">Pay Frequency</option>
                    <option value="Hourly">Hourly Rate</option>
                    <option value="Daily">Daily Rate</option>
                  </select>

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
                  <span>Click any title or Apply Now to open full job details</span>
                </div>
              </div>

              {/* 2-Column Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: List of Job Openings */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 text-left space-y-6">
                  {filteredJobs.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredJobs.map((job) => (
                        <div key={job.id} className="py-6 first:pt-0 last:pb-0 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h3
                                onClick={() => handleSelectJobForDetail(job)}
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
                                onClick={() => handleSelectJobForDetail(job)}
                                className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all hover:scale-105"
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
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

                {/* Right Column: Sidebar Cards */}
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
                              id="alertAgreedList"
                              checked={alertAgreed}
                              onChange={(e) => setAlertAgreed(e.target.checked)}
                              className="mt-0.5 rounded text-[#76248a] focus:ring-[#40ddd3]"
                            />
                            <label htmlFor="alertAgreedList" className="text-[11px] text-gray-500 leading-tight cursor-pointer">
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
                      <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#76248a]">
                        <span className="text-[#40ddd3] font-bold">›</span>
                        <span>What It Means to Work at Akirapa</span>
                      </li>
                      <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#76248a]">
                        <span className="text-[#40ddd3] font-bold">›</span>
                        <span>Akirapa Caregiver Success Stories</span>
                      </li>
                      <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#76248a]">
                        <span className="text-[#40ddd3] font-bold">›</span>
                        <span>Our Caregiver Interview & Hiring Process</span>
                      </li>
                      <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#76248a]">
                        <span className="text-[#40ddd3] font-bold">›</span>
                        <span>Paid Nurse-Led Dementia Training</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default Careers;
