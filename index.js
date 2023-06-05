const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

// console.log(fetchPromise);

// fetchPromise.then((response) => {
//   const jsonPromise = response.json();
//   jsonPromise.then((data) => {
//     data.forEach((item) => {
//       // console.log(item.name);
//       namesArray.push(item.name);
//     });
//     console.log(data[0].name);
//   });
//   // console.log(`received response: ${response.status}`);
// });

// fetchPromise
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   });

// console.log("Started Request....");

// const fetchPromiseFail = fetch(
//   "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
// );

// fetchPromiseFail
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP ERROR: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   })
//   .catch((error) => {
//     console.error(`Could not get products: ${error}`);
//   });

/*
First, a promise can be in one of three states:

pending: the promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet. This is the state your promise is in when it's returned from a call to fetch(), and the request is still being made.
fulfilled: the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called.
rejected: the asynchronous function has failed. When a promise is rejected, its catch() handler is called.


Note that what "succeeded" or "failed" means here is up to the API in question: for example, fetch() considers a request successful if the server returned an error like 404 Not Found, but not if a network error prevented the request being sent.
*/

// A promise is resolved if it is settled, or if it has been "locked in" to follow the state of another promise.

/*

-You fulfill a promise (with a fulfillment value)
or
-You reject a promise (with a rejection reason explaining why it can't be fulfilled)


If the other promise is fulfilled, your original promise will fulfill itself with the other promise's fulfillment value
If the other promise is rejected, your original promise will reject itself with the other promise's rejection reason
If the other promise never settles, your original promise won't either
*/

/* 
The promise returned by Promise.all() is:

fulfilled when and if all the promises in the array are fulfilled. In this case, the then() handler is called with an array of all the responses, in the same order that the promises were passed into all().
rejected when and if any of the promises in the array are rejected. In this case, the catch() handler is called with the error thrown by the promise that rejected.
*/

// const fetchPromise1 = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
// );
// const fetchPromise2 = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found"
// );
// const fetchPromise3 = fetch(
//   "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
// );

// Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((responses) => {
//     for (const response of responses) {
//       console.log(`${response.url}: ${response.status}`);
//     }
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`);
//   });

/*
Sometimes, you might need any one of a set of promises to be fulfilled, 
and don't care which one. In that case, you want Promise.any(). This is 
like Promise.all(), except that it is fulfilled as soon as any of the array 
of promises is fulfilled, or rejected if all of them are rejected:
*/

// const fetchPromiseOne = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
// );
// const fetchPromise2Two = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found"
// );
// const fetchPromiseThree = fetch(
//   "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
// );

// Promise.any([fetchPromiseOne, fetchPromise2Two, fetchPromiseThree])
//   .then((response) => {
//     console.log(`${response.url}: ${response.status}`);
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`);
//   });

/*
Inside an async function, you can use the await keyword before a call to a 
function that returns a promise. This makes the code wait at that point until 
the promise is settled, at which point the fulfilled value of the promise is 
treated as a return value, or the rejected value is thrown.
*/

// async function fetchProducts() {
//   try {
//     // after this line, our function will wait for the `fetch()` call to be settled
//     // the `fetch()` call will either return a Response or throw an error
//     const response = await fetch(
//       "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     // after this line, our function will wait for the `response.json()` call to be settled
//     // the `response.json()` call will either return the parsed JSON object or throw an error
//     const data = await response.json();
//     console.log(data[0].name);
//   } catch (error) {
//     console.error(`Could not get products: ${error}`);
//   }
// }

// fetchProducts();

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

const promise = fetchProducts();
promise.then((data) => console.log(data[0].name));
