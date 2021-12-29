const {getEndpointPath} = require("./endpoints");



/**
 * @description This is the root URL you'll need to know for accessing the 
 * resources exposed by a certain API. You'll need to attach an endpoint and a 
 * querystring to this root URL, if you want to perform a successful request.
 * 
 * @const {Object}
 */
const dictionaryOfRootUrls = {
    "TwitterAPI_v2": "https://api.twitter.com/2"
}




/**
 * Get an URL 
 * 
 * Build and return an URL, based on the combination of endpoint, query and 
 * fields.
 * 
 * @param {string} baseUrl - The part of an URL that comes before a querystring
 * (denoted by `?`). 
 * @param {string} query - The query parameter of the url. The API will use this
 * parameter for filtering the data to include in the response. This parameter 
 * can be specific to the API being requested.
 * Queries are made up of operators that match on a variety of attributes.
 * @param {Object} fields Which attributes you want the response to return in 
 * the data
 * 
 * @return {string} An URL 
 */

 function getUrl(baseUrl, query, fields) {
    fields.query = query;
    const queryString = getQueryString(fields);
    return baseUrl+"/"+queryString
}


/**
 * Get a Base URL
 * 
 * Build and return a base URL by simply concatenating the root URL associated
 * to the specific API with an endpoint whose resources you want to access. 
 * You'll need to attach a querystring to this base URL, if you want to perform 
 * a successful request.
 * 
 * @param {string} api - The name of the API 
 * @param {string} endpoint - The endpoint whose resources you'd like to access
 * 
 * @return {string} A base URL 
 *  
 */
function getBaseUrl(api, endpoint) {
    const endpointPath =  getEndpointPath(api, endpoint)
    return dictionaryOfRootUrls[api] + endpointPath
}

/**
 * Create a query string
 * @param {string} query - The query parameter of the url. The API will use this
 * parameter for filtering the data to include in the response. This parameter 
 * can be specific to the API being requested.
 * @param {Object} fields - The fields that narrow the request 
 */
function getQueryString(fields) {
    return new URLSearchParams(fields).toString();
}


module.exports.getUrl = getUrl;
module.exports.getBaseUrl = getBaseUrl

