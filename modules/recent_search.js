const axios = require("axios");

// Create token, depending
const authMode = "bearer";

const query = 'from:twitterdev -is:retweet';

const fields = {
    "tweet.fields": "author_id"
};

const userAgent = "v2RecentSearchJS";

// TODO
// const header = givacall.twitter.getHeader(authMode="bearer", userAgent);

// TODO 
// Create aync request
// const req = async givacall.twitter.get(header, reqParams);

