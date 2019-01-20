const { XMLHttpRequest } = require("xmlhttprequest");

function get(url) {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);

    xhttp.onload = () => {
      if (xhttp.status === 200) {
        resolve(xhttp.response);
      } else {
        reject(xhttp.statusText);
      }
    };

    xhttp.onerror = () => {
      reject(xhttp.statusText);
    };

    xhttp.send();
  });
}

var promise = get("https://jsonplaceholder.typicode.com/todos/1");

promise.then(tweets => {
  console.log(tweets);
});

promise.catch(error => {
  console.log(error);
});
