# E-Commerce Web Application

Welcome to the E-Commerce web application! 🚀  
A full-featured online store built for modern shopping experiences—powered by the speed and structure of NestJS.

## 🌐 API Live Demo

Check out the deployed project: [e-commerce-3la-allah.vercel.app](https://e-commerce-3la-allah.vercel.app/)

## 📝 API Documentation

Explore the backend API endpoints: [DogAPI Documentation](https://jmu8wtf3rh.apidog.io)

## 📦 Features

- 🛒 **Product Catalog:** Browse products by category with detailed descriptions and images.
- 🔍 **Search & Filter:** Find products quickly using search and advanced filters.
- 👤 **User Authentication:** Secure login & registration.
- 🛍️ **Shopping Cart:** Add, edit, or remove products and view your cart at any time.
- 💳 **Checkout:** Seamless purchasing experience.
- 📦 **Order Management:** Track your orders and view order history.
- ⭐ **Product Ratings:** Rate and review products.

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** [NestJS](https://nestjs.com/) (Node.js framework)
- **API:** [DogAPI](https://jmu8wtf3rh.apidog.io)
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT, Passport.js, bcrypt
- **Logging:** Winston, Morgan, nest-winston
- **Deployment:** Vercel (Serverless-ready via @vendia/serverless-express and @vercel/node)
- **Testing:** Jest, Supertest
- **Linting & Formatting:** ESLint, Prettier
- **Config Management:** dotenv, @nestjs/config

## 🚀 Why NestJS?

This project is built with **NestJS**—a progressive Node.js framework that’s blazing fast, modular, and highly maintainable.

- **Speed & Performance:** NestJS is engineered for lightning-fast response times and efficient resource management. Its robust dependency injection and modular architecture help you scale features quickly and reliably.
- **Enterprise-Ready:** Out-of-the-box TypeScript support, powerful CLI tools, and seamless integration with testing and logging libraries make NestJS perfect for large-scale applications.
- **Developer Experience:** The structure and conventions of NestJS help you write clean, testable code fast. The community and ecosystem are growing rapidly, offering tons of resources and plugins.
- **Serverless Support:** Easily deployable to serverless environments like Vercel, thanks to official integrations.

## 📁 Project Structure

This project follows best practices for scalable NestJS applications with scripts for development, testing, linting, and deployment.  
Key dependencies and scripts can be found in [package.json](./package.json).

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eslambashry/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file and set necessary configuration (API keys, database URL, etc.).

4. **Run the project locally (development):**
   ```bash
   npm run start:dev
   ```

5. **Access the app:**  
   Open [http://localhost:8080](http://localhost:8080) in your browser.

## 📄 API Reference

Full API documentation: [DogAPI Docs](https://jmu8wtf3rh.apidog.io)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📧 Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/eslambashry/e-commerce/issues).

---

Made with ❤️ and the power of [NestJS](https://nestjs.com/) by [eslambashry](https://github.com/eslambashry)




<!-- بالتأكيد! بناءً على المشروع الذي قمنا ببنائه معاً (`Expanders360`)، سأقوم بتحديث ملف `README.md` بالكامل ليعكس بدقة أهداف المشروع، التقنيات المستخدمة، والهيكلية التي اتبعناها.

لقد قمت بتغيير اسم المشروع من "E-Commerce" إلى "Expanders360 API" ليتناسب مع السياق، وأضفت تفاصيل حول قواعد البيانات المزدوجة (MySQL و MongoDB)، ومنطق التوفيق، والتحليلات، وغيرها من المتطلبات الأساسية.

---

### نسخة محدثة ومحسّنة من ملف `README.md`

```markdown
# Expanders360 - Global Expansion Management API

مرحباً بك في الواجهة البرمجية (API) لمشروع **Expanders360**! 🚀  
هذا المشروع هو نظام خلفي (Backend) قوي ومصمم لمساعدة الشركات على إدارة مشاريع التوسع في بلدان جديدة، حيث يربط بين البيانات المنظمة (العملاء، المشاريع، الموردين) والبيانات غير المنظمة (مستندات الأبحاث والتقارير).

## 🌐 API Live Demo

جرّب النسخة المنشورة من المشروع هنا: [رابط النشر الخاص بك على Vercel أو Railway]

## 📝 API Documentation

استكشف جميع نقاط النهاية (Endpoints) الخاصة بالواجهة البرمجية من خلال التوثيق التفاعلي: [رابط التوثيق الخاص بك على ApiDog أو Postman]

## 📦 الميزات الرئيسية (Features)

-   🔐 **مصادقة وأدوار (Auth & Roles):** نظام تسجيل دخول آمن باستخدام JWT مع تحديد صلاحيات للمستخدمين (عميل `client`، مدير `admin`).
-   🗃️ **إدارة بيانات مزدوجة:**
    -   **MySQL (TypeORM):** لإدارة البيانات المنظمة مثل العملاء، المشاريع، والموردين.
    -   **MongoDB (Mongoose):** لتخزين وإدارة المستندات غير المنظمة مثل تقارير السوق والعقود.
-   🤝 **محرك توفيق ذكي (Project-Vendor Matching):** نقطة نهاية (Endpoint) تقوم بتحليل المشاريع وإيجاد أفضل الموردين بناءً على قواعد محددة (البلد، الخدمات، التقييم).
-   📄 **إدارة المستندات:** رفع والبحث في مستندات الأبحاث المرتبطة بكل مشروع.
-   📊 **تحليلات متقدمة:** نقطة نهاية تجمع بيانات من MySQL و MongoDB معاً لعرض رؤى شاملة (مثل أفضل الموردين في كل بلد مع عدد مستندات الأبحاث المرتبطة بهم).
-   ⏰ **مهام مجدولة (Scheduled Jobs):** نظام يعمل تلقائياً لتحديث التوافقات للمشاريع النشطة بشكل دوري.
-   📧 **نظام إشعارات:** إرسال تنبيهات عبر البريد الإلكتروني عند إنشاء توافقات جديدة.

## 🛠️ التقنيات المستخدمة (Tech Stack)

-   **الإطار (Framework):** [NestJS](https://nestjs.com/) (إطار عمل Node.js)
-   **اللغة:** TypeScript
-   **قواعد البيانات:**
    -   **MySQL** (للبيانات العلائقية) مع **TypeORM**.
    -   **MongoDB** (للبيانات غير المنظمة) مع **Mongoose**.
-   **المصادقة:** JWT (JSON Web Tokens), Passport.js, bcrypt.
-   **التحقق من البيانات (Validation):** `class-validator`, `class-transformer`.
-   **المهام المجدولة:** `nestjs/schedule`.
-   **إدارة الإعدادات:** `nestjs/config`, `dotenv`.
-   **النشر (Deployment):** Vercel / Railway (جاهز للبيئات السحابية).
-   **التغليف (Containerization):** Docker, docker-compose.

## 🚀 لماذا NestJS؟

تم بناء هذا المشروع باستخدام **NestJS** لأنه يوفر بنية قوية وقابلة للتوسع، مما يجعله مثالياً للتطبيقات المعقدة.

-   **بنية معيارية (Modularity):** يسمح بتقسيم التطبيق إلى وحدات منفصلة (مثل Projects, Vendors, Auth)، مما يسهل الصيانة والتطوير.
-   **حقن التبعيات (Dependency Injection):** نظام مدمج وقوي يبسط إدارة الخدمات والـ Repositories.
-   **دعم TypeScript:** يوفر أماناً للكود ويقلل من الأخطاء في وقت التشغيل.
-   **بيئة متكاملة:** يوفر أدوات وحزم رسمية لكل شيء تقريباً (مثل TypeORM, Mongoose, Config, Scheduling)، مما يضمن التوافق والاستقرار.

## 📁 هيكل المشروع

يتبع هذا المشروع أفضل الممارسات في تنظيم تطبيقات NestJS، مع تقسيم واضح للمسؤوليات بين الـ Modules, Controllers, Services, و Entities.

## 🚀 البدء محلياً (Getting Started)

1.  **استنسخ المستودع:**
    ```bash
    git clone https://github.com/eslambashry/e-commerce.git
    cd e-commerce
    ```

2.  **ثبّت الاعتماديات:**
    ```bash
    npm install
    ```

3.  **إعداد متغيرات البيئة:**
    -   **للتطوير المحلي (مع Docker):**
        -   انسخ `env.example` إلى ملف جديد باسم `.env`.
        -   شغّل قواعد البيانات باستخدام Docker: `docker-compose up -d`.
    -   **للتطوير مع قاعدة بيانات سحابية:**
        -   أنشئ ملف `.env`.
        -   أضف متغيرات الاتصال بقواعد البيانات (MySQL و MongoDB) من مزود الخدمة السحابية (مثل Railway).

4.  **شغّل المشروع في وضع التطوير:**
    ```bash
    npm run start:dev
    ```

5.  **الوصول للتطبيق:**
    افتح [http://localhost:8080](http://localhost:8080) (أو المنفذ الذي حددته) في متصفحك أو استخدم Postman.

## 🤝 المساهمة

نرحب بالمساهمات! للمساهمات الكبيرة، يرجى فتح "Issue" أولاً لمناقشة التغييرات المقترحة.

## 📧 تواصل

للأسئلة أو الملاحظات، يمكنك التواصل عبر [GitHub Issues](https://github.com/eslambashry/e-commerce/issues).

---

صُنع بـ ❤️ وقوة [NestJS](https://nestjs.com/) بواسطة [eslambashry](https://github.com/eslambashry).
``` -->