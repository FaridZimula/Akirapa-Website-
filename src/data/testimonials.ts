export interface Testimonial {
  id: string;
  author: string;
  location: string;
  relation?: string;
  rating: number;
  text: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    author: "Barbara S.",
    location: "Newton, MA",
    relation: "Client Family",
    rating: 5,
    text: "i am more than fully satisfied with the excellent service provided so carefully and so sincerely by each and every care giver."
  },
  {
    id: "testimonial-2",
    author: "Habib M.",
    location: "Calgary",
    relation: "Client Family",
    rating: 5,
    text: "we are confident leaving mother in akirapa homecare's quality care! they deliver wonderful service with a personal touch!"
  },
  {
    id: "testimonial-3",
    author: "Jennifer R.",
    location: "Caregiving daughter",
    relation: "Caregiving daughter",
    rating: 5,
    text: "my mom's primary caregiver is wonderful. the nurse is wonderful and the overall experience was awesome!"
  }
];
