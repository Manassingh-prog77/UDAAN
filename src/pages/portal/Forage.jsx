import { useState } from "react";
import {  Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {  Search } from "lucide-react";
import { Loader2 } from "lucide-react";

const CareerTasks = () => {
  const [careerInterest, setCareerInterest] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    if (!careerInterest.trim()) {
      alert("Please enter a career interest.");
      return;
    }

    setLoading(true);
    const GEMINI_API_KEY = "AIzaSyCILU-_ezGfu3iojbS-hFe9-Fil4klNOlo";

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are a seasoned professional with **15 years of experience** in **${careerInterest}**. A new intern has joined your team, eager to gain hands-on experience and understand how real-world tasks are executed in this field. Your goal is to design **four tasks** for the intern that progressively increase in difficulty, ensuring they gain practical knowledge and problem-solving skills.

Each task should:
1. **Reflect real-world work** in this field.
2. **Gradually increase in complexity** to help the intern build confidence and expertise step by step.
3. **Provide a brief explanation** of why this task is important and what they will learn from it.
4. **Include a time estimate** for completion to help with workload management.

### **Output Format:**  
Provide the response in **valid JSON format** using the following structure:  

\`\`\`json
{
  "tasks": [
    {
      "taskNumber": 1,
      "title": "Task Title",
      "difficulty": "Beginner",
      "explanation": "Brief explanation of the task and why it's important.",
      "timeToComplete": "Estimated time in hours or days"
    },
    {
      "taskNumber": 2,
      "title": "Task Title",
      "difficulty": "Intermediate",
      "explanation": "Brief explanation of the task and why it's important.",
      "timeToComplete": "Estimated time in hours or days"
    },
    {
      "taskNumber": 3,
      "title": "Task Title",
      "difficulty": "Advanced",
      "explanation": "Brief explanation of the task and why it's important.",
      "timeToComplete": "Estimated time in hours or days"
    },
    {
      "taskNumber": 4,
      "title": "Task Title",
      "difficulty": "Expert",
      "explanation": "Brief explanation of the task and why it's important.",
      "timeToComplete": "Estimated time in hours or days"
    }
  ]
}
\`\`\`

Make sure the response is **structured correctly in JSON format** so that it can be easily parsed and used in applications.`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Extract JSON from the response by removing ```json and ``` markdown
      const jsonMatch = textResponse.match(/```json\n([\s\S]+?)\n```/);
      if (jsonMatch) {
        const cleanedJson = jsonMatch[1]; // Extract only the JSON part
        const parsedData = JSON.parse(cleanedJson);
        setTasks(parsedData.tasks);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  return (
    <Box  style={{display:"flex"}} sx={{flexDirection:"column",p:5}}>
      <div className="relative">
                  <motion.input
                    type="text"
                    value={careerInterest}
                    onChange={(e) => setCareerInterest(e.target.value)}
                    placeholder="Tell us about your career aspirations!"
                    className="w-full p-4 pl-12 pr-24 bg-black/50 backdrop-blur-xl 
                      border border-emerald-500/20 rounded-xl text-white
                      placeholder-gray-400 focus:outline-none focus:border-emerald-500
                      focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                  <motion.button
                  onClick={fetchTasks}
                    disabled={loading || !careerInterest.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 
                      px-4 py-2 rounded-lg flex items-center gap-2
                      ${
                        loading || !careerInterest.trim()
                          ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-600 to-blue-600 text-white"
                      }`}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Analyze"
                    )}
                  </motion.button>
                </div>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={12} key={task.taskNumber}>
  <Card
    sx={{
      background: "linear-gradient(145deg, #1e1e1e, #292929)", // Dark gradient background
      color: "#fff", // White text
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 255, 170, 0.2)", // Soft neon glow
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)", // Slight hover zoom
        boxShadow: "0 6px 20px rgba(0, 255, 170, 0.5)", // Stronger glow on hover
      },
      padding: "16px",
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(90deg, #00ffa2, #00f2ff)", // Neon gradient
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Task {task.taskNumber}: {task.title}
      </Typography>

      <Typography variant="body2" sx={{ color: "#00ffa2", fontWeight: "bold" }}>
        Difficulty: {task.difficulty}
      </Typography>

      <Typography variant="body1" sx={{ margin: "10px 0", color: "#ddd" }}>
        {task.explanation}
      </Typography>

      <Typography variant="body2" sx={{ color: "#00f2ff", fontWeight: "bold" }}>
        ⏳ Time to complete: {task.timeToComplete}
      </Typography>
    </CardContent>
  </Card>
</Grid>

        ))}
      </Grid>
    </Box>
  );
};

export default CareerTasks;
