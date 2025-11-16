/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 10:31:52
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 14:11:11
 * @FilePath: src/components/theme-controller.tsx
 * @Description: 主题切换组件 - 日间模式 -> retro / 夜间模式 -> luxury
 */

import { AiOutlineSun } from "react-icons/ai";
import { AiFillMoon } from "react-icons/ai";

const ThemeController = () => {
  return (
    <>
      <label className="swap swap-rotate">
        <input type="checkbox" className="theme-controller" value="luxury" />
        <AiOutlineSun className="swap-off h-6 w-6 fill-current"/>
        <AiFillMoon className="swap-on h-6 w-6 fill-current"/>
      </label>
    </>
  )
}

export default ThemeController;
