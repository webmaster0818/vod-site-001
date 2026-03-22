import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug.split('/'),
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href={`/category/${post.category}`}>{post.category}</Link></li>
          <li><Link href={`/category/${post.category}/${post.genre}`}>{post.genre}</Link></li>
          <li>{post.title}</li>
        </ul>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex gap-2 mb-4">
          <span className="badge badge-primary badge-lg">{post.category}</span>
          <span className="badge badge-outline badge-lg">{post.genre}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="rating">
            {[1, 2, 3, 4, 5].map(star => (
              <input
                key={star}
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked={Math.round(post.rating) === star}
                readOnly
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{post.rating.toFixed(1)}</span>
          <span className="text-sm text-base-content/70">
            公開年: {post.releaseYear}
          </span>
          <span className="text-sm text-base-content/70">
            投稿日: {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
          </span>
        </div>

        <p className="text-lg text-base-content/80">{post.description}</p>
      </header>

      {/* Thumbnail */}
      <figure className="mb-8">
        <img
          src={post.thumbnail || '/images/placeholder.jpg'}
          alt={post.title}
          className="w-full rounded-lg shadow-xl"
        />
      </figure>

      {/* VOD Services CTA */}
      <div className="alert alert-info mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="font-bold">この作品を今すぐ視聴</h3>
          <div className="flex gap-2 flex-wrap mt-2">
            {post.vodServices.filter(s => s.available).map(service => (
              <a
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                {service.name}で視聴
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-8">
        {post.tags.map(tag => (
          <span key={tag} className="badge badge-outline">{tag}</span>
        ))}
      </div>

      {/* VOD Services Section */}
      <section className="card bg-base-200 shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">視聴できるVODサービス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.vodServices.map(service => (
            <div
              key={service.name}
              className={`card ${service.available ? 'bg-base-100' : 'bg-base-300 opacity-50'} shadow-md p-4`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{service.name}</h3>
                {service.available ? (
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    視聴する
                  </a>
                ) : (
                  <span className="badge">配信なし</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-base-content/70 mt-4">
          ※配信状況は変更される場合があります。最新情報は各サービスでご確認ください。
        </p>
      </section>

      {/* Navigation */}
      <div className="flex gap-4 justify-center">
        <Link href={`/category/${post.category}`} className="btn btn-outline">
          {post.category}の一覧へ
        </Link>
        <Link href="/" className="btn btn-outline">
          トップページへ
        </Link>
      </div>
    </article>
  );
}
