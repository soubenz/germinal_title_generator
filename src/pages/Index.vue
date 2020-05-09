<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->

    <!-- <h1>Hello, world!</h1> -->
    <v-card>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                v-model="article"
                :items="articles"
                label="Articles (le, la ..)"
                :rules="[v => !!v || 'Vous devez choisir un element']"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="name"
                label="Nom"
                required
                :rules="[v => !!v || 'Champ obligatoire']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="action"
                label="Verbe/Action"
                :rules="[v => !!v || 'Champ obligatoire']"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                v-model="type"
                :items="types"
                label="Type"
                :rules="[v => !!v || 'Vous devez choisir un element']"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="space-between" dense justify-sm="end">
            <!-- <v-spacer /> -->
            <!-- <v-col> -->
            <!-- </v-col> -->
            <!-- <v-col> -->
            <v-btn color="primary" @click="clearData">Effacer</v-btn>
            <v-btn color="success" @click="generate" :disabled="!valid">Generer</v-btn>
            <!-- </v-col> -->
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- {{generated}} -->
    <v-card v-if="generated.length != 0" color="blue-grey lighten-5">
      <v-card-title class="subheading font-weight-bold">
        <v-toolbar class="mb-0" color="blue-grey darken-3" dark>
          <v-row>
            <p class="ma-2">{{title}}</p>
            <v-spacer />
            <v-btn text icon large>
              <json-csv :data="generated">
                <v-icon>mdi-download</v-icon>
              </json-csv>
            </v-btn>
            <!-- <v-btn sm="12" color="success">
             
            </v-btn>-->
          </v-row>
        </v-toolbar>
      </v-card-title>
      <v-card-subtitle>
        <v-toolbar color="blue-grey darken-1" dark>
          <v-row>
            <p>{{subtitle}}</p>
            <v-spacer />
          </v-row>
        </v-toolbar>
      </v-card-subtitle>

      <v-data-iterator :items="generated" :items-per-page="20">
        <template v-slot:default="props">
          <v-list-item ripple selectable v-for="(key, index) in props.items" :key="index">
            <v-list-item-content class="title">
              <p class="text-center">{{ key.titre}}</p>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-data-iterator>
    </v-card>
  </Layout>
</template>

<script>
import JsonCsv from "vue-json-csv";
export default {
  metaInfo: {
    title: "Hello, world!"
  },
  components: {
    JsonCsv
  },
  data() {
    return {
      articles: ["Le/Du", "L'/De L'", "La/ De La"],
      articlesFormat: {
        "Le/Du": { defined: "Le ", contracted: "Du " },
        "L'/De L'": { defined: "L'", contracted: "De l'" },
        "La/ De La": { defined: "La ", contracted: "De la " }
      },
      shortTitles: [],
      generated: [],
      types: [
        "Titres Courts",
        "Titres Clickbait",
        "7 Moyens Pour",
        "Pour de longs posts",
        "Titres FOMO",
        "Ça Rapporte",
        "Titres Émotionnels",
        "Titres Agressifs et Compétitifs",
        "Titres Fun/Emoji"
      ],
      article: "",
      name: "",
      action: "",
      type: "",
      selected: [],
      valid: false,
      title: "",
      subtitle: ""
    };
  },
  methods: {
    clearData() {
      (this.generated = []), (this.article = this.name = this.action = "");
    },
    generateShort() {
      return [
        this.articlesFormat[this.article].defined + this.name + ": Définition",
        "Qu'Est Ce Que " +
          this.articlesFormat[this.article].defined +
          this.name +
          "?",
        "Conseils Pour " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Offres D'Emploi :" + this.name,
        "Apprendre à " + this.action,
        "Templates Pour " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Idées Pour " + this.action,
        "Comment Faire " +
          this.articlesFormat[this.article].contracted +
          this.name +
          " ?",
        this.action + ": La Formation Gratuite",
        this.articlesFormat[this.article].defined +
          this.name +
          ": Cours En Ligne",
        "Combien Coûte " +
          this.articlesFormat[this.article].defined +
          this.name +
          "?",
        this.articlesFormat[this.article].defined +
          this.name +
          ": Mode D'Emploi",
        "Statistiques Sur " +
          this.articlesFormat[this.article].defined +
          this.name,
        this.articlesFormat[this.article].defined +
          this.name +
          ":Les Alternatives"
      ];
    },
    generate() {
      // console.log(generatedArray);
      let generatedArray = [];
      switch (this.type) {
        case "Titres Courts":
          generatedArray = this.generateShort();
          this.title = "Titres Courts";
          this.subtitle =
            "Peut servir de base comme idée d'article SEO, à utiliser dans l'url et élaborer un titre final un peu plus sexy.";
          // console.log(generatedArray);
          break;
        case "Titres Clickbait":
          break;
        case "7 Moyens Pour":
          break;
        case "Pour de longs posts":
          break;
        case "Titres FOMO":
          break;
        case "Ça Rapporte":
          break;
        case "Titres Émotionnels":
          break;
        case "Titres Agressifs et Compétitifs":
          this.title = "Titres Agressifs et Compétitifs";
          this.subtitle = "Pour les gens qui veulent gagner à tout prix.";
          break;
        case "Titres Fun/Emoji":
          generatedArray = this.generateEmoji();
          break;

        default:
          break;
      }
      this.generated = Array.from(generatedArray).reduce((acc, cur) => {
        const obj = {};
        obj["index"] = generatedArray.indexOf(cur) + 1;
        obj["titre"] = cur;
        acc.push(obj);
        return acc;
      }, []);
    },
    generateEmoji() {
      return [
        (this.articlesFormat[this.article].defined + this.name + " ! ").repeat(
          3
        ),
        "😍 " + this.articlesFormat[this.article].defined + this.name + " 😍",
        "→ " + this.articlesFormat[this.article].defined + this.name + " ←",
        "Vous N'Avez Pas Entendu Parlé " +
          this.articlesFormat[this.article].contracted +
          this.name +
          "!??",
        this.articlesFormat[this.article].defined +
          this.name +
          "C'Est De La Bombe 💣",
        "Écoute-Moi Bien Petit, Je Vais T'Apprendre " +
          this.articlesFormat[this.article].defined +
          this.name,
        "😛!!! " +
          this.articlesFormat[this.article].defined +
          this.name +
          "	!!! 😛",
        "💰!!! " + this.action + " OFFRE (-50%)! 💰",
        "Toc Toc. Qui Est Là ?" +
          this.articlesFormat[this.article].defined +
          this.name,
        "Nous Avons Volé Des Informations Secrètes Sur " +
          this.articlesFormat[this.article].defined +
          this.name +
          " 😉",
        "Mais Enfait C'est Quoi " +
          this.articlesFormat[this.article].defined +
          this.name +
          "??",
        "Ce Conseil Est Clairement le Meilleur Pour " +
          this.articlesFormat[this.article].contracted +
          this.name +
          " 🤯"
      ];
    }
  },
  computed: {
    formatToDownload() {
      return { ...["a", "b", "c"] };
    }
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
