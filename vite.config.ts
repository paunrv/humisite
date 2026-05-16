import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        editorial: path.resolve(__dirname, "sitio-editorial.html"),
        blogTaekwondo: path.resolve(__dirname, "blog-taekwondo-y-su-filosofia.html"),
        blogHistoria: path.resolve(__dirname, "blog-historia-del-taekwondo.html"),
        blogJuramento: path.resolve(__dirname, "blog-juramento-reglas-y-vocabulario-del-taekwondo.html"),
        blogVictorEstrada: path.resolve(__dirname, "blog-victor-estrada-sydney-2000.html"),
        blogAtenas2004: path.resolve(__dirname, "blog-atenas-2004-hermanos-salazar.html"),
        blogBeijing2008: path.resolve(__dirname, "blog-beijing-2008-taekwondo-mexico.html"),
        blogLondres2012: path.resolve(__dirname, "blog-londres-2012-taekwondo-mexico.html"),
        blogRio2016: path.resolve(__dirname, "blog-rio-2016-taekwondo-mexico.html"),
        blogTokyo2020: path.resolve(__dirname, "blog-tokyo-2020-taekwondo-mexico.html"),
        blogParis2024: path.resolve(__dirname, "blog-paris-2024-taekwondo-mexico.html"),
        blogPoomsae: path.resolve(__dirname, "blog-poomsae-que-es-y-por-que-entrenarlo.html"),
        blogCinturones: path.resolve(__dirname, "blog-sistema-de-cinturones-taekwondo.html"),
        blogKyorugi: path.resolve(__dirname, "blog-kyorugi-como-se-puntua-el-combate.html"),
        blogCinturonBlanco: path.resolve(__dirname, "blog-cinturon-blanco-taekwondo.html"),
        blogCinturonNaranja: path.resolve(__dirname, "blog-cinturon-naranja-taekwondo.html"),
        blogCinturonAmarillo: path.resolve(__dirname, "blog-cinturon-amarillo-taekwondo.html"),
        blogCinturonVerde: path.resolve(__dirname, "blog-cinturon-verde-taekwondo.html"),
        blogCinturonAzul: path.resolve(__dirname, "blog-cinturon-azul-taekwondo.html"),
        blogCinturonRojo: path.resolve(__dirname, "blog-cinturon-rojo-taekwondo.html"),
        blogCintaNegra: path.resolve(__dirname, "blog-cinta-negra-taekwondo.html"),
        blogSegundoDan: path.resolve(__dirname, "blog-segundo-dan-taekwondo.html"),
        blogTercerDan: path.resolve(__dirname, "blog-tercer-dan-taekwondo.html"),
        blogCuartoDan: path.resolve(__dirname, "blog-cuarto-dan-taekwondo.html"),
        blogQuintoDan: path.resolve(__dirname, "blog-quinto-dan-taekwondo.html"),
      },
    },
  },
});

