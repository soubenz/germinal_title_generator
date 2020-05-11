<template>
  <v-app id="keep">
    <v-app-bar app color="blue-grey darken-1">
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
      <v-spacer />

      <v-toolbar-title>
        <span class="headline font-weight-bold white--text">{{ $static.metadata.siteName }}</span>
      </v-toolbar-title>

      <!-- <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search" /> -->

      <v-spacer />
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on }">
          <v-btn text icon x-large dark class="mr-5" v-on="on">
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Informations</v-card-title>
          <v-card-text class="font-weight-bold">
            Fait par: Soufiane Benzaoui
            <v-btn
              text
              icon
              v-on="on"
              href="https://www.linkedin.com/in/soufiane-benzaoui/"
              target="_blank"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="font-weight-bold">
            Base sur le travail de: Adrien Bono
            <v-btn
              text
              icon
              v-on="on"
              href=" https://www.linkedin.com/in/adrienbono/"
              target="_blank"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </v-card-text>
          <!-- <v-card-text class="font-weight-bold">
            Inspire par: kopywritingKourse
            <v-btn text icon v-on="on">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </v-card-text>-->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <v-container class="mt-10">
        <p class="headline font-weight-bold text-center">En panne d'inspiration pour un titre ?</p>
        <slot />
      </v-container>
    </v-content>
  </v-app>
</template>
<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>
<script>
export default {
  data: () => ({
    drawer: null,
    dialog: false
  })
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>