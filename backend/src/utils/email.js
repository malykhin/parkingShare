const config = require('../config')
const mailgun = require('mailgun-js')({ apiKey: config.mailgunApiKey, domain: config.mailgunDomain })

async function sendConfirmationEmail(card) {
  const confirmationLink = `${config.baseUrl}/api/settings/confirm?confirmationToken=${card.confirmationToken}`
  const data = {
    from: 'Parking service <parking@lohika.com>',
    to: card.email,
    subject: 'Email confirmation',
    text: `Please confirm your account: ${confirmationLink}`,
  }

  await mailgun.messages().send(data)
}

module.exports = {
  sendConfirmationEmail,
}
