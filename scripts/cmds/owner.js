const { getStreamFromURL, getPrefix } = global.utils;

module.exports = {
    config: {
        name: "#owner",
        version: "1.1",
        author: "ShinChan",
        countDown: 5,
        role: 0,
        shortDescription: "",
        longDescription: "",
        category: "system",
        guide: {
            en: ""
        }
    },

    langs: {
        en: {
            myPrefix: "ℍ𝕖𝕪 𝕞𝕪 𝕠𝕨𝕟𝕖𝕣 𝕚𝕤  𝚂𝚑𝚒𝚗 𝙲𝚑𝚊𝚗(ẞhîñchañ No Hara) ( https://www.facebook.com/100089985795342 )! 💥\n\n𝕀'𝕞 𝕒 𝕤𝕚𝕞𝕡𝕝𝕖 𝕞𝕖𝕤𝕤𝕒𝕟𝕘𝕖𝕣 𝕔𝕙𝕒𝕥𝕓𝕠𝕥\n\n𝕋𝕙𝕒𝕟𝕜𝕤 𝕗𝕠𝕣 𝕦𝕤𝕚𝕟𝕘 𝕞𝕖\n\n🌐 My prefix: %1\n🛸 Your box chat prefix: %2"
        }
    },

    onStart: async function () {
        
    },

    onChat: async function ({ api, event, message, getLang }) {
        if (event.body && event.body.toLowerCase() === "#owner") {
            const imgurLink = "https://i.imgur.com/7QvkafW.jpg";
            
            api.sendMessage({
                body: getLang("myPrefix", global.GoatBot.config.prefix, getPrefix(event.threadID)),
                attachment: await getStreamFromURL(imgurLink),
            }, event.threadID);
        }
    }
};