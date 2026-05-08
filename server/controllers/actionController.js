// import del db

const db = require("../db");

// simulazione invio email al cliente
const sendEmail = async (clientName, subject, message) => {
  console.log(`📧 Sending email to ${clientName}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);

  return {
    success: true,
    type: "email-sent",
    recipient: clientName,
    timestamp: new Date(),
  };
};
