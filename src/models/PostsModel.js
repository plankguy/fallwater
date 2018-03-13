import { fetchPrismicPosts } from '../libs/Prismic';
import { fetchInstagramPosts } from '../libs/Instagram';
import GlobalConfig from '../config/global';

/**
 * Get all posts, return source meta and posts
 * @param {object}
 * @param {int}
 * @return {object}
 */
export async function fetchAllPosts(prismicCtx, maxPosts = GlobalConfig.maxPosts) {
  const prismicData = await fetchPrismicPosts(prismicCtx);
  const instagramData = await fetchInstagramPosts();
  const prismicPosts = formatPrismicPosts(prismicData);
  const instagramPosts = formatInstagramPosts(instagramData);
  const postsData = {
    meta: {
      instagram: {
        count: instagramPosts.length,
        next_url: instagramData.pagination.next_url,
        next_max_id: instagramData.pagination.next_max_id
      },
      prismic: {
        next_url: prismicData.next_page,
        prev_url: prismicData.prev_page,
        max_count: prismicData.total_results_size,
        count: prismicPosts.length,
      },
      per_page: GlobalConfig.maxPosts,
      total_count: instagramPosts.length + prismicPosts.length,
    },
    posts: sortByDateDesc([
      ...prismicPosts,
      ...instagramPosts,
    ]),
  };

  return postsData;
}

/**
 * Sort posts by date, new to old
 * @param {array}
 * @return {array}
 */
function sortByDateDesc(posts) {
  return posts.sort((a, b) => {
    return new Date(b.created_date) - new Date(a.created_date);
  });
}

/**
 * Formats Prismic posts into array of objects that play nice in this app
 * @param {object}
 * @return {object}
 */
function formatPrismicPosts(postsData) {

  // Add and/or mutate properties for each post
  const posts = postsData.results.map((post) => {
    post.created_date = post.last_publication_date; // ISO date
    post.medium = 'prismic';

    return post;
  });

  return posts;
}

/**
 * Format Instagram posts object to play nice with others
 * @param {object}
 * @return {object}
 */
function formatInstagramPosts(postsData) {
  // Add and/or mutate properties for each post
  const posts = postsData.data.map((post) => {
    post.created_date = new Date(post.created_time * 1000).toISOString(); // ISO date
    post.medium = 'instagram';

    return post;
  });

  return posts;
}
