# FlowAI

Un'applicazione **AI-powered workflow automation** che analizza automaticamente problemi aziendali e esegue azioni intelligenti in tempo reale.

Cosa fa

scenario ipotetico:
Utente scrive: "Il cliente Mario non paga da 2 mesi"
↓
AI capisce il problema
↓
Sistema genera automaticamente:

- Email di sollecito
- Aggiorna stato cliente
- Crea task di follow-up
  ↓
  Tutto salvato nel database
  ↓
  Utente vede il risultato in tempo reale

Flusso:

1. INPUT (Frontend)

Utente scrive il problema in textarea
Clicca "Analizza"

2. AI PROCESSING (Backend + Groq API)

Testo inviato a Groq LLM
AI capisce: cliente, azione necessaria, urgenza
Ritorna JSON strutturato

3. AUTOMAZIONE (Backend)

Sistema legge la risposta AI
Esegue l'azione automaticamente
Salva tutto nel database MySQL

4. VISUALIZZAZIONE (Frontend)

Mostra analisi AI all'utente
Bottone "Esegui Azione"
Mostra risultato dell'azione

Esempio:
Input:
"La cliente Sara ha cancellato l'ordine, mi serve contattarla urgentemente"
Output AI:
json{
"action": "send_email",
"client_name": "Sara",
"subject": "Ricontattiamoci sul tuo ordine",
"message": "Cara Sara, abbiamo visto che hai cancellato...",
"urgency": "high"
}
Azione Eseguita:
Email generata e salvata nel database

Tecnologie usate:

Groq API per l'AI
Express backend per la logica
MySQL per storico
React frontend moderno e responsive
Real-time updates con fetch API
