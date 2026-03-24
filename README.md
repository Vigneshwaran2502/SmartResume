<div align="center">

# 🧠 SmartResume AI

### AI-Powered Resume Builder with Live Preview & PDF Export

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Build professional, ATS-friendly resumes in minutes — powered by Google Gemini AI for smart content suggestions, live preview, and one-click PDF export.

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Content Suggestions** | Leverage Google Gemini AI to enhance bullet points, generate professional summaries, suggest skills, and fix grammar |
| 👁️ **Live Preview** | See your resume update in real-time as you type in a split-screen layout |
| 📄 **PDF Export** | One-click high-quality A4 PDF generation using html2pdf.js |
| 🎨 **6 Theme Colors** | Choose from Blue, Indigo, Purple, Rose, Emerald, and Slate accent colors |
| 📝 **5 Resume Templates** | Minimal, Modern, Creative, Professional, and Executive layouts |
| 🧩 **8-Step Form Wizard** | Guided step-by-step editing for Personal Info, Experience, Education, Skills, Projects, Certifications, Achievements, and a final Review step |
| 📱 **Fully Responsive** | Works seamlessly on desktop, tablet, and mobile devices |
| ⚡ **Smooth Animations** | Polished transitions powered by Framer Motion |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 6 |
| **Styling** | Tailwind CSS 4, Radix UI Primitives |
| **State Management** | Zustand |
| **AI Backend** | Express.js + Google Gemini AI (Generative AI SDK) |
| **PDF Export** | html2pdf.js |
| **Animations** | Framer Motion (motion) |
| **Icons** | Lucide React |
| **Forms** | React Hook Form |
| **Notifications** | Sonner |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Google Gemini API Key](https://ai.google.dev/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vigneshwaran2502/SmartResume.git
cd SmartResume

# 2. Install dependencies
npm install

# 3. Set up environment variables
#    Create a .env.local file and add your Gemini API key:
echo GEMINI_API_KEY="your_api_key_here" > .env.local

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## 📂 Project Structure

```
SmartResume/
├── index.html              # Entry HTML
├── server.ts               # Express backend with Gemini AI routes
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies & scripts
├── .env.example            # Environment variable template
├── tsconfig.json           # TypeScript config
└── src/
    ├── main.tsx            # React app entry point
    ├── App.tsx             # Main app with wizard, preview & PDF export
    ├── store.ts            # Zustand global state management
    ├── types.ts            # TypeScript type definitions
    ├── index.css           # Global styles
    ├── components/
    │   ├── Preview.tsx     # Live resume preview (5 templates)
    │   ├── ui.tsx          # Reusable UI components (Button, Input, etc.)
    │   └── forms/
    │       ├── PersonalInfoForm.tsx
    │       ├── ExperienceForm.tsx
    │       ├── EducationForm.tsx
    │       ├── SkillsForm.tsx
    │       ├── ProjectsForm.tsx
    │       ├── CertificationsForm.tsx
    │       ├── AchievementsForm.tsx
    │       └── FinalizeStep.tsx
    └── lib/
```

---

## 🤖 AI Capabilities

SmartResume integrates with the **Google Gemini AI** API to provide real-time content assistance:

| Capability | What It Does |
|---|---|
| **Bullet Point Enhancement** | Transforms plain descriptions into impactful, action-oriented bullet points with quantified results |
| **Summary Generation** | Creates compelling 3–4 sentence professional summaries based on your profile |
| **Skill Suggestions** | Recommends 5–8 relevant hard & soft skills based on your job title or industry |
| **Grammar Correction** | Fixes spelling and grammar errors while making text sound more professional |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Express + Vite) |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run TypeScript type checking |
| `npm start` | Start the production server |

---

## 🙌 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Vigneshwaran](https://github.com/Vigneshwaran2502)**

</div>
