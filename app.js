var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

var $ = require("jquery")(window);

$.get("https://my-json-server.typicode.com/tawazlwb/my_json_api/posts/1")
  .then(post => {
    console.log("\nPost:\n" + JSON.stringify(post, null, 4) + "\n");
    return $.get(
      "https://my-json-server.typicode.com/tawazlwb/my_json_api/profile"
    );
  })
  .then(profile => {
    console.log("Profile:\n" + JSON.stringify(profile, null, 4) + "\n");
  })
  .catch(error => {
    console.log(error);
  });
