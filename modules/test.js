const { getUrl } = require("./url_utils");

const baseUrl = 'https://api.twitter.com/2/tweets/search/recent';
const query = '(apple OR iphone) ipad';

console.log(getUrl(baseUrl, query, fields));