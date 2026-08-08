import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { projects as initialProjects } from '@/data/projects';
import { leaders as initialLeaders, boardMembers as initialBoardMembers } from '@/data/leadership';
import { partners as initialPartners } from '@/data/partners';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const initialVideos: Video[] = [
    { 
        id: 'default-video',
        title: "Our Impact & Mission", 
        description: "A highlight of our activities and the impact we are making in the community.", 
        video_url: "https://youtube.com/shorts/sk4vFIBLSR4", 
        order: 0,
        created_at: new Date().toISOString()
    }
];

export { initialProjects, initialLeaders, initialBoardMembers, initialPartners };

export interface Project {
    id?: string;
    title: string;
    category: string;
    description: string;
    shortDescription?: string;
    short_description?: string;
    impact: string;
    images: string[];
    icon: string;
    order?: number;
}

export interface Leader {
    id?: string;
    name: string;
    role: string;
    bio?: string;
    image: string;
    type?: 'LEADER' | 'BOARD';
    order?: number;
}

export interface Partner {
    id?: string;
    name: string;
    logo: string;
    order?: number;
}

export interface Message {
    id: string;
    full_name: string;
    email: string;
    subject: string;
    content: string;
    created_at: string;
    read: boolean;
    name?: string;
    message?: string;
    date?: string;
}

export interface Donation {
    id: string;
    amount: number;
    status: string;
    created_at: string;
    donor_name?: string;
    email?: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url?: string;
    order: number;
    created_at: string;
}

export interface JobOpening {
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
    active?: boolean;
}

export const initialJobOpenings: JobOpening[] = [
    {
        id: "job-1",
        title: "Caregiver Associate / CNA - Burlington, MA",
        city: "Burlington",
        state: "MA",
        employmentType: "Full Time",
        payRate: "$24.00 - $30.00 per hour",
        payType: "Hourly",
        postedDate: "Aug 04, 2026",
        description: "Provide compassionate personal care support, assisting with daily living activities, mobility assistance, medication reminders, and companionship for seniors in Burlington.",
        requirements: [
            "Active MA CNA or HHA certification",
            "Current CPR & First Aid certification",
            "Valid Driver's License & reliable personal transport",
            "Clean background check & drug screening"
        ],
        active: true
    },
    {
        id: "job-2",
        title: "In-Home Caregiver - Woburn & Lexington, MA",
        city: "Woburn",
        state: "MA",
        employmentType: "Flexible Hours",
        payRate: "$22.00 - $28.00 per hour",
        payType: "Hourly",
        postedDate: "Aug 02, 2026",
        description: "Support local seniors in Woburn and Lexington with meal preparation, light housekeeping, errands, and personal hygiene assistance. Flexible day and weekend shifts available.",
        requirements: [
            "1+ years caregiver or home health experience",
            "Demonstrated empathy and patience with elderly clients",
            "Strong communication skills",
            "Background check clearance"
        ],
        active: true
    },
    {
        id: "job-3",
        title: "24/7 Live-In Care Specialist - Middlesex County, MA",
        city: "Lexington",
        state: "MA",
        employmentType: "24/7 Live-In",
        payRate: "$280.00 - $350.00 per day",
        payType: "Daily",
        postedDate: "Jul 28, 2026",
        description: "Provide comprehensive 24/7 live-in personal care assistance for seniors requiring ongoing supervision, meal planning, hygiene aid, and mobility assistance in Middlesex County.",
        requirements: [
            "3+ years senior caregiving or live-in experience",
            "Dementia & Alzheimer's care experience preferred",
            "Reliable and trustworthy work history with references",
            "CPR certification"
        ],
        active: true
    },
    {
        id: "job-4",
        title: "Night & Weekend Senior Care Aide - Billerica, MA",
        city: "Billerica",
        state: "MA",
        employmentType: "Part Time",
        payRate: "$25.00 - $32.00 per hour",
        payType: "Hourly",
        postedDate: "Jul 25, 2026",
        description: "Assisting seniors with evening routines, overnight safety monitoring, mobility assistance, and morning preparation in Billerica.",
        requirements: [
            "Overnight shift availability",
            "CNA or HHA preferred",
            "Clean background check"
        ],
        active: true
    },
    {
        id: "job-5",
        title: "Registered Nurse (RN) Care Manager - Burlington Office",
        city: "Burlington",
        state: "MA",
        employmentType: "Full Time",
        payRate: "$42.00 - $52.00 per hour",
        payType: "Hourly",
        postedDate: "Jul 20, 2026",
        description: "Conduct client care assessments, design individualized care plans, perform caregiver orientation, and provide 24/7 supervisory support.",
        requirements: [
            "Current MA Registered Nurse (RN) License",
            "2+ years home health or geriatric nursing experience",
            "Excellent assessment & clinical leadership skills"
        ],
        active: true
    }
];

interface DataContextType {
    projects: Project[];
    leaders: Leader[];
    boardMembers: Leader[];
    partners: Partner[];
    messages: Message[];
    donations: Donation[];
    videos: Video[];
    jobOpenings: JobOpening[];
    isLoading: boolean;
    isSupabaseConnected: boolean;

    updateProjects: (projects: Project[]) => Promise<void>;
    updateLeaders: (leaders: Leader[]) => Promise<void>;
    updateBoardMembers: (members: Leader[]) => Promise<void>;
    updatePartners: (partners: Partner[]) => Promise<void>;
    updateVideos: (videos: Video[]) => Promise<void>;
    addJobOpening: (job: JobOpening) => Promise<void>;
    updateJobOpening: (job: JobOpening) => Promise<void>;
    deleteJobOpening: (id: string) => Promise<void>;
    resetJobOpenings: () => void;
    sendMessage: (msg: { full_name: string; email: string; subject: string; content: string }) => Promise<void>;
    markMessageRead: (id: string) => Promise<void>;
    deleteMessage: (id: string) => Promise<void>;
    addDonation: (donation: { donor_name?: string; email?: string; amount: number; status?: string }) => Promise<void>;
    resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [leaders, setLeaders] = useState<Leader[]>(initialLeaders);
    const [boardMembers, setBoardMembers] = useState<Leader[]>(initialBoardMembers);
    const [partners, setPartners] = useState<Partner[]>(initialPartners);
    const [messages, setMessages] = useState<Message[]>([]);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(() => {
        try {
            const saved = localStorage.getItem('akirapa_job_openings');
            return saved ? JSON.parse(saved) : initialJobOpenings;
        } catch (e) {
            return initialJobOpenings;
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

    // Initial Supabase Data Fetching
    useEffect(() => {
        const fetchSupabaseData = async () => {
            if (!isSupabaseConfigured) {
                setIsLoading(false);
                return;
            }

            try {
                // Fetch Projects
                const { data: dbProjects, error: prjErr } = await supabase.from('projects').select('*').order('order_index');
                if (!prjErr && dbProjects && dbProjects.length > 0) {
                    setProjects(dbProjects.map((p: any) => ({
                        ...p,
                        shortDescription: p.short_description
                    })));
                    setIsSupabaseConnected(true);
                }

                // Fetch Leaders & Board Members
                const { data: dbLeaders, error: leadErr } = await supabase.from('leaders').select('*').order('order_index');
                if (!leadErr && dbLeaders && dbLeaders.length > 0) {
                    setLeaders(dbLeaders.filter((l: any) => l.type === 'LEADER' || !l.type));
                    setBoardMembers(dbLeaders.filter((l: any) => l.type === 'BOARD'));
                    setIsSupabaseConnected(true);
                }

                // Fetch Partners
                const { data: dbPartners, error: prtErr } = await supabase.from('partners').select('*').order('order_index');
                if (!prtErr && dbPartners && dbPartners.length > 0) {
                    setPartners(dbPartners);
                    setIsSupabaseConnected(true);
                }

                // Fetch Videos
                const { data: dbVideos, error: vidErr } = await supabase.from('videos').select('*').order('order_index');
                if (!vidErr && dbVideos && dbVideos.length > 0) {
                    setVideos(dbVideos);
                    setIsSupabaseConnected(true);
                }

                // Fetch Job Openings
                const { data: dbJobs, error: jobErr } = await supabase.from('job_openings').select('*').order('created_at', { ascending: false });
                if (!jobErr && dbJobs && dbJobs.length > 0) {
                    setJobOpenings(dbJobs.map((j: any) => ({
                        id: j.id,
                        title: j.title,
                        city: j.city,
                        state: j.state,
                        employmentType: j.employment_type,
                        payRate: j.pay_rate,
                        payType: j.pay_type,
                        postedDate: j.posted_date,
                        description: j.description,
                        requirements: j.requirements || [],
                        active: j.active
                    })));
                    setIsSupabaseConnected(true);
                }

                // Fetch Messages
                const { data: dbMsgs, error: msgErr } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
                if (!msgErr && dbMsgs) {
                    setMessages(dbMsgs);
                    setIsSupabaseConnected(true);
                }

                // Fetch Donations
                const { data: dbDons, error: donErr } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
                if (!donErr && dbDons) {
                    setDonations(dbDons);
                    setIsSupabaseConnected(true);
                }

            } catch (error) {
                console.warn("Supabase fetch notice: Operating with local fallback.", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSupabaseData();
    }, []);

    // Persist Job Openings locally as fallback
    useEffect(() => {
        try {
            localStorage.setItem('akirapa_job_openings', JSON.stringify(jobOpenings));
        } catch (e) {
            console.error("Failed to persist job openings", e);
        }
    }, [jobOpenings]);

    // Mutation Handlers
    const updateProjects = async (newProjects: Project[]) => {
        setProjects(newProjects);
        if (isSupabaseConfigured) {
            try {
                const dbFormat = newProjects.map((p, idx) => ({
                    id: p.id || `proj-${idx + 1}`,
                    title: p.title,
                    category: p.category,
                    description: p.description,
                    short_description: p.shortDescription || p.short_description || '',
                    impact: p.impact,
                    images: p.images || [],
                    icon: p.icon,
                    order_index: idx
                }));
                await supabase.from('projects').upsert(dbFormat);
                toast.success("Projects saved to Supabase & live site!");
                return;
            } catch (err) {
                console.error("Failed to update projects in Supabase", err);
            }
        }
        toast.success("Projects updated locally");
    };

    const updateLeaders = async (newLeaders: Leader[]) => {
        setLeaders(newLeaders);
        if (isSupabaseConfigured) {
            try {
                const dbFormat = newLeaders.map((l, idx) => ({
                    id: l.id || `lead-${idx + 1}`,
                    name: l.name,
                    role: l.role,
                    bio: l.bio || '',
                    image: l.image,
                    type: 'LEADER',
                    order_index: idx
                }));
                await supabase.from('leaders').upsert(dbFormat);
                toast.success("Leadership saved to Supabase!");
                return;
            } catch (err) {
                console.error("Failed to update leaders in Supabase", err);
            }
        }
        toast.success("Leadership updated locally");
    };

    const updateBoardMembers = async (newMembers: Leader[]) => {
        setBoardMembers(newMembers);
        if (isSupabaseConfigured) {
            try {
                const dbFormat = newMembers.map((m, idx) => ({
                    id: m.id || `board-${idx + 1}`,
                    name: m.name,
                    role: m.role,
                    bio: m.bio || '',
                    image: m.image,
                    type: 'BOARD',
                    order_index: idx
                }));
                await supabase.from('leaders').upsert(dbFormat);
                toast.success("Board Members saved to Supabase!");
                return;
            } catch (err) {
                console.error("Failed to update board members in Supabase", err);
            }
        }
        toast.success("Board members updated locally");
    };

    const updatePartners = async (newPartners: Partner[]) => {
        setPartners(newPartners);
        if (isSupabaseConfigured) {
            try {
                const dbFormat = newPartners.map((p, idx) => ({
                    id: p.id || `partner-${idx + 1}`,
                    name: p.name,
                    logo: p.logo,
                    order_index: idx
                }));
                await supabase.from('partners').upsert(dbFormat);
                toast.success("Partners saved to Supabase!");
                return;
            } catch (err) {
                console.error("Failed to update partners in Supabase", err);
            }
        }
        toast.success("Partners updated locally");
    };

    const updateVideos = async (newVideos: Video[]) => {
        setVideos(newVideos);
        if (isSupabaseConfigured) {
            try {
                const dbFormat = newVideos.map((v, idx) => ({
                    id: v.id,
                    title: v.title,
                    description: v.description,
                    video_url: v.video_url,
                    thumbnail_url: v.thumbnail_url || '',
                    order_index: idx
                }));
                await supabase.from('videos').upsert(dbFormat);
                toast.success("Video Gallery saved to Supabase!");
                return;
            } catch (err) {
                console.error("Failed to update videos in Supabase", err);
            }
        }
        toast.success("Video Gallery updated locally");
    };

    const addJobOpening = async (job: JobOpening) => {
        setJobOpenings(prev => [job, ...prev]);
        if (isSupabaseConfigured) {
            try {
                await supabase.from('job_openings').insert([{
                    id: job.id,
                    title: job.title,
                    city: job.city,
                    state: job.state,
                    employment_type: job.employmentType,
                    pay_rate: job.payRate,
                    pay_type: job.payType,
                    posted_date: job.postedDate,
                    description: job.description,
                    requirements: job.requirements,
                    active: job.active ?? true
                }]);
                toast.success("Job opening published to Supabase & live website!");
                return;
            } catch (err) {
                console.error("Failed to add job opening in Supabase", err);
            }
        }
        toast.success("Job opening added successfully");
    };

    const updateJobOpening = async (updatedJob: JobOpening) => {
        setJobOpenings(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
        if (isSupabaseConfigured) {
            try {
                await supabase.from('job_openings').upsert([{
                    id: updatedJob.id,
                    title: updatedJob.title,
                    city: updatedJob.city,
                    state: updatedJob.state,
                    employment_type: updatedJob.employmentType,
                    pay_rate: updatedJob.payRate,
                    pay_type: updatedJob.payType,
                    posted_date: updatedJob.postedDate,
                    description: updatedJob.description,
                    requirements: updatedJob.requirements,
                    active: updatedJob.active ?? true
                }]);
                toast.success("Job opening updated in Supabase!");
                return;
            } catch (err) {
                console.error("Failed to update job opening in Supabase", err);
            }
        }
        toast.success("Job opening updated successfully");
    };

    const deleteJobOpening = async (id: string) => {
        setJobOpenings(prev => prev.filter(j => j.id !== id));
        if (isSupabaseConfigured) {
            try {
                await supabase.from('job_openings').delete().eq('id', id);
                toast.success("Job opening deleted from Supabase!");
                return;
            } catch (err) {
                console.error("Failed to delete job opening in Supabase", err);
            }
        }
        toast.success("Job opening deleted");
    };

    const resetJobOpenings = () => {
        setJobOpenings(initialJobOpenings);
        localStorage.removeItem('akirapa_job_openings');
        toast.info("Job openings reset to default positions");
    };

    const sendMessage = async (msg: { full_name: string; email: string; subject: string; content: string }) => {
        const newMsg: Message = {
            id: `msg-${Date.now()}`,
            full_name: msg.full_name,
            email: msg.email,
            subject: msg.subject,
            content: msg.content,
            created_at: new Date().toISOString(),
            read: false
        };
        setMessages(prev => [newMsg, ...prev]);

        if (isSupabaseConfigured) {
            try {
                await supabase.from('messages').insert([{
                    full_name: msg.full_name,
                    email: msg.email,
                    subject: msg.subject,
                    content: msg.content,
                    read: false
                }]);
            } catch (e) {
                console.error("Failed to insert message into Supabase", e);
            }
        }
    };

    const markMessageRead = async (id: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
        if (isSupabaseConfigured) {
            try {
                await supabase.from('messages').update({ read: true }).eq('id', id);
            } catch (e) {
                console.error("Failed to mark message read in Supabase", e);
            }
        }
    };

    const deleteMessage = async (id: string) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (isSupabaseConfigured) {
            try {
                await supabase.from('messages').delete().eq('id', id);
            } catch (e) {
                console.error("Failed to delete message in Supabase", e);
            }
        }
        toast.success("Message deleted");
    };

    const addDonation = async (donation: { donor_name?: string; email?: string; amount: number; status?: string }) => {
        const newDon: Donation = {
            id: `don-${Date.now()}`,
            donor_name: donation.donor_name || 'Anonymous Donor',
            email: donation.email || '',
            amount: donation.amount,
            status: donation.status || 'Completed',
            created_at: new Date().toISOString()
        };
        setDonations(prev => [newDon, ...prev]);

        if (isSupabaseConfigured) {
            try {
                await supabase.from('donations').insert([{
                    donor_name: donation.donor_name || 'Anonymous Donor',
                    email: donation.email,
                    amount: donation.amount,
                    status: donation.status || 'Completed'
                }]);
            } catch (e) {
                console.error("Failed to record donation in Supabase", e);
            }
        }
    };

    const resetData = () => {
        setProjects(initialProjects);
        setLeaders(initialLeaders);
        setBoardMembers(initialBoardMembers);
        setPartners(initialPartners);
        setVideos(initialVideos);
        setJobOpenings(initialJobOpenings);
        setMessages([]);
        setDonations([]);
        toast.info("Data reset to defaults");
    };

    return (
        <DataContext.Provider value={{
            projects,
            leaders,
            boardMembers,
            partners,
            messages,
            donations,
            videos,
            jobOpenings,
            isLoading,
            isSupabaseConnected,
            updateProjects,
            updateLeaders,
            updateBoardMembers,
            updatePartners,
            updateVideos,
            addJobOpening,
            updateJobOpening,
            deleteJobOpening,
            resetJobOpenings,
            sendMessage,
            markMessageRead,
            deleteMessage,
            addDonation,
            resetData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) throw new Error('useData must be used within a DataProvider');
    return context;
};
