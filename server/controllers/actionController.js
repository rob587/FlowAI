// import del db

const db = require("../db");

// simulazione invio email al cliente
const sendEmail = async (clientName, subject, message) => {
  console.log(`Inviando email a: ${clientName}`);
  console.log(`Soggetto: ${subject}`);
  console.log(`Messaggio: ${message}`);

  return {
    success: true,
    type: "email-sent",
    recipient: clientName,
    timestamp: new Date(),
  };
};

// simulazione aggiornamento Cliente

const updClient = async (clientName, status) => {
  console.log(`Aggiornando cliente ${clientName} a status: ${status}`);

  // oggetto
  return {
    success: true,
    type: "client_updated",
    client: clientName,
    status: status,
    timestamp: new Date(),
  };
};
