/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 10:16:57
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-30 15:43:48
 * @FilePath: src/app/layout.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: '百鲤跑者协会',
  description: '一个充满活力的校园跑步社团',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ch-CN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
