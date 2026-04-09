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
  verification: {
    google: "PUQeeaUynOCmja3CPK12o0Fpjl-qDcdmL3mmqK91_kA",
  },
  title: "VOD作品紹介 - あなたにぴったりの作品を見つけよう",
  description: "映画・ドラマ・アニメ・ライブ・スポーツまで、幅広いジャンルの作品を紹介。通勤時間や休日の暇つぶしに最適な作品が見つかります。",
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = ['映画', 'ドラマ', 'アニメ', 'ライブ', 'スポーツ'];

  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* Header - シンプルなデザイン */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                VOD作品紹介
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {categories.map(category => (
                  <Link
                    key={category}
                    href={`/category/${category}`}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <details className="dropdown dropdown-end">
                  <summary className="btn btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52 border border-gray-200">
                    {categories.map(category => (
                      <li key={category}>
                        <Link href={`/category/${category}`} className="text-gray-700 hover:text-blue-600">
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer - シンプルなデザイン */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">VOD作品紹介</h3>
              <p className="text-gray-600">あなたにぴったりの作品を見つけよう</p>
            </div>
            <div className="flex justify-center gap-6 flex-wrap mb-6">
              {categories.map(category => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>Copyright © 2026 - All rights reserved</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
