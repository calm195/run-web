/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 10:16:57
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 10:29:58
 * @FilePath: src/app/layout.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "跑步成绩管理",
  description: "自建的跑步成绩管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ch-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
