/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 10:05:02
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-17 21:09:42
 * @FilePath: src/components/stat.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

const Stat = () => {
  return (
    <>
      <div className="stats shadow w-8/12 bg-base-200 mx-auto">
        <div className="stat place-items-center">
          <div className="stat-title">项目数量</div>
          <div className="stat-value">31</div>
          <div className="stat-desc">每一次奔跑都是一次飞翔</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">跑步记录数量</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 40</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">最近PB人数</div>
          <div className="stat-value">18</div>
          <div className="stat-desc">最近一个月</div>
        </div>
      </div>
    </>
  )
}

export default Stat;
