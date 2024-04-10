const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on("waterfull", () => {
  console.log("please turn off the switch!");
});
// myEmitter.emit("event");

module.exports = myEmitter;
