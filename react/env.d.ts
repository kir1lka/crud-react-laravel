declare global {
     interface ImportMeta {
       env: {
         readonly VITE_API_URL: string;
         // добавьте другие переменные окружения, если они есть
       };
     }
   }