# givacall_js   ![alt text](https://github.com/mandel94/givacall_js/blob/main/logo_new.jpg)

## What is it?
`givacall_js` provides an easy-to-use *interface* for performing basic API calls on JavaScript.
`givacall_js` is based on a `Client` class, whose methods allow a user to perform http requests to one of the supported API's.

Currently supported API's are:
  * Twitter API V2;
  * ...
  
The plan is to provide support also for:
  * Instagram API;
  * ...
  
The idea is to add support for different API's, from a wide array of application domains.  
  
  
## How does it work?
When instantiating a `client` object, the user must provide the API she/he wants to call.  
Once the object has been instantiated, the user must set the endpoint. The `Client` class keeps track of all the endpoints exposed by each supported API, in a list that is available for inspection by the user.  
Once the authentication field has been also provided, the user is ready to make calls.
To make a call the user must provide:
1. a query argument, to retrieve the subset of current endopoint's resources that satisfy it;
2. a field argument, that is, a JSON object that specifies which attributes of the matching data to retrieve.  

Each time a request is made with a `client` object, the current endpoint path is appended to the requested url.


## Why should you use it?
With givacall, you won't need to worry about all the little implementation details behind calling an API. Once an authentication field has been provided to the `client`, and an endpoint has been set, you'll only need to focus on the query, and nothing else.

`givacall_js` will handle the generation of the proper querystring, and append it to the proper baseURL, depending on the API of the `client` and its current endpoint.
You won't need to look for the exact path of the endpoint, and if you don't remember which endpoints are exposed by a supported API, you can ask your client instance for the entire list of the endpoints!  

`givacall_js` also provides *validation* when setting a `client` object. For example, if you are trying to set an endpoint that is not exposed by a supported API, `givacall_js` will raise an error and notify you. The idea is to implement further validation features that makes working with a supported API as easy and relaxed as having a zen experience.  


## How to use it?
One of the API's that's currently supported is Twitter API V2.
Let's look at how you can easily make requests to its endpoints. 

### Define a client
First of all, let's create an instance of the client.
Client will take one argument, the name of the api you want to send requests to.  
``` js
const { Givacall } = require("givacall_js");

const givacall = Givacall("TwitterAPI_v2");
```

### Set an endpoint on that client  
The next step is to tell givacall which endpoint you would like to query.
If you dont' remember which endpoints are exposed by the current api, you can ask givacall:
``` js
givacall.endpointsLookup()

```
Now, you should be ready to set the endpoint. For example:

```js
givacall.endpoint("recent_search")
```


### Add a security token to the client  
In order to add a token to the client, the user must provide an object:
* keys of the object --> the Authorization method (for example, 'Bearer' for bearer authentication)
* the token --> a hashed string
Example:
``` js
client.addToken('Bearer', process.env.BEARER_TOKEN);
client.addToken('Basic', process.env.BASIC_TOKEN);
```
These key-value pairs will be added to the `securityBox` of givacall's client. 
When sending requests to an endpoint, givacall's client will provide the token corresponding to the authentication method required by that particular endpoint, extracted by key from the `securityBox`.   

### Make your requests
Now everything is set and done! Givacall is ready to help you with all the requests you'd like to do. You can do it easily by using its methods, each one 
corresponding to a particular HTTP methods.
``` js
givacall.get(query, fields);
\\...
```


# Caveauts
## Security 
### Twitter authentication best practices
https://developer.twitter.com/en/docs/authentication/guides/authentication-best-practices
