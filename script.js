/* ==========================================
   三条洋菓子店 — SANJŌ PÂTISSERIE
   Interactive Logic (script.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 初期状態でLucideアイコンを生成
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // スクロールフェードインの初期化
  initScrollFade();
  
  // URLハッシュがある場合は初期タブを切り替える
  const hash = window.location.hash.replace('#', '');
  if (['top', 'info', 'products', 'gifts', 'access', 'contact'].includes(hash)) {
    switchTab(hash);
  } else {
    // ハッシュが無い場合（デフォルトのトップ表示）、デフォルトでactiveになっている要素にfade-inを適用する
    const defaultActive = document.querySelector('.tab-content.active');
    if (defaultActive) {
      setTimeout(() => {
        defaultActive.classList.add('fade-in');
      }, 50);
    }
  }
});

/**
 * タブ（ページ）切り替え
 * @param {string} tabId - 切り替え先のタブID ('top', 'info', 'products', 'gifts', 'access', 'contact')
 */
function switchTab(tabId) {
  // 全てのタブコンテンツを非アクティブにする（fade-inクラスもクリアする）
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => {
    content.classList.remove('active', 'fade-in');
  });

  // 対象のタブコンテンツをアクティブにする
  const activeContent = document.getElementById(`content-${tabId}`);
  if (activeContent) {
    activeContent.classList.add('active');
    // display: block が反映された後、次のフレームでフェードインクラスを追加してアニメーションを適用
    setTimeout(() => {
      activeContent.classList.add('fade-in');
    }, 20);
  }

  // デスクトップナビゲーションのアクティブスタイル更新
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    if (btn.id === `nav-btn-${tabId}`) {
      btn.classList.remove('text-[#d4b896]', 'hover:text-[#f7ede4]');
      btn.classList.add('text-[#f7ede4]');
      // 下線を表示
      const line = btn.querySelector('.active-underline');
      if (line) line.classList.remove('hidden');
    } else {
      btn.classList.remove('text-[#f7ede4]');
      btn.classList.add('text-[#d4b896]', 'hover:text-[#f7ede4]');
      // 下線を非表示
      const line = btn.querySelector('.active-underline');
      if (line) line.classList.add('hidden');
    }
  });

  // モバイルナビゲーションのアクティブスタイル更新
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
  mobileNavButtons.forEach(btn => {
    if (btn.id === `mobile-nav-btn-${tabId}`) {
      btn.classList.remove('text-[#d4b896]', 'hover:text-[#f7ede4]', 'pl-1');
      btn.classList.add('text-[#f7ede4]', 'pl-3', 'border-l-2', 'border-[#c9875a]', 'bg-[#3d2416]/40');
    } else {
      btn.classList.remove('text-[#f7ede4]', 'pl-3', 'border-l-2', 'border-[#c9875a]', 'bg-[#3d2416]/40');
      btn.classList.add('text-[#d4b896]', 'hover:text-[#f7ede4]', 'pl-1');
    }
  });

  // スマホメニューが開いている場合は閉じる
  closeMobileMenu();

  // ページ最上部へスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // URLハッシュを更新
  window.history.pushState(null, null, `#${tabId}`);
}

/**
 * モバイルメニューの開閉トグル
 */
function toggleMobileMenu() {
  const slideMenu = document.getElementById('mobile-slide-menu');
  const overlay = document.getElementById('mobile-overlay');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (slideMenu.classList.contains('translate-x-full')) {
    // メニューを開く
    slideMenu.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    openIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    // メニューを閉じる
    closeMobileMenu();
  }
}

/**
 * モバイルメニューを閉じる
 */
function closeMobileMenu() {
  const slideMenu = document.getElementById('mobile-slide-menu');
  const overlay = document.getElementById('mobile-overlay');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (slideMenu) {
    slideMenu.classList.add('translate-x-full');
  }
  if (overlay) {
    overlay.classList.add('hidden');
  }
  if (openIcon) {
    openIcon.classList.remove('hidden');
  }
  if (closeIcon) {
    closeIcon.classList.add('hidden');
  }
}

/**
 * お知らせ（アコーディオン）の開閉トグル
 * @param {string} newsId - ニュース記事の要素ID
 */
function toggleNews(newsId) {
  const content = document.getElementById(`news-content-${newsId}`);
  const arrow = document.getElementById(`news-arrow-${newsId}`);

  if (content.classList.contains('open')) {
    // 閉じる
    content.classList.remove('open');
    if (arrow) {
      arrow.style.transform = 'rotate(0deg)';
    }
  } else {
    // 開く
    content.classList.add('open');
    if (arrow) {
      arrow.style.transform = 'rotate(180deg)';
    }
  }
}

/**
 * スクロールフェードインアニメーションの初期化
 */
function initScrollFade() {
  // スクロールでフェードインさせたい要素のセレクターを定義
  const targets = [
    '#content-top .flex-col.md\\:flex-row', 
    '#content-top .flex-col.md\\:flex-row-reverse',
    '#content-top .grid > div', // 人気商品の各カード
    '#content-top table', // カレンダーのテーブル自体
    '#content-top .max-w-\\[500px\\] > div', // お知らせの各記事
    '#content-top .max-w-2xl', // アクセス
    '#content-info .max-w-xl', // 店舗情報のテーブルコンテナ
    '#content-products .grid > div', // 商品一覧の各カード
    '#content-gifts .max-w-2xl > div', // ギフトの各カード
    '#content-access .max-w-2xl > div', // アクセス方法の各カード
    '#content-contact .grid > div' // お問い合わせの連絡先カード
  ];

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px', // 画面下部から8%上がった位置で発火
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // セレクターに基づいて要素をクエリし、初期化
  targets.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.add('scroll-fade');
      observer.observe(el);
    });
  });
}
