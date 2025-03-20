import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { saveAs } from "file-saver";
import {
  Search,
  Loader2,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DetectiveEngine = () => {
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [desiredSkills, setDesiredSkills] = useState("");
  const [targetCareer, setTargetCareer] = useState("");
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCareerData = async () => {
    setLoading(true);
    setError("");

    if (!education.trim() || !targetCareer.trim()) {
      setError("Please enter skills, education, and target career.");
      setLoading(false);
      return;
    }

    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBKsRgPntjqz87j_5-nd_hXqdhinoODyyc";

    const prompt = `
        You are an AI career advisor. Given a user's inputs, generate atleast 3 career options in **strict JSON format** as follows:

        {
          "career_options": [
            {
              "name": "Software Engineer",
              "subheading": "Building software solutions",
              "pros": ["High Salary", "Remote Work"],
              "cons": ["Work Pressure"],
              "market_scope": "Growing industry with 20% job increase by 2030.",
              "salary_range": "$70,000 - $150,000 per year",
              "reviews": [{ "title": "Great Career", "rating": 4.5, "comment": "Flexible and high-paying." }],
              "time_to_master": "2-4 years",
              "work_pressure": "Moderate",
               ### **📊 Market Trends Data for Graphs**
      "market_trends": {
        "job_openings": {  // 📈 Graph 1: Job Openings Over Time
          "2020": 50000,
          "2022": 70000,
          "2024": 90000,
          "2026": 110000,
          "2028": 130000,
          "2030": 150000
        },
        "salary_distribution": { // 🥧 Graph 2: Salary Breakdown
          "entry_level": 70000,
          "mid_level": 100000,
          "senior_level": 150000
        },
        "industry_growth_rate": { // 📈 Graph 3: Industry Growth Rate (%)
          "2020": 5,
          "2022": 7,
          "2024": 10,
          "2026": 13,
          "2028": 17,
          "2030": 20
        },
        "top_companies_hiring": ["Google", "Microsoft", "Amazon", "Tesla"] // 📊 Graph 4: Top Hiring Companies
      },
              "roadmap": [
                { "node_id": "1", "title": "Learn Programming", "node_type": "skill", "connections": ["2"], "sub_topics": ["Python", "Java", "C++"] },
                { "node_id": "2", "title": "Build Projects", "node_type": "experience", "connections": ["3"], "sub_topics": ["Web Development", "Machine Learning"] },
                { "node_id": "3", "title": "Apply for Jobs", "node_type": "job", "connections": [], "sub_topics": ["Google", "Microsoft", "Amazon"] }
              ]
            }
          ]
        }

        Generate career data for:
        **Skills:** ${skills || "Not specified"}
        **Education:** ${education}
        **Desired Skills:** ${desiredSkills || "Not specified"}
        **Target Career:** ${targetCareer}
        `;

    try {
      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      console.log("API Response:", response.data);

      let generatedText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedText) throw new Error("Invalid API response format.");

      generatedText = generatedText.replace(/```json|```/g, "").trim();

      const generatedData = JSON.parse(generatedText);
      setCareers(generatedData.career_options);

      // Save JSON File
      const blob = new Blob([JSON.stringify(generatedData, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, "career_data.json");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch career options. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (career) => {
    navigate("roadmap", { state: { roadmap: career.roadmap } });
  };

  return (
    <div className="relative min-h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-cyan-400">Career Path</h1>
        </motion.div>

        {/* User Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchCareerData();
          }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="What skills do you have?"
              className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none"
            />
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Your education"
              className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none"
            />
            <input
              type="text"
              value={desiredSkills}
              onChange={(e) => setDesiredSkills(e.target.value)}
              placeholder="Skills you want to gain (Optional)"
              className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none"
            />
            <input
              type="text"
              value={targetCareer}
              onChange={(e) => setTargetCareer(e.target.value)}
              placeholder="What do you want to become?"
              className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 mt-4 rounded-lg bg-cyan-600 text-white flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            {loading ? "Fetching..." : "Search"}
          </motion.button>
        </form>

        {/* Career Cards */}
        {careers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.map((career, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-black/50 p-6 rounded-lg border border-cyan-500/20"
              >
                <h3 className="text-xl font-bold text-cyan-400">
                  {career.name}
                </h3>
                <p className="text-gray-300">{career.subheading}</p>

                <div className="mt-3 flex items-center gap-4">
                  <Clock className="text-cyan-400 w-5 h-5" />
                  <p className="text-gray-400">
                    Time to Master: {career.time_to_master}
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <AlertTriangle className="text-red-400 w-5 h-5" />
                  <p className="text-gray-400">
                    Work Pressure: {career.work_pressure}
                  </p>
                </div>

                <div className="mt-4 flex gap-4">
                  <ul className="text-green-400">
                    {career.pros.map((pro, i) => (
                      <li key={i}>
                        <CheckCircle className="inline w-4 h-4 mr-2" /> {pro}
                      </li>
                    ))}
                  </ul>
                  <ul className="text-red-400">
                    {career.cons.map((con, i) => (
                      <li key={i}>
                        <XCircle className="inline w-4 h-4 mr-2" /> {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleCardClick(career)}
                  className="mt-4 px-3 py-1 bg-cyan-600 text-white rounded-lg"
                >
                  View Roadmap
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DetectiveEngine;
