MailService = exports;
var awsSesMail = require('aws-ses-mail');
const config = require('../../config.js').config;
 
var sesMail = config.mailEnabled ? new awsSesMail() : null;
var sesConfig = {
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region 
};

if (config.mailEnabled) {
  sesMail.setConfig(sesConfig);
}

MailService.sendMail = function(email, subject, text, context, cb) {

  if (!config.mailEnabled) {
    if (cb) cb();
    return;
  }

    msg = {
      to: email,
      from: config.from,
      subject: subject,
      content: text,
    };
    sesMail.sendEmail(msg, function(err, json) {
        if (err) {
        console.error(err);
        }
        if (cb) cb();
    });
}

MailService.sendAlertEmail = function(text, callback) {
  if (!config.mailEnabled) {
    if (callback) callback();
    return;
  }
  var subject = "Service Alert!";
  var email = config.email;
  var context = {};
  MailService.sendMail(email, subject, text, context, callback);
};

