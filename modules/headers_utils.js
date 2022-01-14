// const { authImplementations } = require("./authentication");


// /**
//  * Get Authentication Header for an HTTP Requests
//  * 
//  * This is a non-user-facing function.
//  * 
//  * Authorization: <auth-scheme> <authorisation-parameters>
//  * <auth-scheme>
//  *      The Authentication scheme that defines how the credentials are encoded.
//  * <credentials>
//  *      The credentials, encoded according to the specified scheme.
//  *  
//  * To date, the following properties are accepted in the securityBox:
//  *  - basic;
//  *  - bearer_token;
//  *
//  * 
//  * @param {String} authenticationBox 
//  * @param {string} authMethod - An authentication method to pass to the header.
//  *  This is required. 
//  * 
//  * @return {string} The credential as processed by the implementation method. 
//  * This will be included in the authorization header of the request. 
//  * 
//  */
// function getCredentials(authenticationBox, authMethod) {
//     const implementAuth = authImplementations[authMethod];
//     const credential = authenticationBox[authMethod];
//     return(implementAuth(credential));
// }


// module.exports.getCredentials = getCredentials;


