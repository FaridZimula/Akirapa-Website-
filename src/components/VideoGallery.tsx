import React from 'react';
import { useData } from '@/context/DataContext';

const getYoutubeId = (url: string) => {
    // Enhanced regex to support standard, short, embed, and shorts URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const VideoGallery = () => {
    const { videos } = useData();

    // If no videos, don't render the section
    if (!videos || videos.length === 0) return null;

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-background">
            <div className="container-narrow mx-auto">
                <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Our Stories & Highlights
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        See the impact of our programs and hear directly from the youth we empower.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {videos.sort((a, b) => a.order - b.order).map((video) => {
                        const videoId = getYoutubeId(video.video_url);
                        return (
                            <div 
                                key={video.id} 
                                data-aos="fade-up"
                                className="group flex flex-col space-y-4"
                            >
                                <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-secondary transition-transform duration-500 hover:scale-[1.02]">
                                    {videoId ? (
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            Video link is invalid
                                        </div>
                                    )}
                                </div>
                                <div className="px-2">
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                                        {video.description}
                                    </p>
                                    <a 
                                        href={video.video_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                                    >
                                        Watch on YouTube
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default VideoGallery;
