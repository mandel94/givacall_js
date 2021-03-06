const axios = require("axios");
const {
    dictionaryOfEndpoints
} = require("./endpoints");
const { authMethods } = require("./authentication");
const {
    getEndpointUrl,
    getUrl
} = require("./url_utils");
const {
    basicAuthImp,
    bearerTokenImp
} = require("./authentication");

// TODO Create client class 

/**
 * Class representing a Client.
 * 
 * A Client is a software that acts like an agent between a user and a server 
 * whose resources the user wants to access.
 * By establishing a connection with a server, a client can request resources 
 * exposed by the server through endpoints, each one serving a distinct 
 * logical section of the resources.  
 * In order to establish a connection with the server, a client must first be 
 * granted an authorization by the server. 
 * Supported authentication methods are:
 *  - OAuth 2.0 Bearer Token
 *
 * 
 */
class Givacall {
    static #endpoints;
    static #authMethods;

    static {
        // Static Initialization Block
        Givacall.#endpoints = dictionaryOfEndpoints;
        Givacall.#authMethods = {
            'recent_search': 'Bearer'
        };
    };

    /**
     * Create a client. 
     * @param {String} api - (Optional) The name of the api. Supported api's are:
     *  - TwitterAPI_v2
     *  - ecc...
     * If you prefer a general-purpose API client, you can instantiate it  
     * without providing an api name. 
     * In this case, each time you make HTTP requests with the client, you 'll
     * have to manually set the configuration of your request, including the 
     * 'Authorization' header. 
     *  
     * 
     * 
     */
    constructor(api = null) {
        this.api = api;
        this.general_purpose = this.api ? false : true;
        this.authenticationBox = {};
        this.isUrlSet = false;
    }

    /**
     * Take a look on available endpoints for `this.api`
     * 
     * @return {array} The list of available endpoints for `this.api`
     */
    get endpointsLookup() {
        // Dynamic property
        this.endpoints_list = Givacall.#endpoints[this.api];
        return this.endpoints_list
    }

    //Getters

    /**
     * Get the endpoint 
     * 
     * @return {string} The name of the endpoint, NULL if no endpoint has been 
     * set yet;
     */
    get endpoint() {
        // !this._endpoint ? null : this._endpoint;
        return this._endpoint;
    }

    /**
     * Get the authentication method for the active endpoint.
     * 
     * @return {string} Name of the authentication method for the active 
     * endpoint, NULL if no endpoint has been set yet 
     */
    get authMethod() {
        this._authMethod = Givacall.#authMethods[this.endpoint]
        return this._authMethod
    }

    //Setters

    /** Set the endpoint 
     * @param {string} endpoint - The endpoint to send requests to.
     *  
     * @return {string} Set endpoint is returned  
     */
    set endpoint(name) {
        // TODO
        // validate_endpoint(name)
        // Validation of user input
        // Raise error if the name of the API is not found in the endpoints list
        this._endpoint = name;
        return this._endpoint;
    }

    //Methods
    
    /**
     * Create a custom endpoint
     * 
     * This is useful when using givacall as a general-purpose client.
     * Each time you'll interrogate the custom endpoint, the specified endpoint
     * URL we'll be automatically pre-appended to the request url. 
     * 
     * @param {string} endpointUrl - The URL of the custom endpoint 
     * @param {string} endpointName - The name of the custom endpoint, for referencing 
     * when setting the endpoint on the client 
     * @param {string} authMethod - The authentication method implemented by the 
     * endpoint (for example, 'Bearer'). 
     */
    customEndpoint(endpointUrl, endpointName, authMethod) {
        this.addressBook = {};
        this.addressBook[endpointName] = [endpointUrl, authMethod];
    }

    /**
     * Add a bearer token to the authenticationBox of the client
     * @param {token} token - The bearer token that the client will present for 
     * authenticating the request
     */
    addBearer(token) {
        this.authenticationBox['Bearer'] = bearerTokenImp(token);
    }

    /**
     * Add basic credentials to the authenticationBox of the client
     * @param {string} credentials 
     */
    addBasic(credentials) {
        this.authenticationBox['Basic'] = basicAuthImp(credentials);
    }

    // Manually set the url
    setUrl(url) {
        // Flag that the url is manually set
        this.isUrlSet = true;
        this.url = url;
    }


    //HTTP Methods

    /**
     * Send a Get Request 
     * 
     * This is a wrapper for the axios() function.
     * It provides the following utilities:
     *  - `url` is customized according to the current endpoint of `this` client 
     *  - `headers` is customized to include 
     *     * the `Authorization` header currently set on `this` client.
     *     * // further defaults to be included.
     * 
     * @param {string} query - The query parameter of the url. The API will use 
     * this parameter for filtering the data to include in the response.
     * This parameter can be specific to the API being requested.
     * Queries are made up of operators that match on a variety of attributes.
     * @param {Array} fields - Parameters to select which attributes you want 
     *  the response to return in its data.
     * @param {Object} config - Every further configuration setting that can be 
     * accepted by an Axios request. Authentication configs passed through this 
     * object will be overwritten by the default authentication method of the api
     * that's currently active on the client instance. 
     * @param {Boolean} keepDefaultAuth - If true, eventual authentication the user 
     * passed in the `config` argument will overwrite the defaults for the api
     * that's currently active on the client instance. 
     * 
     * 
     * 
     * @return {Promise} A Promise to receive a response object
     */
    get(query, fields, config = {}) {
        // Define getRequest function
        const getRequest = function(url, config) {
            return new Promise(function(resolve, reject) {
                 axios.get(url, config)
                     .then(function(result) {
                           resolve(result);
                     })
                      .catch(function(error) {
                            reject(error);
                      })
                 })
               };

        if (this.general_purpose) {
            const endpointUrl = this.addressBook[this.endpoint][0];
            const url = getUrl(endpointUrl, query, fields);
            const authMethod = this.addressBook[this.endpoint][1];
            config['headers'] = {
                'Authorization': this.authenticationBox[this.authMethod]
            };
            // Remember get request configuration
            this.GETconfig = config;
            // TODO Call getRequest() as a function of url and config
            return(getRequest());
        }
        //else
        const endpointUrl = getEndpointUrl(this.api, this.endpoint);
        const url = getUrl(endpointUrl, query, fields);
        config['headers'] = {
            'Authorization': this.authenticationBox[this.authMethod]
        };
        // Remember get request configuration
        this.GETconfig = config;
        //TODO Call getRequest() as a function of url and config
        return (getRequest(url, this.GETconfig));
    };

}

module.exports = Givacall;