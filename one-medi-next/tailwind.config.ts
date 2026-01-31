import type { Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";
import tailwindContainerQueries from "@tailwindcss/container-queries";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0d9488", // Teal 600
                    dark: "#0f766e",    // Teal 700
                    light: "#2dd4bf",   // Teal 400
                },
                secondary: {
                    DEFAULT: "#f59e0b", // Amber 500
                    dark: "#d97706",    // Amber 600
                },
            },
            fontFamily: {
                sans: ["var(--font-lexend)", "sans-serif"],
                display: ["var(--font-manrope)", "sans-serif"],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'float': '0 10px 30px -5px rgba(13, 148, 136, 0.3)',
                'glass': '0 8px 32px 0 rgba(13, 148, 136, 0.07)',
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-out",
                "slide-up": "slideUp 0.4s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                "blob": "blob 7s infinite",
            },
            keyframes: {
                fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
                slideUp: { "0%": { transform: "translateY(10px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
                scaleIn: { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" }
                }
            },
        },
    },
    plugins: [
        tailwindForms,
        tailwindContainerQueries,
    ],
};
export default config;
