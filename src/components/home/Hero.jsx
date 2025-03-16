import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  HeartHandshake,
  TrendingUp,
  BookOpenCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated gradient orbs */}
    <div className="absolute w-screen h-screen">
      <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute w-96 h-96 top-1/3 right-1/4 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    {/* Grid overlay */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
      }}></div>
  </div>
);

const GlowingBadge = ({ icon: Icon, text, color }) => (
  <div
    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
    bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 
    shadow-lg shadow-${color}-500/10 hover:bg-${color}-500/20 transition-all duration-300`}>
    <Icon className="w-4 h-4 mr-2" />
    {text}
  </div>
);

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Your Personalized Career Companion";
  const navigate = useNavigate();

  const buttons = [
    {
      text: "Launch System",
      onClick: () => navigate("/dashboard"),
      className:
        "bg-gradient-to-r from-cyan-600 to-violet-800 hover:shadow-md hover:shadow-cyan-500/30",
      icon: (
        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
      ),
    },
    {
      text: "Watch Demo",
      onClick: () => navigate("/dashboard"),
      className:
        "bg-gray-900 border border-cyan-500/30 hover:bg-gray-800 hover:border-cyan-500/50",
      icon: <PlayCircle className="ml-2 w-5 h-5 text-cyan-400" />,
    },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black text-white font-sans overflow-hidden">
      <BackgroundEffect />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo & Icon */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center mb-6">
            <GraduationCap className="w-16 h-16 text-cyan-400" />
          </motion.div>

          {/* Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8">
            <GlowingBadge icon={HeartHandshake} text="Assured" color="cyan" />
            <GlowingBadge icon={TrendingUp} text="Insights" color="cyan" />
            <GlowingBadge
              icon={BookOpenCheck}
              text="Discovery"
              color="cyan"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
            Navigate Your Path to Success
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div variants={itemVariants} className="h-8 mb-8">
            <span className="text-xl text-cyan-400 font-mono">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay Ahead in Your Career with AI Powered Smart Guidance
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-12">
            {buttons.map(({ text, onClick, className, icon }, index) => (
              <motion.button
                key={index}
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group px-8 py-4 cursor-pointer rounded-xl transition-all duration-300 flex items-center justify-center font-medium text-white ${className}`}>
                <span>{text}</span>
                {icon}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Hero;
