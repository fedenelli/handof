const fetch = require('node-fetch');
const config = require('../../config.js').config;

const makePost = async (message) => {
    console.log('Trigger Webhook to ', config.webhookUrl);
    const res = await fetch(config.webhookUrl, {
        method: 'post',
        body:    JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())

    console.log('Webhook Response:');
    console.log(res);

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