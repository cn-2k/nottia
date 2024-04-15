// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    // https://github.com/nuxt-modules/eslint/issues/123
    typescriptBundlerResolution: false,
  },
  app: {
    head: {
      title: "Nottia",
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },

  devtools: { enabled: true },
  css: ["./assets/css/main.css"],
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "nuxt-og-image",
  ],
  
  site: {
    name: "Nottia",
    url: "https://nottia.vercel.app",
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
      },
    },
  },
  
  googleFonts: {
    families: {
      Inter: [100, 300, 400, 500, 600, 700],
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "sc-",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
