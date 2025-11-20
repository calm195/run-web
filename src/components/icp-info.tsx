/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 12:04:27
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 14:41:08
 * @FilePath: src/components/icp-info.tsx
 * @Description: ICP 备案信息组件
 */
import React from 'react';
import Link from "next/link";

interface IcpProp {
  icpInfo?: string;
  link?: string;
}

const IcpInfo: React.FC<IcpProp> = ({icpInfo, link}) => {

  icpInfo = icpInfo || "粤ICP备2025460136号-1";
  link = link || "https://beian.miit.gov.cn/";

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="hover:text-gray-700 transition-colors duration-200"
    >
      {icpInfo}
    </Link>
  );
}

export default IcpInfo;
