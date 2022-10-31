const fetch = require('node-fetch');
const config = require('../../config.js').config;

const makePost = async (message) => {
    const res = await fetch(config.webhookUrl, {
        method: 'post',
        body:    JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())

    return res;
};

exports.diskWebhook = async () => {
    const res = await makePost(config.diskAlertMessage);
    return res;
};

exports.mongoWebhook = async () => {
    const res = await makePost(config.mongoAlertMessage);
    return res;
};