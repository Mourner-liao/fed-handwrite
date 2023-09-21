function throttle(fn, waitTime) {
  let timer = null;
  let lastTime = 0;

  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const self = this;
    const args = arguments;
    const nowTime = +new Date();
    const remainTime = waitTime - (nowTime - lastTime);

    if (remainTime > 0) {
      timer = setTimeout(() => {
        fn.apply(self, args);
        timer = null;
        lastTime = +new Date();
      }, remainTime);
    } else {
      fn.apply(self, args);
      lastTime = nowTime;
    }
  };
}
