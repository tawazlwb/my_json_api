var request = require("request");

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

function get(URL) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: URL
      },
      function(error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(new Error(response.statusCode + " " + response.statusMessage));
        } else if (response.statusCode === 200) {
          resolve(body);
        }
      }
    );
  });
}

var promise = get(
  "https://my-json-server.typicode.com/tawazlwb/my_json_api/posts/1"
);

promise
  .then(post => {
    console.log("Post:\n" + post + "\n");
    return get(
      "https://my-json-server.typicode.com/tawazlwb/my_json_api/profile"
    );
  })
  .then(profile => {
    console.log("Profile:\n" + profile + "\n");
  })
  .catch(error => {
    console.log(error);
  });
