import {publish} from "./post.publish.js";

export function sendMessage(region, branch, topping) {
  
  const message = {
    region,
    branch,
    topping,
  };
  console.log(topping)
  publish(message);
  console.log("Message was sent successfully.");
}

// module.exports = { sendMessage };

