const amqplib = require("amqplib");

const { MESSAGE_BROKER_URL , EXCHANGE_NAME } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, BINDING_KEY) => {
  try {
    const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, BINDING_KEY);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("recieved data");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString())
      service(payload);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, BINDING_KEY, message) => {
  try {
    await channel.assertQueue('REMINDER_QUEUE');
    await channel.publish(EXCHANGE_NAME, BINDING_KEY, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage
};
