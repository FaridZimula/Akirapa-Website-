import React from "react";

interface FacebookVideoEmbedProps {
  embedHtml?: string;
  url?: string;
  title: string;
  type?: "video" | "post";
  className?: string;
}

/**
 * Extracts the `src` attribute from a Facebook iframe string or returns the URL directly.
 */
function extractIframeSrc(embedHtml?: string, fallbackUrl?: string): string | null {
  if (!embedHtml) return fallbackUrl || null;
  const match = embedHtml.match(/src=["'](.*?)["']/);
  return match ? match[1] : (embedHtml.startsWith("http") ? embedHtml : null);
}

export const FacebookVideoEmbed: React.FC<FacebookVideoEmbedProps> = ({
  embedHtml,
  url,
  title,
  type = "video",
  className = "",
}) => {
  const iframeSrc = extractIframeSrc(embedHtml, url);

  if (!iframeSrc) {
    return null;
  }

  const isPost = type === "post" || iframeSrc.includes("plugins/post.php");

  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 border border-purple-500/20 shadow-xl ${className}`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 text-white/90 font-bold">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1877f2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1877f2]"></span>
          </span>
          <i className="fa-brands fa-facebook text-[#1877f2] text-sm"></i>
          <span>{isPost ? "Facebook Post Spotlight" : "Facebook Video Story"}</span>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#40ddd3] hover:text-white transition-colors text-[11px] font-semibold"
          >
            <span>Open on Facebook</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        )}
      </div>

      {/* Responsive Iframe Container */}
      <div className="flex items-center justify-center p-2 sm:p-4 bg-black/60">
        {isPost ? (
          <div className="w-full max-w-[500px] flex justify-center overflow-hidden rounded-xl bg-white shadow-lg">
            <iframe
              src={iframeSrc}
              title={title}
              width="500"
              height="410"
              style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full min-h-[410px] rounded-xl"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative w-full max-w-[560px] aspect-[16/9] sm:aspect-[560/314] overflow-hidden rounded-xl shadow-2xl bg-black flex items-center justify-center">
            <iframe
              src={iframeSrc}
              title={title}
              width="560"
              height="314"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full h-full rounded-xl"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Bottom Information / Action Pill */}
      <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-white/60">
        <span className="truncate max-w-[80%]">
          <i className="fa-solid fa-circle-play text-[#40ddd3] mr-1.5"></i>
          {title}
        </span>
        <span className="text-[10px] uppercase font-bold text-white/40">Akirapa Official</span>
      </div>
    </div>
  );
};

export default FacebookVideoEmbed;
