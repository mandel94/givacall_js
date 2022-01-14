// const {Client} = require("./api_client");

// // function variadic_print() {
// //     console.log(arguments);
// // }

// // variadic_print(method = "One", url = "Two")

// // const test_obj = {"method": "post", "url": "path/to/resource"};
// // test_obj["method"] = {"get": "200"};
// // console.log(test_obj.method.get);

// twitterClient = new Client("TwitterAPI_v2");
// twitterClient.endpoint = "recent_search";
// const test_query = "has:links OR is:retweet";
// const test_fields = {
//     "tweet.fields": "created_at",
//     "max-results": "100"
// } 

// console.log(twitterClient.get(test_query, test_fields));


const test_array = ["Banana", "Ananas", "Mango", "Apple", "Coconut"];
console.log(test_array.splice(1, test_array.length))
console.log(test_array)