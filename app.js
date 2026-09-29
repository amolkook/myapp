// ========== Smooth Scrolling ==========
// تمرير سلس عند النقر على الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Form Validation & Submission ==========
// التحقق من نموذج التواصل وإرساله
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // الحصول على قيم الحقول
        const inputs = this.querySelectorAll('input, textarea');
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const message = inputs[2].value.trim();
        
        // التحقق من صحة البيانات
        if (!name || !email || !message) {
            showAlert('جميع الحقول مطلوبة!', 'error');
            return;
        }
        
        // التحقق من صيغة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('البريد الإلكتروني غير صحيح!', 'error');
            return;
        }
        
        // رسالة النجاح
        showAlert('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا 😊', 'success');
        
        // مسح النموذج
        this.reset();
    });
}

// ========== Alert Function ==========
// دالة لعرض رسائل التنبيه
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        font-size: 16px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background-color: #27ae60; color: white;' 
            : 'background-color: #e74c3c; color: white;'}
    `;
    
    document.body.appendChild(alertDiv);
    
    // إزالة الرسالة بعد 3 ثوان
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ========== Button Click Animation ==========
// تأثير عند الضغط على الأزرار
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        // إضافة تأثير الموجة
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // حذف الموجة بعد الانتهاء
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== Scroll Animation ==========
// تأثير عند التمرير للعناصر
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// مراقبة جميع بطاقات الخدمات
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ========== Navbar Active Link ==========
// تحديد الرابط النشط في الشريط العلوي
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#3498db';
            link.style.borderBottom = '2px solid #3498db';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// ========== Counter Animation ==========
// تأثير عد الأرقام (يمكنك إضافة هذا إلى الـ HTML)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ========== Dark Mode Toggle ==========
// تبديل الوضع الليلي
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// تحميل الوضع المحفوظ
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ========== Mobile Menu Toggle ==========
// قائمة الهاتف المحمول
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // تحقق من عرض الشاشة
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            `;
            
            navbar.appendChild(hamburger);
            
            hamburger.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }
}

createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// ========== Page Load Animation ==========
// تأثير عند تحميل الصفحة
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ========== Keyboard Shortcuts ==========
// اختصارات لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    // اضغط على 'h' للعودة إلى الأعلى
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ========== Console Log ==========
console.log('%cمرحباً بك في موقعي! 👋', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cتم تطويره باستخدام HTML, CSS و JavaScript', 'font-size: 14px; color: #764ba2;');
