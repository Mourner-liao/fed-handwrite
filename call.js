Function.prototype.call = function (context, ...args) {
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

  if (args.length) {
    result = context[fn](...Array.from(args));
  } else {
    result = context[fn]();
  }

  delete context[fn];

  return result;
};
