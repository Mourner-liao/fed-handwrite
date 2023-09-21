Function.prototype.bind = (context, ...args) => {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }

  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const fn = this;

  const boundFn = function (...boundArgs) {
    let isInstance;

    try {
      isInstance = this instanceof boundFn;
    } catch (error) {
      isInstance = false;
    }

    return fn.apply(isInstance ? this : context, args.concat(boundArgs));
  };

  const fnPrototype = Object.create(fn.prototype);
  boundFn.prototype = fnPrototype;

  return boundFn;
};
