let activeEffect = null;
let effectStack = [];

const data = {
  name: 'CTX',
  identify: 'student',
  age: 18,
};

const handler = {
  get(target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    Reflect.set(target, key, value, receiver);
    trigger(target, key);
  },
};

const dataProxy = new Proxy(data, handler);

function effect(
  fn,
  options = {
    scheduler: null,
    lazy: false,
  },
) {
  const effectFn = function () {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack.length ? effectStack[effectStack.length - 1] : null;
  };

  effectFn.options = options;

  if (!options || !options.lazy) {
    effectFn();
  }

  return effectFn;
}

function track(target, key) {
  if (!activeEffect) {
    return;
  }

  let keyMap = targetWeakMap.get(target);

  if (!keyMap) {
    targetWeakMap.set(target, (keyMap = new Map()));
  }

  let effectSet = keyMap.get(key);

  if (!effectSet) {
    keyMap.set(key, (effectSet = new Set()));
  }

  effectSet.add(activeEffect);
}

function trigger(target, key) {
  const keyMap = targetWeakMap.get(target);

  if (!keyMap) {
    return;
  }

  let effectSet = keyMap.get(key);
  const effectRun = new Set(effectSet);

  effectRun.forEach((fn) => {
    if (fn.options.scheduler) {
      fn.options.scheduler(fn);
    } else {
      fn();
    }
  });
}

function updateView() {
  const ele = document.getElementById('container');
  ele.innerText = `${dataProxy.name}-${dataProxy.identify}-${dataProxy.age}`;
}

effect(updateView);

dataProxy.identify = 'teacher';

console.log('hello');
