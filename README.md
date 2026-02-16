# 🌿 GitNameX - Smart Git Branch Name Generator

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-orange?logo=resend)](https://resend.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

**GitNameX** is a premium, high-performance web application designed to generate meaningful and consistent Git branch names from your commit messages or feature descriptions. Built with modern web technologies, it offers a seamless experience for developers who want to maintain clean and organized Git workflows.

![GitNameX Preview](public/preview.png) *(Note: Add a preview image to public/preview.png for better visibility)*

## ✨ Features

- **🚀 Smart Branch Name Generation**:
  - `feature/*`: Generate feature branch names from descriptions
  - `bugfix/*`: Create bugfix branch names from issue descriptions
  - `hotfix/*`: Quick hotfix branch naming for urgent patches
  - `release/*`: Standardized release branch naming
  - `chore/*`: Generate chore branch names for maintenance tasks
  - `docs/*`: Documentation branch naming convention
  - `refactor/*`: Clean refactor branch name generation
- **📊 Real-time Preview**: See generated branch names instantly as you type.
- **📥 One-Click Copy**: Quickly copy branch names to clipboard.
- **📧 Integrated Contact Form**: Beautifully designed contact page powered by Resend for reliable email delivery.
- **🌓 Dark Mode**: Premium "Midnight Slate" theme for comfortable night-time usage.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

- **Core**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Resend](https://resend.com/)
- **Animations**: CSS Transitions & Framer Motion logic
- **Infrastructure**: TypeScript for type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/r3tr0/GitNameX.git
   cd GitNameX
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory and add your Resend API key and email configurations:
   ```env
   NEXT_PUBLIC_RESEND_API_KEY=re_your_api_key
   NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
   NEXT_PUBLIC_EMAIL_FROM=onboarding@resend.dev
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```text
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         # Reusable UI components (shadcn/ui)
├── lib/                # Logic, helpers, and server actions
│   ├── actions.ts      # Server-side email handling
│   ├── branch-names.ts # Branch name generation algorithms
│   ├── email-templates.ts # HTML templates for Resend
│   └── resend.ts       # Centralized Resend client
├── public/             # Static assets (logos, icons)
└── styles/             # Global CSS & Tailwind config
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Montasim](https://github.com/montasim)
