import InstagramConfig from '../config/instagram';
import GlobalConfig from '../config/global';

/**
 * Fetch Instagram posts via API
 *
 * @returns {object}
 */
export async function fetchInstagramPosts() {
  try {
    const response = await fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${InstagramConfig.accessToken}&count=${GlobalConfig.maxPosts}`, {
    	method: 'GET',
    });
    const postsJson = await response.json();

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
