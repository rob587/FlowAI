// import del db

const db = require("../db");

// simulazione invio email al cliente
const sendEmail = async (clientName, subject, message) => {
  console.log(`Inviando email a: ${clientName}`);
  return {
    success: true,
    type: "email-sent",
    recipient: clientName,
    timestamp: new Date(),
  };
};

// simulazione creazione task

const createTask = async (subject, urgency) => {
  console.log(`Creando task: ${subject} (urgency: ${urgency})`);
  return {
    success: true,
    type: "task-created",
    description: subject,
    urgency: urgency,
    timestamp: new Date(),
  };
};

const scheduleCall = async (clientName, subject) => {
  console.log(`Schedulando chiamata con: ${clientName}`);
  return {
    success: true,
    type: "call-scheduled",
    client: clientName,
    subject: subject,
    timestamp: new Date(),
  };
};

const sendReminder = async (clientName, message) => {
  console.log(`Inviando reminder a: ${clientName}`);
  return {
    success: true,
    type: "reminder-sent",
    recipient: clientName,
    message: message,
    timestamp: new Date(),
  };
};

// esegue l'azione basata sulla risposta AI

const executeAction = async (req, res) => {
  try {
    const { workflow_id, action, client_name, subject, message, urgency } =
      req.body;

    console.log("Eseguendo azione:", action);

    let actionResult;

    if (action === "send_email") {
      actionResult = await sendEmail(client_name, subject, message);
    } else if (action === "create_task") {
      actionResult = await createTask(subject, urgency);
    } else if (action === "schedule_call") {
      actionResult = await scheduleCall(client_name, subject);
    } else if (action === "send_reminder") {
      actionResult = await sendReminder(client_name, message);
    } else {
      return res.status(400).json({ error: "Azione non supportata" });
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

module.exports = {
  executeAction,
  sendEmail,
  createTask,
  scheduleCall,
  sendReminder,
};
