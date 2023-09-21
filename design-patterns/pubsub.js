class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  publish(eventName, data) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach((callback) => callback(data));
  }

  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
  }
}

const eventEmitter = new EventEmitter();

const callback1 = (data) => console.log('Callback 1 received data:', data);
const callback2 = (data) => console.log('Callback 2 received data:', data);

eventEmitter.subscribe('event', callback1);
eventEmitter.subscribe('event', callback2);

eventEmitter.publish('event', { message: 'Hello, subscribers!' });

eventEmitter.unsubscribe('event', callback1);

eventEmitter.publish('event', { message: 'After removing subscriber' });
