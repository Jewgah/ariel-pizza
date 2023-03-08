const kafka = require('./post.kafkaConnection');

function sendMessage(region, branch, topping) {

  const message = region +"/"+ branch + "/" + topping;
  kafka.publish(message);
  console.log("Message was sent successfully.");
}

export default module.exports = { sendMessage };
