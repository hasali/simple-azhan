import tailwindcss from '@tailwindcss/vite';
import fs from 'fs'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({ 
    server: {
        https:{
            cert: fs.readFileSync('localhost+3.pem'),
            key: fs.readFileSync('localhost+3-key.pem')
        },
        host: true
    },
    plugins: [tailwindcss(), sveltekit()] 
});
