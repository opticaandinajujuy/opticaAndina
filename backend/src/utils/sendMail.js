const transporter = require('../config/mailer');

async function sendQuoteNotification(quote) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `Nueva consulta de presupuesto - ${quote.name}`,
    text: `Nombre: ${quote.name}\nTeléfono: ${quote.phone}\nEmail: ${quote.email}\nMensaje: ${quote.message}\nReceta: ${quote.recipeUrl || 'No adjuntó'}`,
  });
}

module.exports = { sendQuoteNotification };
