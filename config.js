C = exports;

C.config = {
  /* Email Notifications */
  mailEnabled: false,
  accessKeyId: 'YOUR SES ACCESS KEY',
  secretAccessKey: 'YOUR SES SECRET_KEY',
  region: 'SES REGION',
  from: 'FROM EMAIL',
  email: 'EMAIL TO SEND ALERTS TO',
  /* Webhook Notifications */
  webhookEnabled: true,
  webhookUrl: '',
  diskAlertMessage: '',
  mongoAlertMessage: '', 
};
