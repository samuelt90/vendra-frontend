export function getImageUrl(url?: string | null) {
  if (!url) return "";

  const cloudinaryIndex = url.indexOf("https://res.cloudinary.com");

  if (cloudinaryIndex !== -1) {
    return url.slice(cloudinaryIndex);
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}