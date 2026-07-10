# 🏢 مدیریت ساختمان سپهر — PWA

نرم‌افزار مدیریت ساختمان به صورت Progressive Web App (PWA)

---

## 🚀 راه‌اندازی روی GitHub Pages

### مرحله ۱ — ساخت Repository در GitHub
1. وارد [github.com](https://github.com) شوید
2. روی **New repository** کلیک کنید
3. نام را بگذارید: `sepehr-building` (یا هر نام دلخواه)
4. **Public** بگذارید
5. روی **Create repository** کلیک کنید

### مرحله ۲ — آپلود فایل‌ها
روی **uploading an existing file** کلیک کنید و این فایل‌ها را آپلود کنید:
```
📁 پروژه
├── index.html       ← فایل اصلی برنامه
├── manifest.json    ← تنظیمات PWA
├── sw.js            ← Service Worker (کش و آفلاین)
├── README.md        ← این فایل
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    └── screenshot-mobile.png
```

### مرحله ۳ — فعال‌سازی GitHub Pages
1. به **Settings** ریپازیتوری بروید
2. از منوی چپ روی **Pages** کلیک کنید
3. در بخش **Source** گزینه **Deploy from a branch** را انتخاب کنید
4. **Branch: main** و **/ (root)** را انتخاب کنید
5. روی **Save** کلیک کنید
6. چند دقیقه صبر کنید...

### مرحله ۴ — آدرس سایت
آدرس برنامه شما خواهد بود:
```
https://[نام-کاربری-github].github.io/[نام-repository]/
```
مثال: `https://alireza.github.io/sepehr-building/`

---

## 📱 نصب به عنوان App

### اندروید (Chrome)
1. آدرس سایت را در Chrome باز کنید
2. منو (⋮) → **Add to Home screen**
3. نام را تأیید کنید → **Add**
4. برنامه مثل یک اپ نصب می‌شود!

### iOS (Safari)
1. آدرس سایت را در Safari باز کنید
2. دکمه Share (🔼) را بزنید
3. **Add to Home Screen** را انتخاب کنید
4. روی **Add** کلیک کنید

---

## ✨ ویژگی‌های PWA
- ✅ **آفلاین** — بدون اینترنت هم کار می‌کند
- ✅ **نصب روی گوشی** — بدون App Store
- ✅ **سریع** — کش هوشمند
- ✅ **Push Notification** — آماده برای هشدارها
- ✅ **Responsive** — موبایل، تبلت، دسکتاپ
- ✅ **Dark Mode** — خودکار

---

## 🔒 امنیت داده‌ها
تمام اطلاعات در **LocalStorage** مرورگر ذخیره می‌شود.  
هیچ اطلاعاتی به سرور ارسال نمی‌شود.  
برای پشتیبان‌گیری از بخش **مدیریت → خروجی Backup** استفاده کنید.

---

Designed by **Alireza Rahimi**  
تمامی حقوق برای مجتمع سپهر محفوظ است
