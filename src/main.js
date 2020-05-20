// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueGtag from "vue-gtag";

export default function (Vue, {
  router,
  head,
  isClient,
  appOptions
}) {
  head.link.push({
    rel: 'stylesheet',
    href: "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
  }, )

  const opts = {} //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)

  appOptions.vuetify = new Vuetify(opts);
  Vue.use(VueGtag, {
    config: {
      id: "UA-167204105-1",

    }
  }, router);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}