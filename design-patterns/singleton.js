class Singleton {
  constructor(value) {
    this.value = value;
  }

  static getInstance(value) {
    if (!this.instance) {
      this.instance = new Singleton(value);
    }

    return this.instance;
  }
}

const instance1 = Singleton.getInstance(1);
const instance2 = Singleton.getInstance(2);

console.log(instance1 === instance2); // true
