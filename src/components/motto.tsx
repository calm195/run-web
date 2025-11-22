/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 19:33:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 15:51:59
 * @FilePath: src/components/motto.tsx
 * @Description: 句子轮播
 */

const Motto = () => {
  return (
    <span className="text-rotate mx-auto items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      <span className="justify-items-center text-center">
        <span>意志会带你冲出重围</span>
        <span>当你不想跑的时候，才是真正该跑的时候</span>
        <span>痛苦是暂时的，放弃才是永恒的</span>
        <span>跑得慢没关系，只要不停</span>
      </span>
    </span>
  );
};

export default Motto;
