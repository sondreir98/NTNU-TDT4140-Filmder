import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		watch: {
			ignored: ["**/playwright-report/**"], // 👈 Exclude Playwright reports from Vite
		},
	},
});
