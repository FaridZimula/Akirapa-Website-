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

interface DataContextType {
    projects: Project[];
    leaders: Leader[];
    boardMembers: Leader[];
    partners: Partner[];
    messages: Message[];
    donations: Donation[];
    videos: Video[];
    isLoading: boolean;

    updateProjects: (projects: Project[]) => Promise<void>;
    updateLeaders: (leaders: Leader[]) => Promise<void>;
    updateBoardMembers: (members: Leader[]) => Promise<void>;
    updatePartners: (partners: Partner[]) => Promise<void>;
    updateVideos: (videos: Video[]) => Promise<void>;
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);

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
            isLoading,
            updateProjects,
            updateLeaders,
            updateBoardMembers,
            updatePartners,
            updateVideos,
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
