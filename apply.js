Function.prototype.apply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }

  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const fn = Symbol('fn');
  context[fn] = this;

  let result;

  if (args && typeof args === 'object' && 'length' in args) {
    result = context[fn](...Array.from(args));
  } else if (args === null || args === undefined) {
    result = context[fn]();
  } else {
    throw new TypeError('second argument is not iterable');
  }

  delete context[fn];

  return result;
};
