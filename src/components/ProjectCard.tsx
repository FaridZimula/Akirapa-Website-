import { useState, useEffect } from "react";
import * as Icons from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    images: string[];
    icon: string;
    category?: string; // Optional, typically used on Projects page
    impact?: string;   // Optional, typically used on Projects page
    layout?: "grid" | "list"; // To differentiate styling if needed
    showIcon?: boolean;
}

const ProjectCard = ({ title, description, images, icon, category, impact, layout = "grid", showIcon = false, variant = "default" }: ProjectCardProps & { variant?: "default" | "home" }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Dynamically resolve icon
    const Icon = (Icons[icon as keyof typeof Icons] as React.ElementType) || Icons.HelpCircle;


    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [images?.length]);

    const isHome = variant === "home";

    return (
        <div data-aos="fade-up" className={`${isHome ? "bg-white" : "bg-primary"} rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col`}>
            {/* Image Slideshow Area */}
            <div className={`relative overflow-hidden w-full aspect-[4/3]`}>
                {images?.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${title} - image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            } ${index === currentImageIndex ? "scale-105" : "scale-100"} transform duration-[4000ms]`}
                    />
                ))}
            </div>

            {/* Content Area */}
            <div className={`p-6 sm:p-8 flex ${isHome ? "flex-row items-start gap-4 text-left" : "flex-col flex-grow items-center text-center"}`}>

                {/* Icon handling based on variant */}
                {isHome && showIcon ? (
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mt-1">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                ) : (
                    showIcon && (
                        <div className="mb-6 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                    )
                )}

                <div className={`w-full ${isHome ? "space-y-2" : "space-y-4"}`}>
                    {category && (
                        <span className={`inline-block px-3 py-1 rounded-full font-bold uppercase tracking-wide mb-1 shadow-sm ${isHome ? "text-[10px] bg-primary text-white" : "text-xs px-4 py-1.5 bg-white text-primary"}`}>
                            {category}
                        </span>
                    )}
                    <h3 className={`font-bold leading-tight ${isHome ? "text-xl text-foreground" : "text-2xl sm:text-3xl text-white"}`}>
                        {title}
                    </h3>
                    <p className={`leading-relaxed ${isHome ? "text-sm text-muted-foreground" : "text-base sm:text-lg text-white/90 content-center"}`}>
                        {description}
                    </p>

                    {impact && (
                        <div className={`pt-2 flex ${isHome ? "justify-start" : "justify-center pt-4"}`}>
                            {isHome ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                                    <Icon className="w-3.5 h-3.5" />
                                    {impact}
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors hover:bg-white/90">
                                    <Icon className="w-4 h-4" />
                                    {impact}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
