function cloneDeep(object, weakMap = new WeakMap()) {
  if (typeof object !== 'object') return object;
  if (object === null) return null;
  if (object instanceof Date) return new Date(object);
  if (object instanceof RegExp) return new RegExp(object);

  if (weakMap.has(object)) return weakMap.get(object);

  const clone = new object.constructor();
  weakMap.set(object, clone);

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      clone[key] = cloneDeep(object[key], weakMap);
    }
  }

  return clone;
}
