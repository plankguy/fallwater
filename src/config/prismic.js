export default {

  apiEndpoint: 'https://hootsuite.prismic.io/api/v2', // -> https://hootsuite.cdn.prismic.io/api

  // -- Access token if the Master is not open
  accessToken: 'MC5XZDE3MXlZQUFQWWVtSmIz.Ru-_vVHvv70hQ--_ve-_ve-_ve-_ve-_vUdx77-9B0EeM--_vTPvv73vv73vv71F77-9MXnvv73vv73vv71_77-9',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver(doc, ctx) {
    return '/';
  },
};
