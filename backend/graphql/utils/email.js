var credentialsmg = require('../credentials/credentials.json');
const apiKey = credentialsmg.apiKey;
const domain = credentialsmg.domain;

exports.sendEmail = function(req, res) {
  const mailgun = require("mailgun-js");
  const mg = mailgun({apiKey: apiKey, domain: domain});
  const data = {
    from: 'raulojeda10g@gmail.com',
    to: 'raulojeda10g@gmail.com',
    subject: 'Message from ' + req.body.email + ' ' + req.body.name,
    text: req.body.message
  };
  mg.messages().send(data, function (error, body) {
    return res.json({contact: body});
  });
}