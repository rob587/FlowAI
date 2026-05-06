const db = require("../db");
const { analyze } = require("../services/aiService");

const analyzeWorkFlow = async (req, res) => {
    try{
        const { input_text} = req.body

        if(!input_text){
            return res.status(400).json({ error: "Testo richiestp" });
        }
        console.log('Analizzando', input_text)  

        const aiResponse = await analyze(input_text)

        console.log('Risposta AI:', aiResponse)
    }
}