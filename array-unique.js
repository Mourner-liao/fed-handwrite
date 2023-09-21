function unique(array) {
  // 不使用 Map 和 Set
  return array.filter((item, index, array) => {
    if (item && typeof item === 'object') {
      for (const obj of array) {
        if (!obj || typeof obj !== 'object') continue;

        if (objStringify(obj) === objStringify(item)) {
          return array.indexOf(obj) === index;
        }
      }
    } else {
      return array.indexOf(item) === index;
    }
  });
}

function objStringify(obj) {
  const newObj = {};

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      newObj[key] = obj[key];
    });

  return JSON.stringify(newObj);
}

console.log(unique([1, 2, 3, 3, 4, 4, null, null, undefined, undefined, { a: 1, b: 2 }]));
