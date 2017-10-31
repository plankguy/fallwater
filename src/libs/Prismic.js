import Prismic from 'prismic-javascript';

/**
 * Asyncronously fetch Prismic posts
 *
 * @param {object} Prismic context
 * @param {string} Prismic post type
 * @param {object} Prismic query options
 * @return {object} posts
 */
export async function fetchPosts(prismicCtx, postType = 'blog', options = {
  orderings: '[my.blog.date desc]',
  pageSize: 10,
}) {
  // Check for Prismic context param
  if (prismicCtx) {
    // return Prismic API post query
    return await prismicCtx.api.query(
      Prismic.Predicates.at('document.type', postType),
      options,
      (err, posts) => {
        if (posts) {
          // Return posts
          return { posts };
        } else {
          console.error('Prismic api fetch error: ', err);
        }
      }
    );
  }

  return await null; // ensure to return a promise
}
