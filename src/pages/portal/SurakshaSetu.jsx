import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  AlertTriangle,
  Shield,
  Map,
  UserCog,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import PropTypes from "prop-types";

const SurakshaSetu = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingEndpoint, setCurrentLoadingEndpoint] = useState(null);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Succeeded");

  const responseRef = useRef(null);
  const queryInputRef = useRef(null);

  const endpoints = [
    {
      id: "Succeeded",
      name: "Succeeded",
      Icon: Shield,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      id: "Intermediate",
      name: "Intermediate",
      Icon: AlertTriangle,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      id: "Switched",
      name: "Switched",
      Icon: Map,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

  // Background Elements Component
  const BackgroundEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-screen h-screen">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 top-1/3 right-1/4 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );

  useEffect(() => {
    if (queryInputRef.current) queryInputRef.current.focus();
  }, []);

  const fetchSequentialResponses = async () => {
    const GEMINI_API_KEY = "AIzaSyCILU-_ezGfu3iojbS-hFe9-Fil4klNOlo";
    setIsLoading(true);
    setError("");

    try {
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `### Enhanced Prompt for Employee Mock Data Generation

Generate mock data for **10 employees** based on the following inputs:

- **User Query:** ${query}
- **Domain:** ${domain ? domain : "Can have any domain"}
- **Experience:** ${experience ? experience : "Can have any experience"}
- **Company:** ${company ? company : "Can be from any company"}
- **Job Title:** ${jobTitle ? jobTitle : "Can have any job title"}

### **Objective:**
Instead of only connecting a user to successful individuals, also connect them to those who have failed and those who are at an intermediate level in the specified field. This will provide a more comprehensive analysis.

### **Output Format:**
Return the data in **valid JSON format** with the following structure for each employee:

json
{
  "status": "Succeeded | Intermediate | Switched",
  "employeeName": "A realistic name for the employee",
  "company": "The company provided in the input",
  "experience": "Experience in years (within the specified range)",
  "gmailId": "A valid Gmail format based on the employee's name",
  "jobTitle": "The job title provided in the input",
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
}

### **Conditions for Status Assignment:**
1. **Succeeded:** High achievers in the field with extensive experience.
2. **Intermediate:** Individuals making consistent progress but not yet at the top.
3. **Switched:** Those who attempted the field but transitioned to a different role or industry.

### **Mock Data Distribution:**
- 4 Employees with **"Succeeded"** status
- 3 Employees with **"Intermediate"** status
- 3 Employees with **"Switched"** status

### **Example Output:**
json
[
  {
    "status": "Succeeded",
    "employeeName": "John Doe",
    "company": "Google",
    "experience": "10 years",
    "gmailId": "johndoe@gmail.com",
    "jobTitle": "Software Engineer",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB", "AWS"]
  },
  {
    "status": "Intermediate",
    "employeeName": "Jane Smith",
    "company": "Amazon",
    "experience": "5 years",
    "gmailId": "janesmith@gmail.com",
    "jobTitle": "Product Manager",
    "skills": ["Agile Methodology", "User Research", "Product Roadmap", "Analytics", "Team Management"]
  },
  {
    "status": "Switched",
    "employeeName": "Mike Johnson",
    "company": "IBM",
    "experience": "3 years",
    "gmailId": "mikejohnson@gmail.com",
    "jobTitle": "Data Scientist",
    "skills": ["Python", "Machine Learning", "Data Analysis", "SQL", "TensorFlow"]
  }
]

### **Notes:**
- Ensure that the **Gmail ID** is unique and realistic.
- Skills should align with the domain and job title.
- Experience should fit within the specified range.

This approach allows for deeper analysis by learning from diverse experiences in the field.

`,
                },
              ],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const responseText =
        geminiResponse.data.candidates[0].content.parts[0].text;
      const jsonString = responseText.replace(/```json|```/g, "").trim();

      const parsedData = JSON.parse(jsonString);

      console.log(parsedData[0]);

      setResult(parsedData);
      console.log(result);
    } catch (err) {
      console.error("Error in sequential fetching:", err);
      setError("Failed to complete analysis. Please try again.");
    } finally {
      setIsLoading(false);
      setCurrentLoadingEndpoint(null);
    }
  };

  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [domain, setDomain] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchSequentialResponses(query);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundEffect />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-6xl mx-auto px-4 py-12"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <UserCog className="w-16 h-16 text-emerald-400" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {endpoints.slice(0, 3).map((endpoint) => (
              <div
                key={endpoint.id}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
                ${endpoint.bgColor} ${endpoint.color} ${endpoint.borderColor}
                shadow-lg`}
              >
                <endpoint.Icon className="w-4 h-4 mr-2" />
                {endpoint.name}
              </div>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Industry Connect
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Industry Connect: Get connected with the right professionals in your
            desired field to gain <br />
            real-world insights and expertise.
          </p>
        </motion.div>

        {/* Search Input */}
        <form onSubmit={handleFormSubmit} className="mb-8">
          <div className="relative">
            <motion.input
              ref={queryInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tell  in detail about individuals you want to connect with"
              className="w-full p-4 pl-12 pr-24 bg-black/50 backdrop-blur-xl 
                border border-emerald-500/20 rounded-xl text-white
                placeholder-gray-400 focus:outline-none focus:border-emerald-500
                focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
            <motion.button
              type="submit"
              disabled={isLoading || !query.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 
                px-4 py-2 rounded-lg flex items-center gap-2
                ${
                  isLoading || !query.trim()
                    ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-blue-600 text-white"
                }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Analyze"
              )}
            </motion.button>
          </div>
          <div className="grid grid-cols-2 gap-4" style={{ marginTop: "2vh" }}>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Experience (e.g. 2+ years)"
              className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
            />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company (e.g. Google)"
              className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
            />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Domain (e.g. Backend)"
              className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
            />
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title (e.g. Software Engineer)"
              className="p-3 bg-black/50 text-white rounded-lg border border-emerald-500/20 focus:outline-none"
            />
          </div>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 flex items-start gap-2"
            >
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response Section */}
        {result && (
          <motion.div
            ref={responseRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-xl border border-emerald-500/20 rounded-xl overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-emerald-500/20">
              {endpoints.map((endpoint) => {
                const IconComponent = endpoint.Icon;
                return (
                  <motion.button
                    key={endpoint.id}
                    onClick={() => setActiveTab(endpoint.id)}
                    whileHover={{ backgroundColor: endpoint.bgColor }}
                    className={`flex cursor-pointer items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap
                      ${
                        activeTab === endpoint.id
                          ? `${endpoint.color} border-b-2 border-current`
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {endpoint.name}
                    {currentLoadingEndpoint === endpoint.id && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{padding:4}}>
              {result
                .filter((user) => user.status === activeTab)
                .map((user, index) => (
                  <UserProfileCard key={index} user={user} />
                ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const UserProfileCard = ({ user }) => (
  <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
<h3 className="text-2xl font-semibold mb-2">{user.employeeName}</h3>
<p className="text-gray-400 text-sm mb-1">{user.company}</p>
<p className="text-gray-300 mb-1">{user.jobTitle}</p>
<p className="text-gray-400 text-sm mb-4">Experience: {user.experience} years</p>
<p className="text-gray-400 text-sm mb-4">Email: {user.gmailId}</p>
<div className="flex flex-wrap gap-2 mt-4">
  {user.skills.map((skill, index) => (
    <span
      key={index}
      className="bg-blue-600 text-xs text-white px-3 py-1 rounded-full"
    >
      {skill}
    </span>
  ))}
</div>
</div>

);

// PropTypes validation for UserProfileCard
UserProfileCard.propTypes = {
  user: PropTypes.shape({
    employeeName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    gmailId: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default SurakshaSetu;
