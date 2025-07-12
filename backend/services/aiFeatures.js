const openai = require('../services/openaiService');

exports.moderateContent = async (content) => {
    const response = await openai.createModeration({ input: content });
    return response.data.results[0];
};

exports.generateAnswer = async (question) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are an expert Q&A assistant.' },
            { role: 'user', content: question },
        ],
        max_tokens: 256,
    });
    return response.choices[0].message.content;
};

exports.summarizeQuestion = async (question) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Summarize the following question in one sentence.' },
            { role: 'user', content: question },
        ],
        max_tokens: 64,
    });
    return response.choices[0].message.content;
};

exports.suggestTags = async (question) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Suggest 3 relevant tags for the following question.' },
            { role: 'user', content: question },
        ],
        max_tokens: 32,
    });
    return response.choices[0].message.content.split(',').map(tag => tag.trim());
};
