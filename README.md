# Beacon NH

**Beacon NH** is a modern, full-stack simulated React application designed to serve as a digital sanctuary and resource hub for refugees and asylum seekers settling in Manchester, New Hampshire.

The application transitions from a legacy static HTML layout to a fully modular, premium, glassmorphic UI built with **Vite, React, TypeScript, and Tailwind CSS**. 

## Core Features

- **Multi-Page Architecture**: A robust `react-router-dom` implementation featuring dedicated pages for Home, Services, Communities, Events, Stories, and an interactive Donation system.
- **Internationalization (i18n)**: Fully integrated `react-i18next` framework that allows users to instantly switch the entire site's language on-the-fly without page reloads (featuring English, Arabic, French, Swahili, Ukrainian, and more).
- **Admin Command Center (`/admin`)**: A secure, dark-themed administrative dashboard protected by mock authentication that allows staff to manage live content.
- **Real-Time Data Management**: Utilizes a dynamic React Context combined with `LocalStorage` to simulate a live database backend. Events added or deleted in the Admin portal immediately reflect on the public-facing pages.
- **Cinematic UI/UX**: Features high-contrast typography (Google Fonts: Barlow & Barlow Condensed), ambient video backgrounds, and custom CSS animations designed to evoke a premium, documentary-style aesthetic.
- **Sub-Community Portals**: Deep-linking pages highlighting specific refugee communities in Manchester (e.g., Congolese, Kenyan, Ukrainian, Afghan, Syrian, Somali) with rich, AI-generated documentary photography.

## Technologies Used
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router DOM v6
- **Localization**: i18next & react-i18next
- **Styling**: Vanilla CSS (Global Variables, CSS Grid/Flexbox)

## Getting Started

To run the project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the site at `http://localhost:5173`.
5. Access the Admin Dashboard at `http://localhost:5173/admin` (Password: `admin123`).
