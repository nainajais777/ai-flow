 const express = require("express");
 const app = express();
 const mongoose = require("mongoose");
 const connectDB = require("./db");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const Prompt = require("./models/Prompt");

app.use(cors());
app.use(express.json());

connectDB(); // call the function to connect
// Connect MongoDB

/*  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error:", err.message));*/

// AI Endpoint
/*app.post("/api/ask-ai", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post(
            "https://openrouter.ai/v1/chat/completions",
            {
                model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}` }
            }
        );
        res.json({ answer: response.data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/
app.post("/api/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
       messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    console.log("typeof data",typeof data);  // "object"
console.log("data",data); 

    // ✅ SAFE extraction
    const aiReply =
      data?.choices?.[0]?.message?.content || "No response from AI";
console.log(`data.choices,${data.choices[0].message.content}`);  // Can access properties!
    // optional: clean extra tokens like [/s] [s]
    //const cleanReply = aiReply.replace(/\[\/?s\]/g, "").trim();
// Beginner-friendly cleaning:
const tagsToRemove = ['[s]', '[/s]', '[OUT]', '[/OUT]', '<s>', '</s>'];
let cleanReply = aiReply;

tagsToRemove.forEach(tag => {
  cleanReply = cleanReply.replaceAll(tag, '');
});

cleanReply = cleanReply.replace(/\s+/g, ' ').trim();  // Only regex needed!
    
console.log(`cleanreply ${cleanReply}`);
    res.json({ answer: cleanReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Save to DB
app.post("/api/save", async (req, res) => {
    const { prompt, answer } = req.body;
    try {
        const record = new Prompt({ prompt, answer });
        await record.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));


