export const publicationTimeZone = "Asia/Shanghai";

export function getPublishedPosts(posts, now = new Date()) {
  const today = dateInTimeZone(now, publicationTimeZone);
  return posts.filter(post => post.date <= today);
}

export function isPublishedDate(date, now = new Date()) {
  return date <= dateInTimeZone(now, publicationTimeZone);
}

function dateInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
