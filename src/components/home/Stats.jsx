import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  FileText,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

const StatCard = ({ icon: Icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative group">
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div
        className="relative flex flex-col items-center p-6 rounded-lg 
        bg-gray-900/50 border border-gray-800 hover:border-cyan-500/20 
        backdrop-blur-sm transition-all duration-300">
        <div className="p-3 rounded-full bg-cyan-500/10 mb-4">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <motion.span
          className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 
            bg-clip-text text-transparent mb-2"
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}>
          {value}
        </motion.span>
        <span className="text-gray-400 text-center">{label}</span>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const stats = [
    {
      icon: Shield,
      value: "99.9%",
      label: "System Accuracy",
      delay: 0.1,
    },
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      delay: 0.2,
    },
    {
      icon: FileText,
      value: "1M+",
      label: "Documents Processed",
      delay: 0.3,
    },
    {
      icon: CheckCircle,
      value: "95%",
      label: "Case Success Rate",
      delay: 0.4,
    },
    {
      icon: Clock,
      value: "24/7",
      label: "System Availability",
      delay: 0.5,
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "User Satisfaction",
      delay: 0.6,
    },
  ];

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Impact in Numbers
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Measurable results that demonstrate our commitment to excellence
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 max-w-3xl mx-auto">
          <p className="text-gray-400">
            Our statistics are continuously updated to reflect real-time system
            performance and user satisfaction metrics across all Udaan AI
            platforms and services.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
