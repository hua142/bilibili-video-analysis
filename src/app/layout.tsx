import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B站视频数据分析平台",
  description: "B站视频数据分析平台 - 爬取并分析B站视频的浏览量、点赞量、评论等数据",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full bg-gradient-to-br from-pink-50 to-blue-50 antialiased">
        {children}
      </body>
    </html>
  );
}
