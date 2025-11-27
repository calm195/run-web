/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-18 17:59:08
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:55:41
 * @FilePath: src/components/Title.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

const Title = ({ text }: { text: string }) => {
  return (
    <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">{text}</h1>
  );
};

export default Title;
