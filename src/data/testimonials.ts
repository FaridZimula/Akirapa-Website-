export interface Testimonial {
  id: string;
  author: string;
  location: string;
  relation: string;
  rating: number;
  text: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    author: "Barbara S.",
    location: "Kelowna, BC",
    relation: "Daughter of Senior Client",
    rating: 5,
    text: "I am more than fully satisfied with the exceptional care provided by Akirapa Home Care. Living in a different province, having Cathy and her team look after my aging mother gave our entire family incredible peace of mind. The caregivers treated her with dignity, warmth, and genuine affection.",
    date: "January 2025"
  },
  {
    id: "testimonial-2",
    author: "Scott S.",
    location: "California, USA",
    relation: "Father of Care Recipient",
    rating: 5,
    text: "We are confident leaving our daughter in Akirapa Home Care's quality care! Their attention to detail, reliability, and round-the-clock responsiveness have been outstanding. We couldn't ask for a more compassionate team.",
    date: "February 2025"
  },
  {
    id: "testimonial-3",
    author: "Margaret H.",
    location: "Burlington, MA",
    relation: "Client",
    rating: 5,
    text: "After my hip replacement surgery, the Hospital to Home care team from Akirapa made sure I recovered smoothly at home without any complications. They helped me with meals, prescriptions, and physical therapy exercises. Highly recommended!",
    date: "December 2024"
  },
  {
    id: "testimonial-4",
    author: "David & Ellen R.",
    location: "Lexington, MA",
    relation: "Family Members",
    rating: 5,
    text: "Finding reliable respite care for my husband with Alzheimer's was stressful until we met Cathy Akirapa and Stuart Ssemwogerere. Their specialized caregivers are professional, gentle, and deeply knowledgeable.",
    date: "March 2025"
  }
];
