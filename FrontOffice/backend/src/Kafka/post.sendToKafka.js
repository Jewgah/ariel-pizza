import {publish} from "./post.publish.js";

export function sendMessage(region, branch, topping) {

  const message = {
    region,
    branch,
    topping,
    createdAt: new Date(),
    ttl: (() => {
      const now = new Date();
      const randMinutes = Math.floor(Math.random() * 160);
      const randMillis = randMinutes * 60 * 1000;
      const futureTime = now.getTime() + randMillis;
      return new Date(futureTime);
    })()
  };
  console.log(topping);
  publish(message);
  console.log("Order Message was sent successfully.");
}

export function sendBranch(region, branch, action) {

  const message = {
    region,
    branch,
    action,
  };

  publish(message);
  console.log("Branch Message was sent successfully.");
}

