<template>
  <Layout>
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
            <v-btn color="warning" @click="clearData">Effacer</v-btn>
            <v-btn
              color="blue-grey darken-3 white--text"
              @click="generate"
              :disabled="!valid"
            >Generer</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

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
          </v-row>
        </v-toolbar>
      </v-card-title>
      <v-card-subtitle>
        <v-toolbar color="blue-grey darken-1" dark>
          <v-row>
            <p class="ma-2">{{subtitle}}</p>
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
    title: "App"
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
    generateClickBait() {
      return [
        "Comment Éviter Les Plus Grosses Erreurs Avec" +
          this.articlesFormat[this.article].defined +
          this.name +
          " ?",
        "Comment " + this.action + "2 Fois Plus Vite Pour 2 fois Moins Cher ?",
        "Après 5 ans à " + this.action + "Elle Donne Ses Meilleurs Conseils",
        "Ils Se Sont Moqués De Moi Quand J'Ai Commencé " +
          this.articlesFormat[this.article].defined +
          ",Mais Aujourd'hui...",
        "5 Méthodes Pour " +
          this.action +
          " Que Vous Devez Mettre En Place MAINTENANT.",
        "Il A Trouvé Une Nouvelle Technique Pour" +
          this.action +
          ". Ses Concurrents Le Détestent !						",
        "Ce Rapport Gratuit Explique 3 Secrets Sur " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Attention : Ne Pas " + this.action + " C'Est Perdre De L'Argent !",
        "Raisonnez Comme Les Meilleurs " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "La Technique Pour this.action" +
          " En 2020. (Ce N'Est PAS Ce Que Vous Pensez !)	"
      ];
    },
    generateList() {
      return [
        "7 Choses À Savoir Sur " + this.action,

        "Apprendre à" + this.action + " En 7 Étapes",
        "7 Moyens Pour Implementer " +
          this.articlesFormat[this.article].defined +
          this.name,
        this.action + " En 7 Étapes",
        "Top 7 Des Choses À Savoir Sur " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Les 7 Erreurs À Éviter Avec " +
          this.articlesFormat[this.article].defined +
          this.name,
        "7 Erreurs Fatales Sur " +
          this.articlesFormat[this.article].defined +
          this.name +
          " Et Comment Les Éviter",
        "7 Erreurs Stupides Sur " +
          this.articlesFormat[this.article].defined +
          this.name +
          " Que Les Gens Font (Et Comment Les Éviter)",
        "C'Est Fou Que Les Gens Fassent Encore Ces 7 Erreurs Sur " +
          this.articlesFormat[this.article].defined +
          this.name,
        "7 Règles De Base Pour " + this.action,
        "7 Choses Que J'Ai Apprises Après 10 ans à " + this.action,
        "C'Est Beaucoup Plus Facile D'Apprendre à " +
          this.action +
          " Avec Ces 7 Astuces",
        "Ne Commencez Pas à " +
          this.action +
          " Sans Connaître Ces 7 Bonnes Pratiques",
        this.action + " Est Plus Efficace Quand Vous Suivez Ces 7 Étapes",
        "7 Étapes Pour " + this.action,
        "7 Étapes Pour Dominer " +
          this.articlesFormat[this.article].defined +
          this.name,
        "7 Façons Pour " + this.action + " Comme Un Pro",
        "Vous N'Apprendrez Jamais " +
          this.articlesFormat[this.article].defined +
          this.name +
          " Sans Ces 7 Outils							",
        this.action + " Sans Ces 7 Méthodes C'Est Difficile							",
        this.action + " Comme Un Pro En 7 Étapes Simples							"
      ];
    },
    generateLong() {
      return [
        "Le Guide Ultime " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "Le Guide Pratique " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "Le Guide Final " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "Le Seul Guide Pour Apprendre " +
          this.articlesFormat[this.article].defined +
          this.name +
          " Dont Vous Aurez Besoin",
        "Le Guide Ultime Pour " + this.action + " Comme Un Pro",
        this.action + ": Le Guide Ultime",
        this.articlesFormat[this.article].defined +
          this.name +
          " Expliqué Dans Ce Guide Unique",
        this.articlesFormat[this.article].defined + this.name + " En 5 Minutes",
        "Le Guide " +
          this.articlesFormat[this.article].contracted +
          this.name +
          " En 10 Minutes	",
        "Apprends " +
          this.articlesFormat[this.article].defined +
          this.name +
          " En 10 Minutes Ou Moins",
        "Le Guide Spécial " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "Apprends " +
          this.articlesFormat[this.article].defined +
          this.name +
          " Avec Un Pro",
        this.articlesFormat[this.article].defined + this.name + " Pour Tous",
        this.articlesFormat[this.article].defined +
          this.name +
          " Pour Les Nuls",
        this.articlesFormat[this.article].defined +
          this.name +
          " Expliqué En Un Post",
        this.articlesFormat[this.article].defined +
          this.name +
          " Expliqué Visuellement (Le Guide Complet)",
        "Si Vous Essayez D'Apprendre " +
          this.articlesFormat[this.article].defined +
          this.name +
          " Vous Êtes Au Bon Endroit !	",
        "Les 11 Règles " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "100% De Ce Qu'Il Faut Savoir Sur " +
          this.articlesFormat[this.article].defined +
          this.name,
        this.articlesFormat[this.article].defined +
          this.name +
          " Expliqué Par Un Pro"
      ];
    },
    generateFOMO() {
      return [
        "Si Vous N'Apprenez Pas  " +
          this.articlesFormat[this.article].defined +
          this.name +
          "  Vous Ne Serez Pas Le Meilleur En [TOPIC]",
        this.articlesFormat[this.article].defined +
          this.name +
          "  Est Une Compétence Indispensable. Voici Pourquoi",
        "Apprendre  " +
          this.articlesFormat[this.article].defined +
          this.name +
          "  M'A Permis De Quitter Mon Travail",
        "Être Capable  " + this.action + "  A Boosté Ma Carrière",
        this.articlesFormat[this.article].defined +
          this.name +
          "  Peut Être Appris En 1 Semaine Ou Moins",
        "Voici Comment J'Ai Appris  " +
          this.articlesFormat[this.article].defined +
          this.name +
          "  (La Méthode Précise)",
        "Vous Voulez Apprendre  " +
          this.articlesFormat[this.article].defined +
          this.name +
          " ? Ne Cherchez Plus.",
        "Ne Pas Connaître  " +
          this.articlesFormat[this.article].defined +
          this.name +
          "  A Freiné Ma Carrière",
        "Quand J'Ai Enfin Appris  " +
          this.articlesFormat[this.article].defined +
          this.name +
          "  Ça A Boosté Ma Confiance",
        "Ce N'Est Pas Facile D'Apprendre  " +
          this.articlesFormat[this.article].defined +
          this.name +
          " , Mais Ça Vaut Le Coup !",
        "Ce N'Est Pas Facile D'Apprendre  " +
          this.articlesFormat[this.article].defined +
          this.name +
          " , Mais C'Est Pour Ça Que Ça Vaut Le Coup",
        this.articlesFormat[this.article].defined +
          this.name +
          "  N'Est Pas Pour Les Fragiles. C'Est POURQUOI Vous Devriez Vous Y Mettre",
        "Sans  " +
          this.articlesFormat[this.article].defined +
          this.name +
          "  C'Est Difficile De Gagner",
        "Sans Une Base En Growth Hacking Vous Serez Largué",
        "Si Vous N'Apprenez Pas Déjà  " +
          this.articlesFormat[this.article].defined +
          this.name +
          " , Vos Concurrents Le Font."
      ];
    },
    generateEmotional() {
      return [
        "Si Vous Êtes Amoureux " +
          this.articlesFormat[this.article].contracted +
          this.name +
          " Vous Devriez Lire Ceci",
        "Le Guide Mystique " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "Une Approche Intuitive " +
          this.articlesFormat[this.article].contracted +
          this.name,
        "Un Guide Progressif Sur  " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Gagner De L'Argent De Manière Éthique Avec  " +
          this.articlesFormat[this.article].defined +
          this.name
      ];
    },
    generateROI() {
      return [
        "Les Entreprises Qui Gagnent Le Plus D'Argent Avec  " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Une Liste De Personnes (Et Entreprises) Qui Gagnent De L'Argent Avec  " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Qui Gagne Le Plus Avec  " +
          this.articlesFormat[this.article].defined +
          this.name +
          " ? Voici La Liste..."
      ];
    },
    generateAggressive() {
      return [
        "Ne Soit Pas Une Victime. Apprends  " +
          this.articlesFormat[this.article].defined +
          this.name,
        "Comment Écraser Les Concurrents Dans  " +
          this.articlesFormat[this.article].defined +
          this.name +
          " ?",
        "Vous Détestez Perdre Des Clients En " +
          this.name +
          " ? Voici Comment Gagner À Tous Les Coups",
        "Le Guide Pour Ne Jamais Perdre Un Autre Client En " + this.name,
        "La Plupart Des Gens En " +
          this.name +
          " Sont Stupides. Ne Fais Pas Comme Eux.",
        "Tu Veux Être Le Meilleur En " + this.name + " ? Voici Comment Faire.",
        this.articlesFormat[this.article].defined +
          this.name +
          "  NIVEAU ULTIME.",
        "Deviens un BOSS En " + this.name,
        "Les Perdants En " + this.name + " Font Ceci. Les Gagnants Font Cela…"
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
          break;
        case "Titres Clickbait":
          generatedArray = this.generateClickBait();
          this.title = "Titres Clickbait";
          this.subtitle =
            "La magie du Clickbait... Attention à ne pas créer de mauvaise expérience utilisateur avec un titre trop alléchant par rapport au contenu.";
          break;
        case "7 Moyens Pour":
          generatedArray = this.generateList();
          this.title = "7 Moyens Pour";
          break;
        case "Pour de longs posts":
          generatedArray = this.generateLong();
          this.title = "Pour de longs posts";
          this.subtitle =
            "Ce sont de longs posts qui expliquent un sujet en détail. En général très longs (4000+ mots) et contenant de nombreux exemples.";
          break;
        case "Titres FOMO":
          generatedArray = this.generateFOMO();
          this.title = "Titres FOMO";
          this.subtitle =
            "Des titres FOMO tournés vers la connaissance d'un sujet, la formation.";
          break;
        case "Ça Rapporte":
          generatedArray = this.generateROI();
          this.title = "Ça Rapporte";
          break;
        case "Titres Émotionnels":
          generatedArray = this.generateEmotional();
          this.title = "Titres Émotionnels";
          this.subtitle =
            "Certaines personnes répondent beaucoup mieux aux titres émotionnels.";
          break;
        case "Titres Agressifs et Compétitifs":
          generatedArray = this.generateAggressive();
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

