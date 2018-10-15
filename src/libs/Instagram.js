import InstagramConfig from '../config/instagram';
import GlobalConfig from '../config/global';

/**
 * Fetch Instagram posts via API
 *
 * @returns {object}
 */
// @TODO: pass configuration as arguments
export async function fetchInstagramPosts() {
  try {
    const response = await fetch(`${InstagramConfig.postsApiEndpoint}?access_token=${InstagramConfig.accessToken}&count=${GlobalConfig.maxPosts}`, {
    	method: 'GET',
    });

    const postsJson = await response.json();

    // Handle API errors
    if (postsJson.hasOwnProperty('error_message')) {
      console.error(postsJson.error_message); // eslint-disable-line no-console
      return null;
    } else {
      return await postsJson;
    }
  }
  catch(err) {
    console.error(`Failed to fetch posts Instagram API endpoint:\n${err}`); // eslint-disable-line no-console

    return null;
  }
}
