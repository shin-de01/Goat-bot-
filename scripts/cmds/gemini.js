const axios = require('axios');

module.exports = {
    config: {
        name: "gemini",
        version: "1.0",
        author: "Samir Thakuri",
        shortDescription: "This is a simple API of Gemini. ",
        longDescription: "A well-designed powerful generative AI chatbot by Google. It can also read and give a response according to your previous conversation.",
        category: "google",
        guide: { en:"{pn} <Question>" },
    },
  
  onStart: async function ({ message, event, args, commandName, userData }) {
    const chatid = event.senderID;
    const question = args.join(" ");
    if (!question) {
      return message.reply("Please provide a question.");
    } else {
      try {
        const gemini = await axios.get(`https://gemini.samirthakuri.repl.co/gemini?query=${encodeURIComponent(question)}&chatid=${chatid}`);
        const response = gemini.data.response;
        message.reply(
          {
            body: `${response}`,
          },
          (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
            });
          }
        );
      } catch (e) {
        console.error(e);
        message.reply("Error while fetching the response.");
      }
    }
  },

  onReply: async function ({ message, event, Reply, args, usersData }) {
    let { author, commandName, messageID } = Reply;
    if (event.senderID !== author) return;
    const chatid = event.senderID;

    const question = args.join(" ");

    try {
      const gemini = await axios.get(`https://gemini.samirthakuri.repl.co/gemini?query=${encodeURIComponent(question)}&chatid=${chatid}`);
      const response = gemini.data.response;
      message.reply(
        {
          body: `${response}`,
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      );
    } catch (e) {
      console.error(e);
      message.reply("Error while fetching the response.");
    }
  },
};