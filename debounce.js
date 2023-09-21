function debounce(fn, waitTime) {
  let timer = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const self = this;
    const args = arguments;

    timer = setTimeout(() => {
      fn.apply(self, args);
      timer = null;
    }, waitTime);
  };
}
