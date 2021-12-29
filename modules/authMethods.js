// This module defines which authentication method each endpoint requires. 
// It also exposes functions that help to integrate the authentication step in 
// each request.

// List of authentication methods 

const AuthMethods = {
    'TwitterAPI_v2': {
        'recent_search': 'Bearer'
    }   
};


// Implementation of authentication methods 

// Bearer authentication
// This is an HTTP authentication scheme, originally created as part of
// OAuth 2.0. It is based on security tokens, where access is granted to the 
//'bearer of the token'. 
// In order to 'bear the token', it must be included in the `Authorization` 
// header of the request.

/**
 * addBearerHeader
 * 
 * Include bearer token in the header of a provided query string. For security
 * concerns, you should provide the bearer token as an environment variable.
 * 
 * @param {string} queryString - Stringified query string
 * @param {string} token - The bearer token. 
 */
function addBearerHeader(queryString, token) {

}






exports.AuthMethods = AuthMethods;