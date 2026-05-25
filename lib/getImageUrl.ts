export function getImageUrl(url?: string | null) {
  if (!url) return "";

  const cloudinaryBase = "https://res.cloudinary.com";
  const cloudinaryIndex = url.indexOf(cloudinaryBase);

  if (cloudinaryIndex !== -1) {
    const cleanUrl = url.slice(cloudinaryIndex);

    return optimizeCloudinaryUrl(cleanUrl);
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

function optimizeCloudinaryUrl(url: string) {
  if (!url.includes("/image/upload/")) return url;

  if (
    url.includes("/image/upload/f_auto") ||
    url.includes("/image/upload/q_auto") ||
    url.includes("/image/upload/c_limit")
  ) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,c_limit,w_1600/"
  );
}
