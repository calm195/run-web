/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 10:31:52
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 11:26:48
 * @FilePath: src/components/theme-controller-button.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
const ThemeControllerButton = () => {
  return (
    <>
      <label className="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input type="checkbox" value="luxury" className="toggle theme-controller" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </>
  )
}

export default ThemeControllerButton;
