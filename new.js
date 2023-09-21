function myNew() {
  const constructor = Array.prototype.shift.call(arguments);

  if (typeof constructor !== 'function') {
    throw new Error('constructor must be a function');
  }

  const object = Object.create(constructor.prototype);
  const result = constructor.apply(object, arguments);

  return result instanceof Object ? result : object;
}
