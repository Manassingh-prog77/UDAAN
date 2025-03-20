import { useEffect } from "react";
import * as ReactFlowModule from "@xyflow/react";
const { ReactFlow, useNodesState, useEdgesState, Background, Controls } =
  ReactFlowModule;
import "@xyflow/react/dist/style.css";
import "./roadmap.css";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const CareerFlowchart = () => {
  const location = useLocation();
  const roadmaprecive = location.state?.roadmap || [];
  console.log(roadmaprecive);
 
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const roadmap = roadmaprecive || [];
    let newNodes = [];
    let newEdges = [];

    roadmap.forEach((node, index) => {
      // Main Node
      newNodes.push({
        id: node.title,
        position: { x: index * 300, y: index * 150 },
        data: { label: <NodeBox title={node.title} type={node.node_type} /> },
        type: node.node_type,
      });

      // Sub-topic Nodes
      if (node.sub_topics && node.sub_topics.length > 0) {
        node.sub_topics.forEach((subTopic, subIndex) => {
          const subNodeId = `${node.title}-sub${subIndex}`;
          newNodes.push({
            id: subNodeId,
            position: {
              x: index * 300 + (subIndex + 1) * 80,
              y: index * 150 + 100,
            },
            data: { label: <SubTopicBox title={subTopic} /> },
            type: "sub_topics",
          });

          // Link sub-topic to parent node
          newEdges.push({
            id: `${node.title}-${subNodeId}`,
            source: node.title,
            target: subNodeId,
            animated: true,
          });
        });
      }

      // Connections between main nodes
      if (index < roadmap.length - 1) {
        const nextNode = roadmap[index + 1];
        newEdges.push({
          id: `${node.title}-${nextNode.title}`,
          source: node.title,
          target: nextNode.title,
          animated: true,
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [roadmaprecive, setNodes, setEdges]);

  const aiPowered = async (currentSkill, skilltolearn) => {
    const GEMINI_API_KEY = "AIzaSyCILU-_ezGfu3iojbS-hFe9-Fil4klNOlo";

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Given the user's current skills: ${currentskill} and skills they want to learn: ${skilltolearn}, create a personalized career roadmap with the following details: career name, roadmap with nodes for skills, experiences, and jobs (each node should include a title, node type, connections, and relevant sub-topics), pros and cons, market scope, salary range, reviews, time to master, and work pressure. The roadmap should be tailored to the user's desired career path and should consider the skills they have and the skills they wish to learn.Give response in valid JSON format`,
              },
            ],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const responseText =
      geminiResponse.data.candidates[0].content.parts[0].text;
    const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
    try {
      const parsedResponse = JSON.parse(cleanedResponse);
      console.log(parsedResponse);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const handle = () => {
    console.log(currentskill);
    console.log(skilltolearn);
    aiPowered(currentskill, skilltolearn);
  };

  return (
    <div className="flowchart-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2 className="flowchart-title" style={{ color: "white" }}>
          {roadmaprecive.name} Career Roadmap (Under Development)
        </h2>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
          onClick={handle}
          disabled={true}
        >
          View Market Trends
        </button>
      </div>
      <div className="flowchart-box">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Background variant="dots" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

// **Main Node Box**
import PropTypes from "prop-types";

const NodeBox = ({ title, type }) => {
  return (
    <div className={`node-box ${type}`}>
      <strong>{title}</strong>
    </div>
  );
};

NodeBox.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

// **Sub-Topic Box**
const SubTopicBox = ({ title }) => {
  return <div className="sub-box">{title}</div>;
};

SubTopicBox.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CareerFlowchart;
 