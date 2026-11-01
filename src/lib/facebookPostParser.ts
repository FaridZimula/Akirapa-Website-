import { BlogPost } from "@/data/blogPosts";

export const AKIRAPA_CATEGORIES = [
  "Caregiver Support",
  "Respite Care",
  "Senior Safety",
  "Senior Living",
  "Memory & Dementia",
  "Post-Hospital Recovery",
  "Nutrition & Wellness",
] as const;

export type AkirapaCategory = typeof AKIRAPA_CATEGORIES[number];

/**
 * Generate a URL-friendly slug from a title string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

/**
 * Automatically determine the best category based on keywords
 */
export function detectCategory(text: string): AkirapaCategory {
  const lower = text.toLowerCase();

  if (/\b(dementia|alzheimer|memory|cognitive|confusion|wandering)\b/.test(lower)) {
    return "Memory & Dementia";
  }
  if (/\b(fall|falls|trip|hazard|slip|grab bar|lighting|safe|safety)\b/.test(lower)) {
    return "Senior Safety";
  }
  if (/\b(hospital|discharge|readmission|surgery|rehab|recovery)\b/.test(lower)) {
    return "Post-Hospital Recovery";
  }
  if (/\b(respite|temporary care|care break|caregiver relief)\b/.test(lower)) {
    return "Respite Care";
  }
  if (/\b(nutrition|hydration|water|diet|meal|food|protein|vitamins)\b/.test(lower)) {
    return "Nutrition & Wellness";
  }
  if (/\b(burnout|caregiver|family caregiver|exhaustion|stress|cna|compassion fatigue)\b/.test(lower)) {
    return "Caregiver Support";
  }

  return "Senior Living";
}

/**
 * Calculate estimated reading time
 */
export function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

/**
 * Format a Date object or ISO string into "Month DD, YYYY"
 */
export function formatBlogDate(dateInput?: string | Date): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(date.getTime())) {
    return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/**
 * Clean up emojis and hashtags from title or excerpt
 */
function cleanText(text: string): string {
  return text
    .replace(/#\w+/g, "") // remove hashtags
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "") // strip common emojis
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Transform Facebook post text into formatted markdown suitable for Akirapa's blog renderer
 */
export function transformContentToMarkdown(rawText: string): string {
  const lines = rawText.split("\n");
  const processedLines: string[] = [];

  let listCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      processedLines.push("");
      continue;
    }

    // Convert bullet emojis (🔹, 🔸, ▫️, •, *, ➡️) to markdown bullets
    if (/^[🔹🔸▫️•*▪️➡️\-]\s*/u.test(line)) {
      const cleaned = line.replace(/^[🔹🔸▫️•*▪️➡️\-]\s*/u, "").trim();
      // If there's a bold colon like "Item: description", format nicely
      const colonIdx = cleaned.indexOf(":");
      if (colonIdx > 0 && colonIdx < 30 && !cleaned.startsWith("**")) {
        const title = cleaned.substring(0, colonIdx).trim();
        const rest = cleaned.substring(colonIdx + 1).trim();
        processedLines.push(`- **${title}**: ${rest}`);
      } else {
        processedLines.push(`- ${cleaned}`);
      }
      continue;
    }

    // Convert numbered emoji lists like 1️⃣, 2️⃣ or standard numbers
    const numMatch = line.match(/^(\d+|[1-9]️⃣)[\.\)]\s*(.*)$/u);
    if (numMatch) {
      const rest = numMatch[2].trim();
      const colonIdx = rest.indexOf(":");
      if (colonIdx > 0 && colonIdx < 35 && !rest.startsWith("**")) {
        const title = rest.substring(0, colonIdx).trim();
        const desc = rest.substring(colonIdx + 1).trim();
        processedLines.push(`${listCounter}. **${title}**: ${desc}`);
      } else {
        processedLines.push(`${listCounter}. ${rest}`);
      }
      listCounter++;
      continue;
    }

    processedLines.push(line);
  }

  return processedLines.join("\n");
}

export interface ParseFacebookPostOptions {
  author?: string;
  postId?: string;
  postUrl?: string;
  createdTime?: string;
  customCategory?: AkirapaCategory;
}

/**
 * Parses a raw Facebook post payload/text into a full BlogPost in 'draft' status
 */
export function parseFacebookPostToBlog(
  rawMessage: string,
  imageUrl?: string,
  options?: ParseFacebookPostOptions
): BlogPost {
  const trimmed = rawMessage.trim();
  const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

  let title = "";
  let excerpt = "";
  let bodyStartIndex = 0;

  // 1. Try to extract a clean title from the first line
  if (lines.length > 0) {
    const firstLineClean = cleanText(lines[0]);
    if (firstLineClean.length > 5 && firstLineClean.length <= 110) {
      title = firstLineClean;
      bodyStartIndex = 1;
    } else {
      // Find the first sentence ending with period, exclamation, or question mark
      const sentenceMatch = firstLineClean.match(/^([^.!?]+[.!?])/);
      if (sentenceMatch && sentenceMatch[1].length <= 100) {
        title = sentenceMatch[1].trim();
      } else {
        title = firstLineClean.substring(0, 75).trim() + "...";
      }
      // If the first line was very long, keep it in the body
      bodyStartIndex = 0;
    }
  } else {
    title = "Caring Insights from Akirapa";
  }

  // 2. Extract an excerpt (first 1-2 sentences of the body, max ~160 chars)
  const remainingText = lines.slice(bodyStartIndex).join(" ");
  const cleanRemaining = cleanText(remainingText || trimmed);
  if (cleanRemaining.length > 0) {
    const firstSentences = cleanRemaining.match(/^[^\.!\?]+[\.!\?](?:\s+[^\.!\?]+[\.!\?])?/);
    if (firstSentences && firstSentences[0].length <= 180) {
      excerpt = firstSentences[0].trim();
    } else {
      excerpt = cleanRemaining.substring(0, 150).trim() + "...";
    }
  } else {
    excerpt = "Discover thoughtful caregiving tips, senior wellness strategies, and family support from Akirapa Home Care.";
  }

  // 3. Format body content
  const content = transformContentToMarkdown(trimmed);

  // 4. Generate unique ID & slug
  const timestamp = Date.now();
  const slug = `${slugify(title)}-${timestamp.toString().slice(-4)}`;
  const id = `fb-${timestamp}`;

  // 5. Category
  const category = options?.customCategory || detectCategory(trimmed);

  // 6. Cover image fallback if Facebook post didn't include one
  const fallbackImages = [
    "/CARE GIVER  (13).jpg",
    "/CARE GIVER  (16).jpg",
    "/CARE GIVER  (8).jpg",
    "/CARE GIVER  (5).jpg",
    "/CARE GIVER  (2).jpg",
    "/CARE GIVER  (4).jpg",
  ];
  const finalImage = imageUrl || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  return {
    id,
    slug,
    title,
    excerpt,
    content,
    date: formatBlogDate(options?.createdTime),
    author: options?.author || "Akirapa Home Care",
    category,
    readTime: calculateReadTime(trimmed),
    image: finalImage,
    initialViews: Math.floor(Math.random() * 200) + 150,
    status: "draft", // Stored as Draft for Review!
    source: "facebook",
    facebookPostId: options?.postId,
    facebookUrl: options?.postUrl,
    created_at: options?.createdTime || new Date().toISOString(),
  };
}
