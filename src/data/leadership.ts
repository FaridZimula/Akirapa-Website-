export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    email?: string;
}

export const leaders: TeamMember[] = [
    {
        name: "Cathy Akirapa",
        role: "Founder, CNA & Financial Professional",
        bio: "Cathy founded Akirapa Home Care in 2013 with a vision to provide dignified, compassionate, and personalized in-home senior care. As a certified nursing assistant and financial professional, she ensures every care plan balances high-quality healthcare standards with accessible care management.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        email: "info@akirapahomecareus.com"
    },
    {
        name: "Stuart Ssemwogerere",
        role: "Co-Founder & Executive Director",
        bio: "Stuart co-leads Akirapa Home Care, directing operations, healthcare provider partnerships, and caregiving excellence. He is passionate about empowering families with senior care resources, real-time family communication tools, and around-the-clock peace of mind.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
        email: "info@akirapahomecareus.com"
    }
];

export const boardMembers: TeamMember[] = [
    {
        name: "Bedford Care Coordination Team",
        role: "Care Assessment Specialists",
        bio: "Our licensed care managers conduct free in-home assessments to design customized care plans for seniors throughout Bedford and Greater Boston.",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Certified Nursing Assistants (CNAs)",
        role: "Dedicated Caregivers",
        bio: "Background-checked, compassionate professionals providing 24/7 care, mobility support, medication management, and daily companionship.",
        image: "https://images.unsplash.com/photo-1590611936760-eeb9bc59302d?auto=format&fit=crop&q=80&w=600"
    }
];
