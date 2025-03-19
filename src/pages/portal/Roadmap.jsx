 

// import { useEffect } from "react";
// import * as ReactFlowModule from "@xyflow/react";
// const { ReactFlow, useNodesState, useEdgesState, Background, Controls } = ReactFlowModule;
// import "@xyflow/react/dist/style.css";
// import "./roadmap.css";  
// import { useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios"
// const CareerFlowchart = () => {
//      const location = useLocation();
//      const { currentskill, skilltolearn } = location.state;
//      console.log(currentskill)
//     const selectedCareer = useMemo(() => ({
//       "careerName": "Full-Stack React Developer",
//       "roadmap": [
//           {
//               "title": "React Fundamentals Mastery",
//               "nodeType": "Skill",
//               "connections": [
//                   "Next.js Fundamentals",
//                   "React Native Fundamentals",
//                   "Junior Front-End Developer Role"
//               ],
//               "subTopics": [
//                   "JSX, Components, Props, State, Hooks, Context API, Redux, Testing (Jest, React Testing Library), Routing (React Router)"
//               ],
//               "timeToMaster": "3-6 months"
//           },
//           {
//               "title": "Next.js Fundamentals",
//               "nodeType": "Skill",
//               "connections": [
//                   "React Fundamentals Mastery",
//                   "Next.js Advanced",
//                   "Full-Stack Developer Role"
//               ],
//               "subTopics": [
//                   "API Routes, Data Fetching, Static Site Generation (SSG), Server-Side Rendering (SSR), File-based Routing, Deployment (Vercel, Netlify)"
//               ],
//               "timeToMaster": "2-4 months"
//           },
//           {
//               "title": "Next.js Advanced",
//               "nodeType": "Skill",
//               "connections": [
//                   "Next.js Fundamentals",
//                   "Full-Stack Developer Role",
//                   "Senior Full-Stack Developer Role"
//               ],
//               "subTopics": [
//                   "Middleware, Incremental Static Regeneration (ISR), API Routes with Authentication, Advanced Routing, Optimization Techniques, Deployment Strategies"
//               ],
//               "timeToMaster": "3-6 months"
//           },
//           {
//               "title": "React Native Fundamentals",
//               "nodeType": "Skill",
//               "connections": [
//                   "React Fundamentals Mastery",
//                   "React Native Advanced",
//                   "Mobile App Developer Role"
//               ],
//               "subTopics": [
//                   "Components, Navigation, State Management, API Integration, UI/UX Design for Mobile, Platform-Specific Code"
//               ],
//               "timeToMaster": "2-4 months"
//           },
//           {
//               "title": "React Native Advanced",
//               "nodeType": "Skill",
//               "connections": [
//                   "React Native Fundamentals",
//                   "Mobile App Developer Role",
//                   "Senior Mobile App Developer Role"
//               ],
//               "subTopics": [
//                   "Navigation Libraries (React Navigation), Advanced State Management (Redux, Context API), Testing (Jest, Detox), Performance Optimization, Third-Party Libraries"
//               ],
//               "timeToMaster": "3-6 months"
//           },
//           {
//               "title": "Junior Front-End Developer Role",
//               "nodeType": "Experience",
//               "connections": [
//                   "React Fundamentals Mastery",
//                   "Next.js Fundamentals",
//                   "Portfolio Development"
//               ],
//               "subTopics": [
//                   "Building small-scale web apps using React, Contributing to open source projects"
//               ],
//               "timeToMaster": "6-12 months"
//           },
//           {
//               "title": "Full-Stack Developer Role",
//               "nodeType": "Experience",
//               "connections": [
//                   "Next.js Fundamentals",
//                   "Next.js Advanced",
//                   "Backend Technologies (Node.js, Express, Databases)",
//                   "Portfolio Development"
//               ],
//               "subTopics": [
//                   "Developing and deploying full-stack web applications, working with APIs, databases, and version control"
//               ],
//               "timeToMaster": "12-18 months"
//           },
//           {
//               "title": "Mobile App Developer Role",
//               "nodeType": "Experience",
//               "connections": [
//                   "React Native Fundamentals",
//                   "React Native Advanced",
//                   "Portfolio Development"
//               ],
//               "subTopics": [
//                   "Developing and deploying mobile applications for iOS and Android, working with APIs and mobile-specific functionalities"
//               ],
//               "timeToMaster": "12-18 months"
//           },
//           {
//               "title": "Senior Full-Stack Developer Role",
//               "nodeType": "Experience",
//               "connections": [
//                   "Next.js Advanced",
//                   "Full-Stack Developer Role",
//                   "Leadership Skills"
//               ],
//               "subTopics": [
//                   "Leading development teams, mentoring junior developers, architecting large-scale applications"
//               ],
//               "timeToMaster": "24+ months"
//           },
//           {
//               "title": "Senior Mobile App Developer Role",
//               "nodeType": "Experience",
//               "connections": [
//                   "React Native Advanced",
//                   "Mobile App Developer Role",
//                   "Leadership Skills"
//               ],
//               "subTopics": [
//                   "Leading development teams, mentoring junior developers, architecting complex mobile applications"
//               ],
//               "timeToMaster": "24+ months"
//           },
//           {
//               "title": "Portfolio Development",
//               "nodeType": "Experience",
//               "connections": [
//                   "Junior Front-End Developer Role",
//                   "Full-Stack Developer Role",
//                   "Mobile App Developer Role"
//               ],
//               "subTopics": [
//                   "Creating a portfolio showcasing skills and projects, building personal projects to demonstrate expertise"
//               ],
//               "timeToMaster": "Ongoing"
//           }
//       ],
//       "pros": [
//           "High demand, good salary potential, diverse job opportunities, constant learning"
//       ],
//       "cons": [
//           "Fast-paced environment, constant learning curve, potential for burnout"
//       ],
//       "marketScope": "High demand for full-stack and mobile developers with React expertise.",
//       "salaryRange": {
//           "junior": "$60,000 - $90,000",
//           "midLevel": "$90,000 - $150,000",
//           "senior": "$150,000+"
//       },
//       "reviews": "Generally positive, with many developers enjoying the creativity and challenges of the field.",
//       "workPressure": "Medium to high, depending on the company and project."
//   }), []);
      
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//     useEffect(() => {
//       const roadmap = selectedCareer.roadmap || [];
//       let newNodes = [];
//       let newEdges = [];
  
//       roadmap.forEach((node, index) => {
//         // Main Node
//         newNodes.push({
//           id: node.title,
//           position: { x: index * 300, y: index * 150 },
//           data: { label: <NodeBox title={node.title} type={node.nodeType} /> },
//           type: node.nodeType,
//         });
  
//         // Sub-topic Nodes
//         if (node.subTopics && node.subTopics.length > 0) {
//           node.subTopics.forEach((subTopic, subIndex) => {
//             const subNodeId = `${node.title}-sub${subIndex}`;
//             newNodes.push({
//               id: subNodeId,
//               position: { x: index * 300 + (subIndex + 1) * 80, y: index * 150 + 100 },
//               data: { label: <SubTopicBox title={subTopic} /> },
//               type: "sub_topic",
//             });
  
//             // Link sub-topic to parent node
//             newEdges.push({
//               id: `${node.title}-${subNodeId}`,
//               source: node.title,
//               target: subNodeId,
//               animated: true,
//             });
//           });
//         }
  
//         // Connections between main nodes
//         if (index < roadmap.length - 1) {
//           const nextNode = roadmap[index + 1];
//           newEdges.push({
//             id: `${node.title}-${nextNode.title}`,
//             source: node.title,
//             target: nextNode.title,
//             animated: true,
//           });
//         }
//       });
  
//       setNodes(newNodes);
//       setEdges(newEdges);
//     }, [selectedCareer, setNodes, setEdges]);

//     const aiPowered = async (currentSkill,skilltolearn) => {
//       const GEMINI_API_KEY = "AIzaSyCILU-_ezGfu3iojbS-hFe9-Fil4klNOlo";
      
//       const geminiResponse = await axios.post(
//         `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   text: `Given the user's current skills: ${currentskill} and skills they want to learn: ${skilltolearn}, create a personalized career roadmap with the following details: career name, roadmap with nodes for skills, experiences, and jobs (each node should include a title, node type, connections, and relevant sub-topics), pros and cons, market scope, salary range, reviews, time to master, and work pressure. The roadmap should be tailored to the user's desired career path and should consider the skills they have and the skills they wish to learn.Give response in valid JSON format`
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           headers: { "Content-Type": "application/json" }
//         }
//       );
    
//       const responseText = geminiResponse.data.candidates[0].content.parts[0].text;
//       const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
//       try {
//         const parsedResponse = JSON.parse(cleanedResponse);
//         console.log(parsedResponse); 
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//       }
//     }
    

//     const handle =()=>{
//       console.log(currentskill)
//       console.log(skilltolearn)
//       aiPowered(currentskill,skilltolearn);
//     }

//     return (
//         <div className="flowchart-container">
//             <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
//             <h2 className="flowchart-title" style={{color:"white"}}>{selectedCareer.name} Career Roadmap (Under Development)</h2>
//             <button className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white" onClick={handle} disabled={true}>View Market Trends</button>
//             </div>
//             <div className="flowchart-box">
//                 <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
//                     <Background variant="dots" />
//                     <Controls />
//                 </ReactFlow>
//             </div>
//         </div>
//     );
// };

// // **Main Node Box**
// import PropTypes from 'prop-types';

// const NodeBox = ({ title, type }) => {
//     return (
//         <div className={`node-box ${type}`}>
//             <strong>{title}</strong>
//         </div>
//     );
// };

// NodeBox.propTypes = {
//     title: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
// };

// // **Sub-Topic Box**
// const SubTopicBox = ({ title }) => {
//     return <div className="sub-box">{title}</div>;
// };

// SubTopicBox.propTypes = {
//     title: PropTypes.string.isRequired,
// };

// export default CareerFlowchart;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as ReactFlowModule from "@xyflow/react";

const { ReactFlow, useNodesState, useEdgesState, Background, Controls } = ReactFlowModule;
import "@xyflow/react/dist/style.css";
import axios from "axios";

// **Define Node Types with Tailwind Styling**
const nodeTypes = {
    skill: ({ data }) => (
        <div className="p-3 bg-blue-500 text-white rounded-lg shadow-lg text-center border border-white">
            <strong>{data.label}</strong>
        </div>
    ),
    experience: ({ data }) => (
        <div className="p-3 bg-green-500 text-white rounded-lg shadow-lg text-center border border-white">
            <strong>{data.label}</strong>
        </div>
    ),
    job: ({ data }) => (
        <div className="p-3 bg-purple-500 text-white rounded-lg shadow-lg text-center border border-white">
            <strong>{data.label}</strong>
        </div>
    ),
    sub_topic: ({ data }) => (
        <div className="p-2 text-xs bg-yellow-300 text-black rounded-lg shadow-md text-center">
            {data.label}
        </div>
    ),
};

const CareerFlowchart = () => {
    const location = useLocation();
    const { roadmap } = location.state || {};
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (!roadmap) return;

        let newNodes = [];
        let newEdges = [];

        roadmap.forEach((node, index) => {
            // **Main Nodes (Skills, Experience, Jobs)**
            newNodes.push({
                id: node.node_id.toString(),
                position: { x: index * 250, y: index * 120 },
                data: { label: node.title },
                type: node.node_type,
            });

            // **Sub-topic Nodes**
            if (node.sub_topics && node.sub_topics.length > 0) {
                node.sub_topics.forEach((subTopic, subIndex) => {
                    const subNodeId = `${node.node_id}-sub${subIndex}`;
                    newNodes.push({
                        id: subNodeId,
                        position: { x: index * 250 + (subIndex + 1) * 100, y: index * 120 + 100 },
                        data: { label: subTopic },
                        type: "sub_topic",
                    });

                    // **Connect Sub-topic to Parent Node**
                    newEdges.push({
                        id: `${node.node_id}-${subNodeId}`,
                        source: node.node_id.toString(),
                        target: subNodeId,
                        animated: true,
                        style: { strokeWidth: 13, stroke: "#00FFFF" }, // **Fix visibility**
                        type: "smoothstep",
                    });
                });
            }

            // **Connect Main Nodes (Skill → Experience → Job)**
            node.connections.forEach((targetId) => {
                newEdges.push({
                    id: `${node.node_id}-${targetId}`,
                    source: node.node_id.toString(),
                    target: targetId.toString(),
                    animated: true,
                    style: { strokeWidth: 13, stroke: "#00FFFF" }, // **Increase visibility**
                    type: "smoothstep",
                });
            });
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [roadmap]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Career Roadmap</h2>
            <div className="relative border-2 border-cyan-500 p-4 rounded-lg shadow-lg h-[600px]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Background variant="dots" />
                    
                </ReactFlow>
            </div>
        </div>
    );
};

export default CareerFlowchart;
