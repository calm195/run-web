/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 19:28:13
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 09:05:04
 * @FilePath: src/components/greeting.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import { motion } from 'framer-motion';
import { FaRunning, FaHeart, FaUsers, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { GiFinishLine, GiPodium, GiSprint } from 'react-icons/gi';
import { IoMdTimer } from 'react-icons/io';
import { SiRunkeeper } from 'react-icons/si';
import Title from "@/components/title";

const Greeting = () => {
  const features = [
    {
      icon: <FaRunning className="text-3xl text-blue-500" />,
      title: "专业训练",
      description: "科学的训练计划 📋",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      title: "健康生活",
      description: "倡导健康生活方式 💪",
      color: "from-red-400 to-pink-400"
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      title: "团队友谊",
      description: "结识志同道合的朋友 🤝",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <FaTrophy className="text-3xl text-yellow-500" />,
      title: "竞赛机会",
      description: "参加各类跑步赛事 🏆",
      color: "from-yellow-400 to-orange-400"
    }
  ];

  const stats = [
    { number: "200+", label: "活跃成员", icon: <FaUsers className="text-2xl" /> },
    { number: "50+", label: "周训练", icon: <IoMdTimer className="text-2xl" /> },
    { number: "15+", label: "赛事参与", icon: <GiPodium className="text-2xl" /> },
    { number: "1", label: "年历史", icon: <FaCalendarAlt className="text-2xl" /> }
  ];

  return (
    <div className="min-h-screen p-4">
      {/* 主标题区域 */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center text-2xl md:text-5xl font-bold my-8"
      >
        <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
          🏃‍♂️ 欢迎来到百鲤跑者协会 🏃‍♀️
        </div>
      </motion.div>

      {/* 跑步小人SVG动画 */}
      <div className="flex justify-center mb-8">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl"
        >
          🏃‍♂️
        </motion.div>
      </div>

      {/* 社团介绍 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <Title text="🌟 关于我们 🌟" />
          <p className="text-lg  text-center leading-relaxed mb-6">
            华工百鲤跑团成立于2025年，是一个充满活力的校园跑步社团 🏃‍♂️
            我们致力于推广健康跑步文化，为热爱运动的同学提供交流平台。
            无论你是跑步新手还是资深跑者，这里都有你的一席之地！
          </p>

          {/* 动态跑步图标 */}
          <div className="flex justify-center space-x-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <GiSprint className="text-4xl text-blue-500" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <GiFinishLine className="text-4xl text-green-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <SiRunkeeper className="text-4xl text-purple-500" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 特色功能卡片 */}
      <div className="max-w-6xl mx-auto mb-12">
        <Title text="🎯 我们的理念 🎯" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r rounded-full flex items-center justify-center mb-4 mx-auto`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-center mb-2">
                {feature.title}
              </h4>
              <p className="text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 数据统计 */}
      <div className="max-w-4xl mx-auto mb-12">
        <Title text="📊 社团数据 📊" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r rounded-xl p-6 text-center shadow-lg"
            >
              <div className="text-2xl mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Greeting;
