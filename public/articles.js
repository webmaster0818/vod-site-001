// articles.json を読み込んで関連記事・人気記事を表示
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // articles.json を読み込み
        const response = await fetch('articles.json');
        const articles = await response.json();
        
        // 現在のページのURLを取得
        const currentPage = window.location.pathname.split('/').pop();
        
        // 現在のページを除外
        const otherArticles = articles.filter(article => article.url !== currentPage);
        
        // 関連記事の表示
        displayRelatedArticles(otherArticles);
        
        // 人気記事の表示
        displayPopularArticles(otherArticles);
        
    } catch (error) {
        console.error('記事データの読み込みに失敗しました:', error);
    }
});

// 関連記事を表示
function displayRelatedArticles(articles) {
    // タイトルに「Netflix」が含まれる記事を更新日順に並べ替え
    const netflixArticles = articles
        .filter(article => article.title.includes('Netflix'))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    
    const relatedContainer = document.querySelector('.related-articles-section .article-grid');
    if (!relatedContainer) return;
    
    // 既存のプレースホルダーをクリア
    relatedContainer.innerHTML = '';
    
    // 記事カードを生成
    netflixArticles.forEach(article => {
        const card = createArticleCard(article);
        relatedContainer.appendChild(card);
    });
}

// 人気記事を表示
function displayPopularArticles(articles) {
    // 更新日が新しい順に並べ替え
    const popularArticles = articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    
    const popularContainer = document.querySelector('.popular-articles-section .article-grid');
    if (!popularContainer) return;
    
    // 既存のプレースホルダーをクリア
    popularContainer.innerHTML = '';
    
    // 記事カードを生成
    popularArticles.forEach(article => {
        const card = createArticleCard(article);
        popularContainer.appendChild(card);
    });
}

// 記事カードのHTML要素を生成
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';

    // 画像があれば img、なければ絵文字プレースホルダー
    const thumbnailHtml = article.image
        ? `<img src="${article.image}" alt="${article.title}" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="placeholder-image">${article.thumbnail}</div>`;

    card.innerHTML = `
        <div class="article-thumbnail">
            ${thumbnailHtml}
        </div>
        <div class="article-content">
            <h3><a href="${article.url}">${article.title}</a></h3>
            <p class="article-excerpt">
                ${article.excerpt}
            </p>
        </div>
    `;

    return card;
}
// rebuild trigger 1776564836
