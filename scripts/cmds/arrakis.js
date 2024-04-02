const axios = require('axios');
const cheerio = require('cheerio');

const Prefixes = ['arrakis'];

module.exports = {
  config: {
    name: 'arrakis',
    version: '2.6',
    author: 'JV Barcenas',
    role: 0,
    category: 'Ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

    if (!prefix) {
      return;
    }

    const prompt = event.body.substring(prefix.length).trim();
    try {
      const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(prompt)}`;
      const searchResponse = await axios.get(searchUrl);

      if (searchResponse.status !== 200) {
        throw new Error('Invalid or missing response from search API');
      }

      const $ = cheerio.load(searchResponse.data);

      let searchMessage = `Here are some search results for "${prompt}":\n\n`;

      const resultLimit = 6;
      $('li.b_algo').slice(0, resultLimit).each((index, element) => {
        const title = $(element).find('h2').text();
        const link = $(element).find('h2 > a').attr('href');
        const snippet = $(element).find('p').text();

        searchMessage += `${index + 1}. [${title}](${link})\n${snippet}\n\n`;
      });

      const finalPrompt = `${searchMessage}Now,analyze the information and provide an answer. Alternatively, you can choose to ignore the search results if you do not find a suitable answer or have a superior answer. `;

      const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(finalPrompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from GPT API');
      }

      const messageText = response.data.content.trim();

      await message.reply(messageText);
    } catch (error) {
      console.error(`Failed to get search results: ${error.message}`);
      await message.reply(`Failed to get search results: ${error.message}`);
    }
  },
};
