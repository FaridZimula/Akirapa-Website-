import { useState, useMemo } from "react";
import { useData, JobOpening } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Briefcase, CheckCircle2, DollarSign, MapPin } from "lucide-react";

const CareersEditor = () => {
  const { jobOpenings, addJobOpening, updateJobOpening, deleteJobOpening, resetJobOpenings } = useData();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "PAUSED">("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);

  // Form Fields State
  const [formState, setFormState] = useState<Omit<JobOpening, "id">>({
    title: "",
    city: "Burlington",
    state: "MA",
    employmentType: "Full Time",
    payRate: "$24.00 - $30.00 per hour",
    payType: "Hourly",
    postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    description: "",
    requirements: [
      "Active MA CNA or HHA certification",
      "Current CPR & First Aid certification",
      "Valid MA Driver's License & reliable vehicle",
      "Clean background check & drug screening",
    ],
    active: true,
  });

  const [reqInputText, setReqInputText] = useState("");

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : statusFilter === "ACTIVE"
          ? job.active !== false
          : job.active === false;

      return matchesSearch && matchesStatus;
    });
  }, [jobOpenings, searchTerm, statusFilter]);

  const activeCount = useMemo(() => jobOpenings.filter((j) => j.active !== false).length, [jobOpenings]);
  const hourlyCount = useMemo(() => jobOpenings.filter((j) => j.payType === "Hourly").length, [jobOpenings]);

  const handleOpenAddModal = () => {
    setEditingJob(null);
    const defaultReqs = [
      "Active MA CNA or HHA certification",
      "Current CPR & First Aid certification",
      "Valid MA Driver's License & reliable vehicle",
      "Clean background check clearance",
    ];
    setFormState({
      title: "",
      city: "Burlington",
      state: "MA",
      employmentType: "Full Time",
      payRate: "$24.00 - $30.00 per hour",
      payType: "Hourly",
      postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      description: "Provide compassionate in-home care support, assisting with daily living activities, personal hygiene, and companionship for seniors in Burlington, MA.",
      requirements: defaultReqs,
      active: true,
    });
    setReqInputText(defaultReqs.join("\n"));
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job: JobOpening) => {
    setEditingJob(job);
    setFormState({
      title: job.title,
      city: job.city,
      state: job.state,
      employmentType: job.employmentType,
      payRate: job.payRate,
      payType: job.payType,
      postedDate: job.postedDate,
      description: job.description,
      requirements: job.requirements || [],
      active: job.active !== false,
    });
    setReqInputText((job.requirements || []).join("\n"));
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedRequirements = reqInputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (editingJob && editingJob.id) {
      await updateJobOpening({
        ...editingJob,
        ...formState,
        requirements: parsedRequirements,
      });
      toast({
        title: "Job Listing Updated",
        description: `Successfully updated "${formState.title}". Changes are live on /careers.`,
      });
    } else {
      const newJob: JobOpening = {
        id: `job-${Date.now()}`,
        ...formState,
        requirements: parsedRequirements,
      };
      await addJobOpening(newJob);
      toast({
        title: "Job Listing Created",
        description: `Successfully added "${formState.title}". Visible now on /careers.`,
      });
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = async (job: JobOpening) => {
    const updatedStatus = !(job.active !== false);
    await updateJobOpening({
      ...job,
      active: updatedStatus,
    });
    toast({
      title: updatedStatus ? "Job Activated" : "Job Paused",
      description: `"${job.title}" status updated to ${updatedStatus ? "Active" : "Paused"}.`,
    });
  };

  const handleDelete = async (job: JobOpening) => {
    if (window.confirm(`Are you sure you want to delete the job listing: "${job.title}"?`)) {
      if (job.id) {
        await deleteJobOpening(job.id);
        toast({
          title: "Job Deleted",
          description: `"${job.title}" has been removed from career listings.`,
        });
      }
    }
  };

  return (
    <div className="space-y-8 font-sans text-left">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#76248a]">
            Manage Caregiver Job Listings
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Create, edit, pause, or remove job opportunities displayed on the public Careers page (/careers).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleOpenAddModal}
            className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-1 text-white" />
            <span>Add New Job Listing</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#76248a] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Job Openings</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{jobOpenings.length} Positions</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Active Openings</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{activeCount} Live on Site</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#40ddd3] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Hourly Shifts</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{hourlyCount} Openings</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search job titles or cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-gray-50 border-gray-200 text-xs"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="PAUSED">Paused Only</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={resetData ? resetJobOpenings : undefined}
              className="text-xs font-bold text-gray-600 border-gray-200"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>

      {/* Job Listings Management Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Active Careers Database</h2>
          <span className="text-xs font-semibold text-gray-500">Showing {filteredJobs.length} listing(s)</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredJobs.map((job) => {
              const isActive = job.active !== false;
              return (
                <div key={job.id} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Job Information */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#76248a]">
                        {job.title}
                      </h3>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {isActive ? "Active" : "Paused"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#76248a]" />
                        {job.city}, {job.state}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-gray-700">{job.payRate}</span>
                      <span>•</span>
                      <span>{job.employmentType}</span>
                      <span>•</span>
                      <span className="text-gray-400">Posted: {job.postedDate}</span>
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(job)}
                      className={`text-xs font-bold ${isActive ? "text-amber-600 border-amber-200 hover:bg-amber-50" : "text-green-600 border-green-200 hover:bg-green-50"}`}
                    >
                      {isActive ? <EyeOff className="w-3.5 h-3.5 mr-1" /> : <Eye className="w-3.5 h-3.5 mr-1" />}
                      {isActive ? "Pause" : "Activate"}
                    </Button>

                    <Button
                      onClick={() => handleOpenEditModal(job)}
                      className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1 text-white" />
                      <span>Edit</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(job)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-700 text-base">No job listings found</h4>
            <p className="text-gray-500 text-xs">Try adjusting your search query or click "Add New Job Listing" to create one.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Job Listing Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-gray-100 my-auto text-left">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-extrabold text-[#76248a]">
                  {editingJob ? "Edit Job Listing" : "Create New Job Listing"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {editingJob ? "Modify the parameters below. Changes will sync immediately." : "Fill out the fields to publish a new caregiver role."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-xs font-bold text-gray-800 mb-1 block">
                  Job Position Title *
                </Label>
                <Input
                  id="title"
                  required
                  placeholder="e.g. Caregiver Associate / CNA - Burlington, MA"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="bg-gray-50 h-11 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-xs font-bold text-gray-800 mb-1 block">
                    City in MA *
                  </Label>
                  <Input
                    id="city"
                    required
                    placeholder="Burlington"
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    className="bg-gray-50 h-11 text-xs"
                  />
                </div>

                <div>
                  <Label htmlFor="employmentType" className="text-xs font-bold text-gray-800 mb-1 block">
                    Employment Type *
                  </Label>
                  <select
                    id="employmentType"
                    value={formState.employmentType}
                    onChange={(e) => setFormState({ ...formState, employmentType: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Flexible Hours">Flexible Hours</option>
                    <option value="24/7 Live-In">24/7 Live-In</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payRate" className="text-xs font-bold text-gray-800 mb-1 block">
                    Pay Rate *
                  </Label>
                  <Input
                    id="payRate"
                    required
                    placeholder="e.g. $24.00 - $30.00 per hour"
                    value={formState.payRate}
                    onChange={(e) => setFormState({ ...formState, payRate: e.target.value })}
                    className="bg-gray-50 h-11 text-xs"
                  />
                </div>

                <div>
                  <Label htmlFor="payType" className="text-xs font-bold text-gray-800 mb-1 block">
                    Pay Frequency
                  </Label>
                  <select
                    id="payType"
                    value={formState.payType}
                    onChange={(e) => setFormState({ ...formState, payType: e.target.value as any })}
                    className="w-full h-11 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800"
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="postedDate" className="text-xs font-bold text-gray-800 mb-1 block">
                  Posted Date Label
                </Label>
                <Input
                  id="postedDate"
                  placeholder="Aug 08, 2026"
                  value={formState.postedDate}
                  onChange={(e) => setFormState({ ...formState, postedDate: e.target.value })}
                  className="bg-gray-50 h-11 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-xs font-bold text-gray-800 mb-1 block">
                  Detailed Job Description *
                </Label>
                <Textarea
                  id="description"
                  required
                  placeholder="Describe the duties, client environment, and responsibilities..."
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="bg-gray-50 text-xs h-28"
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-xs font-bold text-gray-800 mb-1 block">
                  Key Requirements (Enter 1 requirement per line)
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="Active MA CNA or HHA certification&#10;Valid Driver's License&#10;Clean background check"
                  value={reqInputText}
                  onChange={(e) => setReqInputText(e.target.value)}
                  className="bg-gray-50 text-xs h-28"
                />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <Button
                  type="submit"
                  className="flex-1 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md"
                >
                  {editingJob ? "Save Changes" : "Publish Job Listing"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3.5 text-xs font-bold text-gray-600 border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CareersEditor;
