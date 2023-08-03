const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const instructions = fs.readFileSync('./prompt.txt').toString(); 
const aprovedApps = require('./apps.json');

const userInput = "Search for a list of all postal codes in Ontario."
const appsPrompt = aprovedApps.map((app) => {
    return `App: ${app.name}\nDescription: ${app.description}\n\n`
}).join('\n')

const prompt = instructions + appsPrompt + "\n\nInput: " + userInput + "\n\nOutput: ";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);


(async () => {
    // try{
    //     const chat_completion = await openai.createChatCompletion({
    //         model: "gpt-3.5-turbo",
    //         messages: [{role: "user", content: prompt }],
    //     });
    //     console.log(chat_completion.data.choices[0].message.content);
    //     console.log(`Total tokens: ${chat_completion.data.usage.total_tokens}`)
    // } catch (error) {
    //     console.log(error.message)
    // }


    const text = await openai.createTranscription(fs.createReadStream('./test.m4a'), "whisper-1")
    console.log(text.data.text)
})();
