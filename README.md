# 🔄 GitNameX - Smart Online Text Conversion Tool

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-orange?logo=resend)](https://resend.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

**GitNameX** is a premium, high-performance web application designed for quick and smart text transformations. Built with modern web technologies, it offers a seamless user experience for writers, developers, and office professionals.

![GitNameX Preview](public/preview.png) *(Note: Add a preview image to public/preview.png for better visibility)*

## ✨ Features

- **🚀 Multiple Conversion Modes**:
  - `Sentence case`: Capitalizes the first letter of sentences.
  - `lower case`: Converts everything to lowercase.
  - `UPPER CASE`: Converts everything to uppercase.
  - `Capitalized Case`: Capitalizes every word.
  - `aLtErNaTiNg cAsE`: Toggles case for every character.
  - `Title Case`: Standard title formatting following grammar rules.
  - `iNVERSE cASE`: Swaps uppercase for lowercase and vice versa.
- **📊 Real-time Analytics**: Word count, character count, and line count as you type.
- **📥 One-Click Actions**: Quickly copy to clipboard or download as a text file.
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
   git clone https://github.com/montasim/caseify-case-converter.git
   cd convert-case
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory and add your Resend API key and email configurations:
   ```env
   NEXT_PUBLIC_RESEND_API_KEY=re_your_api_key
   NEXT_PUBLIC_CONTACT_EMAIL=montasimmamun@gmail.com
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
│   ├── conversions.ts  # Text transformation algorithms
│   ├── email-templates.ts # HTML templates for Resend
│   └── resend.ts       # Centralized Resend client
├── public/             # Static assets (logos, icons)
└── styles/             # Global CSS & Tailwind config
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Montasim](https://github.com/montasim)
