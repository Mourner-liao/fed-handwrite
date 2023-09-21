function flat(arr, n) {
  const res = [];

  for (const item of arr) {
    if (Array.isArray(item) && n !== 0) {
      const value = flat(item, n - 1);
      res.push(...value);
      continue;
    }

    res.push(item);
  }

  return res;
}
