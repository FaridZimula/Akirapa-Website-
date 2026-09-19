/**
 * Utilities for tracking and incrementing blog post views in localStorage.
 */

export function getBlogPostViews(slug: string, defaultViews = 142): number {
  if (typeof window === "undefined") return defaultViews;
  try {
    const stored = localStorage.getItem(`akirapa_blog_views_${slug}`);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) return parsed;
    }
    localStorage.setItem(`akirapa_blog_views_${slug}`, defaultViews.toString());
  } catch (e) {
    console.warn("Could not read from localStorage", e);
  }
  return defaultViews;
}

export function incrementBlogPostViews(slug: string, defaultViews = 142): number {
  if (typeof window === "undefined") return defaultViews + 1;
  try {
    const current = getBlogPostViews(slug, defaultViews);
    const nextViews = current + 1;
    localStorage.setItem(`akirapa_blog_views_${slug}`, nextViews.toString());
    return nextViews;
  } catch (e) {
    console.warn("Could not write to localStorage", e);
    return defaultViews + 1;
  }
}
