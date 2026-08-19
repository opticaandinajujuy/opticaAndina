export function optimizedImage(url, width) {
  if (!url || !url.includes('/upload/')) return url;
  const transforms = ['f_auto', 'q_auto', width ? `w_${width}` : null].filter(Boolean).join(',');
  return url.replace('/upload/', `/upload/${transforms}/`);
}
