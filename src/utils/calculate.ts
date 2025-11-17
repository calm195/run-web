/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 19:10:02
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-17 21:46:00
 * @FilePath: src/utils/calculate.ts
 * @Description: 计算工具函数
 */

export const generateExampleData = (count: number = 14) => {
  const names = [
    "李白", "杜甫", "苏轼", "辛弃疾", "李清照", "王维", "孟浩然",
    "白居易", "杜牧", "李商隐", "韩愈", "柳宗元", "欧阳修", "王安石",
    "三毛", "鲁迅", "老舍", "巴金", "茅盾", "沈从文", "张爱玲", "钱钟书",
    "冰心", "丁玲", "萧红", "徐志摩", "闻一多", "郭沫若", "艾青"
  ];

  const achievements = [
    "文学巨匠", "诗词圣手", "文章大家", "文坛泰斗", "诗仙",
    "诗圣", "词圣", "豪放派宗师", "婉约派代表", "山水诗人", "田园诗人",
    "现实主义大师", "浪漫主义诗人", "新文学奠基人", "人民艺术家", "语言大师",
    "小说巨匠", "散文家", "剧作家", "翻译家", "文学评论家", "现代文学之父"
  ];

  const descriptions = [
    "作品传世", "影响深远", "文采斐然", "才华横溢", "学富五车",
    "博古通今", "出口成章", "下笔成文", "文思敏捷", "才高八斗", "学贯中西",
    "著作等身", "桃李满天下", "德高望重", "名垂青史", "流芳百世", "千古流芳"
  ];

  const statsData: StatData[] = [];

  for (let i = 0; i < count; i++) {
    const nameIndex = i % names.length;
    const achievementIndex = (i + Math.floor(i / names.length)) % achievements.length;
    const descriptionIndex = (i + Math.floor(i / achievements.length)) % descriptions.length;

    statsData.push({
      title: names[nameIndex],
      value: achievements[achievementIndex],
      description: descriptions[descriptionIndex]
    });
  }

  return statsData;
};
