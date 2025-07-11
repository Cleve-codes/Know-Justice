# Know Justice – Digital Wallet App

A modern, responsive digital wallet application built with Next.js, TypeScript, and Tailwind CSS. Know Justice provides a seamless user experience for managing wallets, cards, and payments, with a focus on accessibility, dark mode support, and persistent local data.

## Features

- **Wallet Management**: Add, view, and manage multiple wallets.
- **Card Management**: Add, view, and remove cards. Card data is persisted in localStorage for a backend-free experience.
- **Payments**: Add payments with descriptions and amounts, and view recent transactions.
- **Authentication**: Signup, login, logout, and password reset flows with toast notifications for all major actions.
- **Dark/Light Mode**: Fully responsive dark and light themes with a persistent toggle and visually consistent UI across all pages.
- **Toast Notifications**: All major actions trigger toast notifications, displayed at the top right for better visibility.
- **Accessibility & UX**: Forms and UI elements are optimized for both light and dark modes, ensuring readability and comfort.
- **No Backend Required**: All data is stored in localStorage, making it easy to try out and use locally.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching

## Getting Started

1. **Clone the repository:**
   ```sh
git clone <your-repo-url>
   cd Know\ Justice
```
2. **Install dependencies:**
   ```sh
pnpm install
   # or
   npm install
   # or
   yarn install
```
3. **Run the development server:**
   ```sh
pnpm dev
   # or
   npm run dev
   # or
   yarn dev
```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` – Main application pages and routes
- `components/` – Reusable UI components
- `contexts/` – React context providers (e.g., authentication)
- `hooks/` – Custom React hooks
- `lib/` – Utility functions and mock data
- `public/` – Static assets
- `styles/` – Global styles

## Customization

- **Theme**: Use the theme toggle in the UI to switch between dark and light modes. The app remembers your preference.
- **Data Persistence**: All wallets and cards are stored in your browser's localStorage. No backend or database is required.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License.

---

**Know Justice** – Empowering users with a beautiful, accessible digital wallet experience.
# Know Justice – Digital Wallet App

A modern, responsive digital wallet application built with Next.js, TypeScript, and Tailwind CSS. Know Justice provides a seamless user experience for managing wallets, cards, and payments, with a focus on accessibility, dark mode support, and persistent local data.

## Features

- **Wallet Management**: Add, view, and manage multiple wallets.
- **Card Management**: Add, view, and remove cards. Card data is persisted in localStorage for a backend-free experience.
- **Payments**: Add payments with descriptions and amounts, and view recent transactions.
- **Authentication**: Signup, login, logout, and password reset flows with toast notifications for all major actions.
- **Dark/Light Mode**: Fully responsive dark and light themes with a persistent toggle and visually consistent UI across all pages.
- **Toast Notifications**: All major actions trigger toast notifications, displayed at the top right for better visibility.
- **Accessibility & UX**: Forms and UI elements are optimized for both light and dark modes, ensuring readability and comfort.
- **No Backend Required**: All data is stored in localStorage, making it easy to try out and use locally.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Know\ Justice
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` – Main application pages and routes
- `components/` – Reusable UI components
- `contexts/` – React context providers (e.g., authentication)
- `hooks/` – Custom React hooks
- `lib/` – Utility functions and mock data
- `public/` – Static assets
- `styles/` – Global styles

## Customization

- **Theme**: Use the theme toggle in the UI to switch between dark and light modes. The app remembers your preference.
- **Data Persistence**: All wallets and cards are stored in your browser's localStorage. No backend or database is required.

