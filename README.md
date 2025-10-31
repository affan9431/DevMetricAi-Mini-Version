# 💼 DevMetricAI

DevMetricAI is an AI-powered SaaS platform designed to streamline technical interviews and coding assessments. Built with **Flask**, **React**, and **MongoDB**, this platform enables users to upload their resumes, take coding challenges, and go through AI-driven mock interviews—mimicking real-world hiring processes.

---

## 🚀 Live Demo

🔗 [https://devmetricai.netlify.app/app/home](https://devmetricai.netlify.app)

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Flask (Python)
- **Database:** MongoDB
- **Authentication:** JWT, Google OAuth, GitHub OAuth
- **Payments:** Stripe
- **NLP:** spaCy, PyMuPDF
- **Deployment:** Netlify (Frontend) & Render (Backend)

---

## ✨ Key Features

### 🧾 Authentication
- Email/password login (JWT-based)
- Google & GitHub social logins

### 📄 Resume Upload & Analysis
- Upload PDF resumes (converted using `PyMuPDF`)
- Extract **skills** and **projects** using `spaCy`

### 💻 Interview Workflow
- 💰 **Paid Plans Required Before Upload**:
  - `/interview` → one-time cost
  - `/month` → unlimited interviews/month
  - `/year` → unlimited interviews/year  
- **Stripe** integrated for secure payment

### 🧠 AI-Based Interview & Coding Rounds
- **Coding Round**: Solve 5 DSA questions
- **Interview Round**: AI asks questions based on extracted projects and skills
- **Follow-up Questions**: Dynamic follow-ups based on user replies

### ⚙️ User Dashboard

#### 👤 Settings
- Update personal details and profile image

#### 📚 Previous Interviews
- View interview history with:
  - Score
  - Domain
  - Date
  - Status

#### 📊 Performance
- Visualize progress using:
  - **Line charts**
  - **Bar charts**

#### 📌 Suggestions
- Get personalized resources to improve based on past interview performance

#### 🔔 Notifications
- View job opportunities related to the user's domain and role

---

## 📦 Getting Started

### 🔧 Backend Setup (Flask)
```bash
cd back-end
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

### 🔧 Frontend Setup (React + Vite)
```bash
cd front-end
npm install
npm run dev
```
