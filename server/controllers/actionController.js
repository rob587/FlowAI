// import del db

const db = require("../db");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

//  invio email al cliente
const sendEmail = async (clientName, subject, message) => {
  console.log(`Inviando email a: ${clientName}`);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "robertocamm.dev@gmail.com",
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">FlowAI — Notifica Cliente</h2>
        <p><strong>Cliente:</strong> ${clientName}</p>
        <p><strong>Soggetto:</strong> ${subject}</p>
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p>${message}</p>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
          Inviato automaticamente da FlowAI
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Errore Resend", error);
    throw new Error(error.message);
  }

  console.log("Email Inviata", data);
  return {
    success: true,
    type: "email-sent",
    recipient: clientName,
    email_id: data.id,
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
