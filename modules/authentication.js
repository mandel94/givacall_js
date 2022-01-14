// This module defines which authentication method each endpoint requires. 
// It also exposes functions that help to integrate the authentication step in 
// each request.

/**
 * @description Lookup of authentication methods implemented by exposed 
 * endpoints, by api 
 */
const AuthMethods = {
    'TwitterAPI_v2': {
        'recent_search': 'Bearer'
    }   
};

// /**
//  * @description Get the function for implementanting an authentication method, 
//  * by authentication method
//  */
//  const authImplementations = {
//     'basic': basicAuthImp,
//     'bearer_token': bearerTokenImp
// }

/**
 * Implement Basic Authentication
 * 
 * For "Basic" authentication the credentials are constructed by first 
 * combining the username and the password with a colon (aladdin:opensesame), 
 * and then by encoding the resulting string in base64 
 * (YWxhZGRpbjpvcGVuc2VzYW1l). 
 * Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
 * 
 * Basic authentication should only be used over HTTPS (SSL).
 * 
 * @param {String} credentials - Basic credentials
 */
function basicAuthImp(credentials) {
    const base64Credentials = Buffer.from(credentials).toString('base64');
    return `Basic ${base64Credentials}`;
}

/**
 * Implement Bearer Token Authentication
 * 
 * This is an HTTP authentication scheme, originally created as part of OAuth 
 * 2.0. It is based on security tokens, where access is granted to the 'bearer 
 * of the token'. The client must send this token in the Authorization header
 * when making requests to protected resources:
 * Authorization: Bearer <token>
 * 
 * Similarly to Basic authentication, Bearer authentication should only be used 
 * over HTTPS (SSL).
 * 
 * @param {String} credentials - the 'bearer' token 
 * 
 * @return {String} The value of the Authorization` header 
 */
function bearerTokenImp(credentials) {
    return(`Bearer ${credentials}`);
}


exports.AuthMethods = AuthMethods;
exports.basicAuthImp = basicAuthImp;
exports.bearerTokenImp = bearerTokenImp;
// exports.authImplementations = authImplementations;