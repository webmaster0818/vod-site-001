import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: "VOD作品紹介 - あなたにぴったりの作品を見つけよう",
  description: "映画・ドラマ・アニメ・ライブ・スポーツまで、幅広いジャンルの作品を紹介。通勤時間や休日の暇つぶしに最適な作品が見つかります。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = ['映画', 'ドラマ', 'アニメ', 'ライブ', 'スポーツ'];

  return (
    <html lang="ja" data-theme="business" className={notoSansJP.variable}>
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl font-bold">
                VOD作品紹介
              </Link>
            </div>
            <div className="flex-none hidden md:block">
              <ul className="menu menu-horizontal px-1">
                {categories.map(category => (
                  <li key={category}>
                    <Link href={`/category/${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-none md:hidden">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  {categories.map(category => (
                    <li key={category}>
                      <Link href={`/category/${category}`}>{category}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer footer-center p-10 bg-base-200 text-base-content">
          <div>
            <p className="font-bold text-lg">VOD作品紹介</p>
            <p>あなたにぴったりの作品を見つけよう</p>
          </div>
          <div>
            <div className="grid grid-flow-col gap-4">
              {categories.map(category => (
                <Link key={category} href={`/category/${category}`} className="link link-hover">
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p>Copyright © 2026 - All rights reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
