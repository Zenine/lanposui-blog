export function getPublishedPosts(posts, now = new Date()) {
  return posts.filter(post => isPublishedPost(post, now));
}

export function isPublishedDate(date, now = new Date()) {
  return isPublishedPost({ date }, now);
}

export function isPublishedPost(post, now = new Date()) {
  return publishInstant(post) <= now.getTime();
}

export function publishInstant(post) {
  const publishAt = post.publishAt ?? `${post.date}T00:00:00+08:00`;
  const timestamp = Date.parse(publishAt);
  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid publishAt/date for post: ${post.title ?? post.date}`);
  }
  return timestamp;
}
