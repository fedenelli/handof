MailService = exports;
var awsSesMail = require('aws-ses-mail');
const config = require('../../config.js').config;
 
var sesMail = new awsSesMail();
var sesConfig = {
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region 
};
sesMail.setConfig(sesConfig);

MailService.sendMail = function(email, subject, text, context, cb) {
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
  var subject = "Service Alert!";
  var email = config.email;
  var context = {};
  MailService.sendMail(email, subject, text, context, callback);
};

