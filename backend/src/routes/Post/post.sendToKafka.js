import {publish} from "./post.publish.js";
export function sendMessage(region, branch, topping) {
  
  const message = {
    region,
    branch,
    topping,
    createdAt: Date.now() ,
  	ttl: Date.now(),

  };
  console.log(topping);
  publish(message);
  console.log("Message was sent successfully.");
}

// module.exports = { sendMessage };

