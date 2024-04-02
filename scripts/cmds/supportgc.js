const { config } = global.GoatBot;

var supportGroupThreadID;

module.exports = {
  config: {
    name: "supportgc",
    version: "1.3.1",
    author: "Shikaki",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Join the support group chat"
    },
    longDescription: {
      en: "Join the official support group chat"
    },
    category: "General",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ args, api, event, threadsData, message }) {
    if (args[0] == "tid") {
      try {
        const isAdmin = config.adminBot.includes(event.senderID);
        if (!isAdmin) {
          return message.reply("❌ You need to be an admin of the bot.");
        }

        tid = args[1];

        if (!tid) {
          return message.reply("🥲 Please provide the thread ID of your bot's support group.");
        }

        supportGroupThreadID = tid;

        return message.reply(`✅ Successfully changed the bot's support GC's thread to ${tid}.`);
      } catch (error) {
        const failedMessage = `
          ❌ Failed to change the support group thread ID.\nError: ${error}\nTry again ❌`;
        console.error("Error changing support group thread ID:", error);
        return message.reply(failedMessage);
      }
    }
    try {
      const { members } = await threadsData.get(supportGroupThreadID);

      const userAlreadyInGroup = members.some(
        member => member.userID === event.senderID && member.inGroup
      );

      if (userAlreadyInGroup) {
        const alreadyInGroupMessage = `
🚫 You are already a member of the support group. 🚫
        `;
        return message.reply(alreadyInGroupMessage);
      }

      await api.addUserToGroup(event.senderID, supportGroupThreadID);

      const successMessage = `
✅ You have been added to the support group successfully. ✅
      `;
      return message.reply(successMessage);
    } catch (error) {
      const failedMessage = `
❌ Failed to add you to the support group.\nTry befriending this account / Unlock profile and try again❌
      `;
      return message.reply(failedMessage);
    }
  }
};
