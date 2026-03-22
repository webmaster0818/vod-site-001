import { getPostById, getAllPosts } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.length > 0 ? posts.map(post => ({ id: post.id })) : [];
  } catch (error) {
    console.warn('generateStaticParams failed, returning empty array:', error);
    return [];
  }
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>/</span>
            <Link href={`/category/${post.category}`} className="hover:text-blue-600">{post.category}</Link>
            <span>/</span>
            <Link href={`/category/${post.category}/${post.genre}`} className="hover:text-blue-600">{post.genre}</Link>
            <span>/</span>
            <span className="text-gray-400 truncate">{post.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header - 参考サイトスタイル */}
        <header className="mb-8 pb-6 border-b-2 border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {post.title}
          </h1>
          
          {/* メタ情報 - シンプルに */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {post.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
              {post.genre}
            </span>
            {post.releaseYear && (
              <span>公開年: {post.releaseYear}</span>
            )}
            {post.rating && (
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{post.rating.toFixed(1)}</span>
              </span>
            )}
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Thumbnail - 控えめに */}
        {post.thumbnail && (
          <figure className="mb-8">
            <img
              src={post.thumbnail.url}
              alt={post.title}
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </figure>
        )}

        {/* VOD Services - シンプルなCTA */}
        {post.vodServices && post.vodServices.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded">
            <h3 className="font-bold text-lg text-gray-900 mb-3">この作品を視聴できるサービス</h3>
            <div className="flex gap-3 flex-wrap">
              {post.vodServices.filter(s => s.available).map(service => (
                <a
                  key={service.fieldId}
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm"
                >
                  {service.name}で視聴
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Content - 参考サイト風の読みやすいレイアウト */}
        <div className="prose prose-lg max-w-none mb-10">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8 pb-8 border-b border-gray-200">
            <span className="text-sm text-gray-600 mr-2">タグ:</span>
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* VOD Services Section - 詳細リスト */}
        {post.vodServices && post.vodServices.length > 0 && (
          <section className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">配信サービス一覧</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {post.vodServices.map(service => (
                <div
                  key={service.fieldId}
                  className={`flex justify-between items-center p-4 rounded-lg ${
                    service.available ? 'bg-white shadow-sm' : 'bg-gray-200 opacity-60'
                  }`}
                >
                  <span className="font-semibold text-gray-800">{service.name}</span>
                  {service.available ? (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-colors"
                    >
                      視聴する
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">配信なし</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ※配信状況は変更される場合があります。最新情報は各サービスでご確認ください。
            </p>
          </section>
        )}

        {/* Navigation */}
        <div className="flex gap-4 justify-center pt-8 border-t border-gray-200">
          <Link 
            href={`/category/${post.category}`} 
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors"
          >
            ← {post.category}の一覧へ
          </Link>
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            トップページへ
          </Link>
        </div>
      </div>
    </article>
  );
}
