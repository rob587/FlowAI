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

// simulazione creazione task

const createTask = async (RTCSessionDescription, urgency) => {
  console.log(`Creando la task: ${description} (urgency: ${urgency})`);

  return {
    success: true,
    type: "task_created",
    description: description,
    urgency: urgency,
    timestamp: new Date(),
  };
};

// esegue l'azione basata sulla risposta AI

const executeAction = async (req, res) => {
  try {
    const { workflow_id, action, client_name, subject, message, urgency } =
      req.body;

    console.log("Eseguendo l'azione:", action);

    let actionResult;

    if (action === "send_email") {
      actionResult = await sendEmail(client_name, subject, message);
    } else if (action === "update_client") {
      actionResult = await updateClient(client_name, urgency);
    } else if (action === "create_task") {
      actionResult = await createTask(subject, urgency);
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }

    const query =
      "INSERT INTO actions (workflow_id, action_type, action_data, result) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [
        workflow_id,
        action,
        JSON.stringify({ client_name, subject, message, urgency }),
        JSON.stringify(actionResult),
      ],
      (err, result) => {
        if (err) {
          console.error("Errore DB:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({
          success: true,
          action_id: result.insertId,
          result: actionResult,
        });
      },
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { executeAction, sendEmail, updateClient, createTask };
