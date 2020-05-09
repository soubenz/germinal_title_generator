// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
export default function (Vue, {
  router,
  head,
  isClient,
  appOptions
}) {

  const opts = {} //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)

  appOptions.vuetify = new Vuetify(opts);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}