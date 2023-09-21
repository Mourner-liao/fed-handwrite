function promiseAll(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('argument must be an array');
  }

  return new Promise((resolve, reject) => {
    const res = [];
    let count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          res[index] = value;
          count++;

          if (count === promises.length) {
            resolve(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// test
const p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject(1);
  }, 1000);
});
const p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
const p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2])
  .then((res) => {
    console.log(res); // [3, 1, 2]
  })
  .catch((err) => {
    console.log(err);
  });
