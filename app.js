var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

var $ = require("jquery")(window);

genWrap(function*() {
  var post = yield $.get(
    "https://my-json-server.typicode.com/tawazlwb/my_json_api/posts/1"
  );
  console.log("\nPost:\n" + JSON.stringify(post, null, 4) + "\n");
  var profile = yield $.get(
    "https://my-json-server.typicode.com/tawazlwb/my_json_api/profile"
  );
  console.log("Profile: \n" + JSON.stringify(profile, null, 4) + "\n");
});

function genWrap(generator) {
  let gen = generator();

  function handle(yielded) {
    if (!yielded.done) {
      yielded.value.then(data => {
        return handle(gen.next(data));
      });
    }
  }

  return handle(gen.next());
}
