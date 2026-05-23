export function getStrapiMediaUrl(image: any): string | null {
  if (!image) return null;

  if (typeof image === "string") {
    return image;
  }

  if (image?.url) {
    return image.url;
  }

  if (Array.isArray(image) && image[0]?.url) {
    return image[0].url;
  }

  if (image?.data?.attributes?.url) {
    return image.data.attributes.url;
  }

  if (Array.isArray(image?.data) && image.data[0]?.attributes?.url) {
    return image.data[0].attributes.url;
  }

  return null;
}