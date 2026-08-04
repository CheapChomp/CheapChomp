const { resendService } = require('../services/resendService');

async function sendEmail(req, res) {
  try {
    await resendService.sendVerificationEmail();
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}

module.exports = { sendEmail };