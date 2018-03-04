/**
 * Prismic.io functions
 * @TODO: add redux, add prismic context to store
 *
 */

import Prismic from 'prismic-javascript';
import PrismicToolbar from 'prismic-toolbar';
import PrismicConfig from '../config/prismic';
import GlobalConfig from '../config/global';

/**
 * Fetch Prismic posts
 *
 * @param {object} Prismic context
 * @param {string} Prismic post type
 * @param {object} Prismic query options
 * @return {object} posts
 */
export async function fetchPrismicPosts(prismicCtx, postType = 'blog', options = {
  orderings: '[my.blog.date desc]',
  pageSize: GlobalConfig.maxPosts,
}) {
  const prismicContext = typeof prismicCtx === 'object' ? prismicCtx : await fetchPrismicContext();

  try {
    // return Prismic API post query
    return await prismicContext.api.query(
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
  } catch(err) {
    console.warn(`Primic context does not yet exist:\n${err}`); // eslint-disable-line no-console
    return await null; // ensure to return a promise
  }
}

/**
 * Fetch data context from prismic.io
 *
 * @return {object}
 */
export async function fetchPrismicContext() {
  const accessToken = PrismicConfig.accessToken;

  return await Prismic.api(PrismicConfig.apiEndpoint, { accessToken })
    .then(api => ({
      api,
      accessToken,
      endpoint: PrismicConfig.apiEndpoint,
      linkResolver: PrismicConfig.linkResolver,
      toolbar: refreshPrismicToolbar,
    })
  );
}

/**
 * Refresh prismic.io toolbar
 *
 * @return {void}
 */
export function refreshPrismicToolbar() {
  const maybeCurrentExperiment = this.api.currentExperiment();

  if (maybeCurrentExperiment) {
    PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId());
  }

  PrismicToolbar.setup(PrismicConfig.apiEndpoint);
}
