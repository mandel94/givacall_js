
/**
 * Get Headers for an HTTP Requests
 * 
 * This is a non-user-facing function, that automatically sets relevant headers 
 * configurations.
 * 
 * To date, only the `Authentication` header is automatically configured, but
 * further header configs will be supported, depending on the need to abstract 
 * them from the user.  
 * 
 * 
 * 
 * @param {string} authMethod - An authentication method to pass to the header
 * @param {Object} securityBox - An object containg security-sensitive 
 * properties. These properties must be encrypted, as they will be used for 
 * authenticating the request.
 *  
 * To date, the following properties are accepted in the securityBox:
 *  - bearer_token;
 * 
 *  
 * @return {Object} An Object contaning the header configs.
 */
function getHeaders(authMethod, securityBox) {
    
    
}