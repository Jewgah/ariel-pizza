import {publish} from "./post.kafkaConnection.js";

export function sendMessage(region, branch, topping) {

  const message = region +"/"+ branch + "/" + topping;
  publish(message);
  console.log("Message was sent successfully.");
}

// module.exports = { sendMessage };

