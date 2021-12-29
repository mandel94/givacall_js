const axios = require("axios");
const { dictionaryOfEndpoints } = require("./endpoints");
const authMethods = require("./authMethods");
const {getBaseUrl, getUrl} = require("./url_utils");


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
class Client {
    static #endpoints;
    static #authMethods;

    static {
        // Static Initialization Block
        Client.#endpoints = dictionaryOfEndpoints;
        Client.#authMethods = {
            'recent_search': 'Bearer'
        };
    };


    /**
     * Create a client. 
     * @param {string} api - The name of the api. Supported api's are:
     *  - TwitterAPI_v2
     *  - ecc...
     */
    constructor(api) {
        this.api = api;
    }


    /**
     * Take a look on available endpoints for `this.api`
     * 
     * @return {array} The list of available endpoints for `this.api`
     */
    get endpointsLookup() {
        // Dynamic property
        this.endpoints_list = Client.#endpoints[this.api];
        return this.endpoints_list
    }


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


    /** Set the endpoint 
     * @param {string} endpoint - The endpoint to send requests to.
     */
    set endpoint(name) {
        let list = this.endpointsLookup;
        // TODO
        // validate_endpoint(name)
        // Validation of user input
        // Raise error if the name of the API is not found in the endpoints list
        this._endpoint = name;
        return this._endpoint;
    }
    

    /**
     * Get the authentication method for the active endpoint.
     * 
     * @return {string} Name of the authentication method for the active 
     * endpoint, NULL if no endpoint has been set yet 
     */
    get authMethod() {
        this._authMethod = Client.#authMethods[this.endpoint]
        return this._authMethod
    }

    // HTTP Methods

    /**
     * Send a Get Request 
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
     * accepted by an Axios request. 
     * 
     * @return {Promise} A Promise to receive a response object
     */

    get(query, fields, config) {
        const baseUrl = getBaseUrl(this.api, this.endpoint)
        const url = getUrl(baseUrl, query, fields)
        const headers = getHeaders(this.authMethod)
        // TODO set config
            // TODO Set `headers`
            // TODO Set further defaults, if any more
    //    axios.get(url, ...Args);
    };

}

exports.Client = Client
