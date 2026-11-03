// ข้อมูลเริ่มต้นสำหรับทดสอบเว็บ
const initialNews = [
    {
        id: 1,
        title: "นวัตกรรม AI เปลี่ยนโลก! เปิดตัวโมเดลใหม่ประมวลผลเร็วขึ้น 10 เท่า",
        category: "tech",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
        content: "วงการเทคโนโลยีตื่นตัวอีกครั้งหลังมีการเปิดตัวปัญญาประดิษฐ์รุ่นใหม่ที่สามารถช่วยเขียนโปรแกรม คำนวณทางการแพทย์ และช่วยงานสร้างสรรค์ได้อย่างแม่นยำยิ่งขึ้น...",
        likes: 128,
        views: 1450,
        comments: ["สุดยอดมากครับ!", "ยุคนี้พัฒนาไวมาก"],
        date: "3 พ.ย. 2026"
    },
    {
        id: 2,
        title: "สรุปผลการแข่งขันฟุตบอลลีกล่าสุด ทีมเต็งคว้าชัยเฉียดฉิว 2-1",
        category: "sports",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
        content: "เกมการแข่งขันสุดลุ้นระทึกช่วงทดเวลาบาดเจ็บ ทีมเจ้าบ้านสามารถยิงประตูชัยได้สำเร็จ ส่งผลให้คว้า 3 แต้มสำคัญขึ้นนำเป็นจ่าฝูงต่อไป...",
        likes: 45,
        views: 620,
        comments: [],
        date: "3 พ.ย. 2026"
    }
];

// รายการข่าวอัตโนมัติที่จะสุ่มเพิ่มเข้ามาใหม่เพื่อให้เว็บไม่โล่ง
const automatedDailyNews = [
    {
        title: "เทรนด์การท่องเที่ยวแบบยักษ์ใหญ่เติบโตต่อเนื่องในปีนี้",
        category: "entertainment",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
        content: "นักท่องเที่ยวหันมาให้ความสนใจกับการท่องเที่ยวเชิงอนุรักษ์และการเดินทางคนเดียวมากขึ้น สร้างเม็ดเงินหมุนเวียนในอุตสาหกรรมการท่องเที่ยวอย่างคึกคัก..."
    },
    {
        title: "ประกาศความพร้อมรับมือระลอกใหม่ของพลังงานสะอาด",
        category: "tech",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
        content: "ภาครัฐและเอกชนร่วมมือผลักดันการใช้พลังงานโซลาร์เซลล์ในครัวเรือน เพื่อลดภาระค่าใช้จ่ายด้านพลังงานและเป็นมิตรต่อสิ่งแวดล้อม..."
    },
    {
        title: "อัปเดตตลาดหุ้นและความเคลื่อนไหวเศรษฐกิจโลกประจำสัปดาห์",
        category: "politics",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        content: "นักวิเคราะห์การเงินประเมินทิศทางดอกเบี้ยและสถานการณ์การลงทุน พร้อมแนะกลยุทธ์กระจายความเสี่ยงท่ามกลางความผันผวนของตลาดโลก..."
    }
];

// โหลดข้อมูลจาก LocalStorage
let newsData = JSON.parse(localStorage.getItem('general_news_data')) || initialNews;

// --- ฟังก์ชันจำลองการอัปเดตข่าวอัตโนมัติประจำวัน ---
function checkAndAddDailyNews() {
    const lastUpdateDate = localStorage.getItem('last_auto_news_date');
    const todayStr = new Date().toLocaleDateString('th-TH');

    // ถ้าวันนี้ยังไม่เคยสุ่มเพิ่มข่าวอัตโนมัติ ให้หยิบข่าวจากคลังมาเติม 1 ข่าว
    if (lastUpdateDate !== todayStr && automatedDailyNews.length > 0) {
        const randomIndex = Math.floor(Math.random() * automatedDailyNews.length);
        const randomNewsTemplate = automatedDailyNews[randomIndex];

        const autoArticle = {
            id: Date.now(),
            title: randomNewsTemplate.title + " (อัปเดตอัตโนมัติ)",
            category: randomNewsTemplate.category,
            image: randomNewsTemplate.image,
            content: randomNewsTemplate.content,
            likes: Math.floor(Math.random() * 20) + 5,
            views: Math.floor(Math.random() * 200) + 50,
            comments: ["ระบบอัปเดตข่าวสารอัตโนมัติรายงานครับ"],
            date: todayStr
        };

        newsData.unshift(autoArticle); // นำไปไว้บนสุดของฟีด
        localStorage.setItem('general_news_data', JSON.stringify(newsData));
        localStorage.setItem('last_auto_news_date', todayStr);
    }
}

// รันฟังก์ชันตรวจสอบข่าวอัตโนมัติทันทีเมื่อเปิดเว็บ
checkAndAddDailyNews();

let currentCategory = 'all';

// --- System 1: Dark Mode Toggle ---
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// --- System 2: Render Hero Banner (ข่าวเด่น) ---
function renderHero() {
    const heroSection = document.getElementById('heroSection');
    if (newsData.length === 0) return;

    const topNews = newsData[0]; // ดึงข่าวแรกสุดเป็นข่าวเด่น
    heroSection.innerHTML = `
        <div class="hero-card">
            <img src="${topNews.image || 'https://via.placeholder.com/800x400'}" class="hero-img" alt="Hero">
            <div class="hero-overlay">
                <span class="badge-breaking"><i class="fa-solid fa-bolt"></i> BREAKING NEWS</span>
                <h2 class="hero-title">${topNews.title}</h2>
                <p style="opacity: 0.9; line-height: 1.4;">${topNews.content.substring(0, 100)}...</p>
            </div>
        </div>
    `;
}

// --- System 3: Render News Feed & Categories ---
function renderFeed() {
    const newsFeed = document.getElementById('newsFeed');
    const newsCount = document.getElementById('newsCount');
    newsFeed.innerHTML = '';

    const filtered = currentCategory === 'all' 
        ? newsData 
        : newsData.filter(item => item.category === currentCategory);

    newsCount.innerText = `${filtered.length} ข่าว`;

    if (filtered.length === 0) {
        newsFeed.innerHTML = `<p style="text-align:center; padding: 40px; color: var(--text-sub);">ยังไม่มีข่าวในหมวดหมู่นี้</p>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('article');
        card.className = 'news-item';
        card.innerHTML = `
            ${item.image ? `<img src="${item.image}" class="news-item-img" alt="ข่าว">` : ''}
            <div class="news-item-body">
                <div class="news-meta">
                    <span class="cat-badge">${item.category}</span>
                    <span>${item.date}</span>
                </div>
                <h3 class="news-item-title">${item.title}</h3>
                <p class="news-item-desc">${item.content}</p>
                
                <div class="news-footer">
                    <span><i class="fa-solid fa-eye"></i> ${item.views} รับชม</span>
                    <div class="actions">
                        <button class="action-btn" onclick="likeNews(${item.id})">
                            <i class="fa-solid fa-heart" style="color: var(--accent);"></i> ${item.likes}
                        </button>
                    </div>
                </div>

                <!-- Comment Section -->
                <div class="comments-container">
                    <div class="comment-input-area">
                        <input type="text" id="comment-input-${item.id}" placeholder="แสดงความคิดเห็น...">
                        <button class="comment-btn" onclick="addComment(${item.id})">ส่ง</button>
                    </div>
                    <div class="comment-list">
                        ${item.comments.map(c => `<div class="comment-bubble">💬 ${c}</div>`).join('')}
                    </div>
                </div>
            </div>
        `;
        newsFeed.appendChild(card);
    });
}

// --- System 4: Interactive Actions (Like & Comment) ---
function likeNews(id) {
    const target = newsData.find(item => item.id === id);
    if (target) {
        target.likes += 1;
        saveAndRefresh();
    }
}

function addComment(id) {
    const input = document.getElementById(`comment-input-${id}`);
    if (input.value.trim() !== '') {
        const target = newsData.find(item => item.id === id);
        target.comments.push(input.value.trim());
        input.value = '';
        saveAndRefresh();
    }
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderFeed();
}

// --- System 5: Post New Article ---
document.getElementById('newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newArticle = {
        id: Date.now(),
        title: document.getElementById('newsTitle').value,
        category: document.getElementById('newsCategory').value,
        image: document.getElementById('newsImage').value || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        content: document.getElementById('newsContent').value,
        likes: 0,
        views: 1,
        comments: [],
        date: new Date().toLocaleDateString('th-TH')
    };

    newsData.unshift(newArticle);
    saveAndRefresh();
    document.getElementById('newsForm').reset();
    alert('โพสต์ข่าวสารเรียบร้อย!');
});

function saveAndRefresh() {
    localStorage.setItem('general_news_data', JSON.stringify(newsData));
    renderHero();
    renderFeed();
}

// โหลดข้อมูลเมื่อเปิดเว็บครั้งแรก
renderHero();
renderFeed();