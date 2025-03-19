// // backend -> /investigation route

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import {
//   Search,
//   Loader2,
//   Clock,
//   AlertCircle,
//   Mic,
//   MicOff,
//   MessageSquare,
//   TrendingUp,
//   BookOpen,
//   Network,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const DetectiveEngine = () => {
//   const [query, setQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [skill, setSkills] = useState();
//   const [learn, setlearn] = useState();
//   const [education, setEducation] = useState();
//   const [aoi, setAoi] = useState();
//   const [work, setWork] = useState();

//   const responseRef = useRef(null);
//   const queryInputRef = useRef(null);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition({
//     commands: [
//       { command: "reset", callback: () => resetTranscript() },
//       { command: "search", callback: () => handleQuerySubmit() },
//       { command: "clear", callback: () => setQuery("") },
//     ],
//   });

//   // Background Elements Component
//   const BackgroundEffect = () => (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <div className="absolute w-screen h-screen">
//         <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute w-96 h-96 top-1/3 right-1/4 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
//       </div>
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
//           `,
//           backgroundSize: "40px 40px",
//         }}
//       />
//     </div>
//   );

//   useEffect(() => {
//     if (queryInputRef.current) queryInputRef.current.focus();
//   }, []);

//   useEffect(() => {
//     if (transcript) setQuery(transcript);
//   }, [transcript]);

//   useEffect(() => {
//     if (response && responseRef.current) {
//       responseRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [response]);

//   useEffect(() => {
//     if (copied) {
//       const timer = setTimeout(() => setCopied(false), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [copied]);

//   const handleRoadmapClick = () => {
//     console.log(skill);
//     console.log(learn);
//     navigate("roadmap", {
//       state: {
//         skillsToLearn: learn,
//         currentSkill: skill,
//       },
//     });
//   };

//   const handleQuerySubmit = async (e) => {
//     if (e) e.preventDefault();
//     if (!query.trim()) return;

//     setIsLoading(true);
//     setError("");
//     setResponse(null);

//     try {
//       const GEMINI_API_KEY = "AIzaSyCILU-_ezGfu3iojbS-hFe9-Fil4klNOlo";
//       const geminiResponse = await axios.post(
//         `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   text: `As an experienced career counselor with a wealth of knowledge in various fields, I would like you to analyze the following user data and provide five career options. Your task is to consider the user's skills, education, area of interest, and employment status when suggesting realistic and professional career paths.

// Please ensure that the suggestions are tailored to the user’s profile and provide a brief description for each career option. Respond in valid JSON format with the following structure:

// career_options: an array of five career options, each as a string with the career title, skills you need to learn and a brief description.
// Input Information:

// User Query: ${query}
// User Skills: ${skill}
// User Education: ${education}
// User Area of Interest: ${aoi}
// User Employment Status: ${work}
// Instructions: Provide career options that are suitable based on the user's background. As an expert, please make sure to deliver well-thought-out and realistic career options that match the user’s experience, interests, and career goals. The output must be in valid JSON format.`,
//                 },
//               ],
//             },
//           ],
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       const responseText =
//         geminiResponse.data.candidates[0].content.parts[0].text;
//       const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
//       try {
//         const parsedResponse = JSON.parse(cleanedResponse);
//         console.log(parsedResponse);
//         setResponse({
//           data: parsedResponse.career_options,
//         });
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//       }
//     } catch (err) {
//       console.error("Error querying investigation AI:", err);
//       setError(err.message || "Failed to get response. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleListening = () => {
//     if (listening) {
//       SpeechRecognition.stopListening();
//       setIsListening(false);
//     } else {
//       setIsListening(true);
//       resetTranscript();
//       SpeechRecognition.startListening({ continuous: true });
//     }
//   };

//   return (
//     <div className="relative min-h-full">
//       <BackgroundEffect />

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="relative z-10 max-w-5xl mx-auto"
//       >
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <div className="flex justify-center mb-6">
//             <MessageSquare className="w-16 h-16 text-cyan-400" />
//           </div>

//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             <div
//               className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
//               bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 
//               shadow-lg shadow-cyan-500/10"
//             >
//               <Network className="w-4 h-4 mr-2" />
//               Career Options
//             </div>
//             <div
//               className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
//               bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 
//               shadow-lg shadow-cyan-500/10"
//             >
//               <BookOpen className="w-4 h-4 mr-2" />
//               Roadmap
//             </div>
//             <div
//               className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
//               bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 
//               shadow-lg shadow-cyan-500/10"
//             >
//               <TrendingUp className="w-4 h-4 mr-2" />
//               Market Trends
//             </div>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
//               Career Path
//             </span>
//           </h1>
//         </motion.div>

//         {/* Query Input */}
//         <form onSubmit={handleQuerySubmit} className="mb-8">
//           <div className="relative">
//             <motion.input
//               ref={queryInputRef}
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Tell us about your career goals"
//               className="w-full p-4 pl-12 pr-24 bg-black/50 backdrop-blur-xl 
//                 border border-cyan-500/20 rounded-xl text-white
//                 placeholder-gray-400 focus:outline-none focus:border-cyan-500/50
//                 focus:ring-2 focus:ring-cyan-500/20 transition-all"
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
//             <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
//               {browserSupportsSpeechRecognition && (
//                 <motion.button
//                   type="button"
//                   onClick={toggleListening}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`p-2 rounded-lg transition-all ${
//                     isListening
//                       ? "bg-red-500/20 text-red-400 border border-red-500/20"
//                       : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20"
//                   }`}
//                 >
//                   {isListening ? (
//                     <MicOff className="w-5 h-5" />
//                   ) : (
//                     <Mic className="w-5 h-5" />
//                   )}
//                 </motion.button>
//               )}
//               <motion.button
//                 type="submit"
//                 disabled={isLoading || !query.trim()}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
//                   isLoading || !query.trim()
//                     ? "bg-gray-800 text-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
//                 }`}
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   "Ask"
//                 )}
//               </motion.button>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4" style={{ marginTop: "2vh" }}>
//             <input
//               type="text"
//               value={skill}
//               onChange={(e) => setSkills(e.target.value)}
//               placeholder="Skills"
//               className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
//             />
//             <input
//               type="text"
//               value={education}
//               onChange={(e) => setEducation(e.target.value)}
//               placeholder="Educational Qualification"
//               className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
//             />
//             <input
//               type="text"
//               value={aoi}
//               onChange={(e) => setAoi(e.target.value)}
//               placeholder="Area of Interest"
//               className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
//             />
//             <input
//               type="text"
//               value={work}
//               onChange={(e) => setWork(e.target.value)}
//               placeholder="Are you woring?"
//               className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
//             />
//           </div>
//         </form>

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 flex items-start gap-2"
//             >
//               <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
//               <p>{error}</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isListening && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mb-6"
//             >
//               <div className="flex items-center">
//                 <motion.div
//                   className="mr-3 relative"
//                   animate={{ scale: [1, 1.1, 1] }}
//                   transition={{ duration: 0.8, repeat: Infinity }}
//                 >
//                   <div className="absolute inset-0 bg-cyan-400/30 rounded-full animate-ping" />
//                   <Mic className="relative text-cyan-400 w-5 h-5" />
//                 </motion.div>
//                 <div>
//                   <p className="text-cyan-400 font-medium">Listening...</p>
//                   <p className="text-sm text-cyan-400/80">
//                     {transcript || "Speak your legal question"}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {response && !isLoading && (
//           <motion.div
//             ref={responseRef}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-black/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden mb-8"
//           >
//             <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4">
//               <h3 className="font-medium text-cyan-400 flex items-center justify-between">
//                 <span>Career Options</span>
//               </h3>
//             </div>

//             <div className="p-5 text-gray-300">
//               {response.data?.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mt-6 pt-4 border-t border-cyan-500/20"
//                 >
//                   <ul className="space-y-2">
//                     {response.data.map((source, idx) => (
//                       <motion.li
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         className="text-sm bg-cyan-500/5 p-3 rounded-lg border border-cyan-500/20"
//                       >
//                         <div>
//                           <span className="font-medium text-cyan-400">
//                             Option{idx + 1}:
//                           </span>{" "}
//                           {source.career_title}
//                         </div>
//                         {source.skills_to_learn && (
//                           <div>
//                             <span className="font-medium text-cyan-400">
//                               Skills to Learn:
//                             </span>{" "}
//                             {source.skills_to_learn}
//                           </div>
//                         )}
//                         {source.description && (
//                           <div className="mt-2 text-xs bg-cyan-500/5 p-2 rounded italic text-cyan-400/80">
//                             {source.description}
//                           </div>
//                         )}
//                         <button
//                           className="px-2 py-1 mt-0.5  rounded-lg flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer"
//                           onClick={() => {
//                             setlearn(...source.skills_to_learn);
//                             handleRoadmapClick();
//                           }}
//                         >
//                           View Roadmap
//                         </button>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         )}

//         {/* History Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-black/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden"
//         >
//           <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 flex items-center gap-2">
//             <Clock className="w-4 h-4 text-cyan-400" />
//             <h3 className="font-medium text-cyan-400">Query Archives</h3>
//           </div>
//           <div className="divide-y divide-cyan-500/20 max-h-96 overflow-y-auto">
//             <div className="p-6 text-center text-cyan-400">
//               No query archives yet. Begin your career inquiries!
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default DetectiveEngine;


import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { saveAs } from "file-saver";
import { Search, Loader2, Star, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
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

        if (!skills.trim() || !education.trim() || !targetCareer.trim()) {
            setError("Please enter skills, education, and target career.");
            setLoading(false);
            return;
        }

        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBKsRgPntjqz87j_5-nd_hXqdhinoODyyc";

        const prompt = `
        You are an AI career advisor. Given a user's inputs, generate career options in **strict JSON format** as follows:

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
              "roadmap": [
                { "node_id": "1", "title": "Learn Programming", "node_type": "skill", "connections": ["2"], "sub_topics": ["Python", "Java", "C++"] },
                { "node_id": "2", "title": "Build Projects", "node_type": "experience", "connections": ["3"], "sub_topics": ["Web Development", "Machine Learning"] },
                { "node_id": "3", "title": "Apply for Jobs", "node_type": "job", "connections": [], "sub_topics": ["Google", "Microsoft", "Amazon"] }
              ]
            }
          ]
        }

        Generate career data for:
        **Skills:** ${skills}
        **Education:** ${education}
        **Desired Skills:** ${desiredSkills || "Not specified"}
        **Target Career:** ${targetCareer}
        `;

        try {
            const response = await axios.post(API_URL, {
                contents: [{ parts: [{ text: prompt }] }]
            });

            console.log("API Response:", response.data);

            let generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!generatedText) throw new Error("Invalid API response format.");

            generatedText = generatedText.replace(/```json|```/g, "").trim();

            const generatedData = JSON.parse(generatedText);
            setCareers(generatedData.career_options);

            // Save JSON File
            const blob = new Blob([JSON.stringify(generatedData, null, 2)], { type: "application/json" });
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-cyan-400">Career Path</h1>
                </motion.div>

                {/* User Input Form */}
                <form onSubmit={(e) => { e.preventDefault(); fetchCareerData(); }} className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
                            placeholder="What skills do you have?" className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none" />
                        <input type="text" value={education} onChange={(e) => setEducation(e.target.value)}
                            placeholder="Your education" className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none" />
                        <input type="text" value={desiredSkills} onChange={(e) => setDesiredSkills(e.target.value)}
                            placeholder="Skills you want to gain (Optional)" className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none" />
                        <input type="text" value={targetCareer} onChange={(e) => setTargetCareer(e.target.value)}
                            placeholder="What do you want to become?" className="p-3 bg-black/50 text-white rounded-lg border border-cyan-500/20 focus:outline-none" />
                    </div>

                    <motion.button type="submit" whileHover={{ scale: 1.1 }} className="px-4 py-2 mt-4 rounded-lg bg-cyan-600 text-white flex items-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                        {loading ? "Fetching..." : "Search"}
                    </motion.button>
                </form>

                {/* Career Cards */}
                {careers.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {careers.map((career, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.02 }} className="bg-black/50 p-6 rounded-lg border border-cyan-500/20">
                                <h3 className="text-xl font-bold text-cyan-400">{career.name}</h3>
                                <p className="text-gray-300">{career.subheading}</p>

                                <div className="mt-3 flex items-center gap-4">
                                    <Clock className="text-cyan-400 w-5 h-5" />
                                    <p className="text-gray-400">Time to Master: {career.time_to_master}</p>
                                </div>
                                <div className="mt-2 flex items-center gap-4">
                                    <AlertTriangle className="text-red-400 w-5 h-5" />
                                    <p className="text-gray-400">Work Pressure: {career.work_pressure}</p>
                                </div>

                                <div className="mt-4 flex gap-4">
                                    <ul className="text-green-400">
                                        {career.pros.map((pro, i) => <li key={i}><CheckCircle className="inline w-4 h-4 mr-2" /> {pro}</li>)}
                                    </ul>
                                    <ul className="text-red-400">
                                        {career.cons.map((con, i) => <li key={i}><XCircle className="inline w-4 h-4 mr-2" /> {con}</li>)}
                                    </ul>
                                </div>
                                <button onClick={() => handleCardClick(career)} className="mt-4 px-3 py-1 bg-cyan-600 text-white rounded-lg">View Roadmap</button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default DetectiveEngine;

