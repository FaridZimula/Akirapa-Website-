import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { projects as initialProjects } from '@/data/projects';
import { leaders as initialLeaders, boardMembers as initialBoardMembers } from '@/data/leadership';
import { partners as initialPartners } from '@/data/partners';

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

    updateProjects: (projects: Project[]) => Promise<void>;
    updateLeaders: (leaders: Leader[]) => Promise<void>;
    updateBoardMembers: (members: Leader[]) => Promise<void>;
    updatePartners: (partners: Partner[]) => Promise<void>;
    updateVideos: (videos: Video[]) => Promise<void>;
    addJobOpening: (job: JobOpening) => Promise<void>;
    updateJobOpening: (job: JobOpening) => Promise<void>;
    deleteJobOpening: (id: string) => Promise<void>;
    resetJobOpenings: () => void;
    markMessageRead: (id: string) => Promise<void>;
    deleteMessage: (id: string) => Promise<void>;
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('akirapa_job_openings', JSON.stringify(jobOpenings));
        } catch (e) {
            console.error("Failed to persist job openings", e);
        }
    }, [jobOpenings]);

    const updateProjects = async (newProjects: Project[]) => {
        setProjects(newProjects);
        toast.success("Projects updated locally");
    };

    const updateLeaders = async (newLeaders: Leader[]) => {
        setLeaders(newLeaders);
        toast.success("Leadership updated locally");
    };

    const updateBoardMembers = async (newMembers: Leader[]) => {
        setBoardMembers(newMembers);
        toast.success("Board members updated locally");
    };

    const updatePartners = async (newPartners: Partner[]) => {
        setPartners(newPartners);
        toast.success("Partners updated locally");
    };

    const updateVideos = async (newVideos: Video[]) => {
        setVideos(newVideos);
        toast.success("Video Gallery updated locally");
    };

    const addJobOpening = async (job: JobOpening) => {
        setJobOpenings(prev => [job, ...prev]);
        toast.success("Job opening added successfully");
    };

    const updateJobOpening = async (updatedJob: JobOpening) => {
        setJobOpenings(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
        toast.success("Job opening updated successfully");
    };

    const deleteJobOpening = async (id: string) => {
        setJobOpenings(prev => prev.filter(j => j.id !== id));
        toast.success("Job opening deleted");
    };

    const resetJobOpenings = () => {
        setJobOpenings(initialJobOpenings);
        localStorage.removeItem('akirapa_job_openings');
        toast.info("Job openings reset to default positions");
    };

    const markMessageRead = async (id: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    };

    const deleteMessage = async (id: string) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        toast.success("Message deleted");
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
            updateProjects,
            updateLeaders,
            updateBoardMembers,
            updatePartners,
            updateVideos,
            addJobOpening,
            updateJobOpening,
            deleteJobOpening,
            resetJobOpenings,
            markMessageRead,
            deleteMessage,
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
