
/** 
* @description List of Endpoints exposed by Twitter API
* @const {Array}
*/
const twitterEndpoints = ["recent_search",
    "recent_tweet_counts"
];

/**
 * @description Dictionary of twitter endpoint paths, by endpoint name.
 * @const {Object} 
 */
const twitterEndpointsPaths = {
    "recent_search": "/tweets/search/recent",
    "recent_tweet_counts": "/tweets/counts/recent"
}


/**
 * @description Get array of available endpoints by api
 * @const {Object}
 */
const dictionaryOfEndpoints = {
    "TwitterAPI_v2": twitterEndpoints
};

/**
 * @description Get the dictionary of endpoint paths, by API name 
 */
const dictionaryOfEndpointsPaths = {
    "TwitterAPI_v2": twitterEndpointsPaths
}

/**
 * Get the path of an endpoint exposed by a given API
 * 
 * @param {api} api - The api you want to send the request to
 * @param {*} endpoint - The endpoint whose resources you want to access
 */
function getEndpointPath(api, endpoint) {
    return dictionaryOfEndpointsPaths[api][endpoint];
}

exports.dictionaryOfEndpoints = dictionaryOfEndpoints;
exports.getEndpointPath = getEndpointPath;