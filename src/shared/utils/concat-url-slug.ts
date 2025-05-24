export const concatUrlSlug = (url?: string, slug?: string | undefined) => {
  if (!url) return '';

  if (slug) {
    return `${url}/${slug}`;
  }

  return url;
};
