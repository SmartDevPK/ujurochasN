<template>
  <div class="aboutpage">
    <section>
      <div class="about about2 hero container">
        <div class="">
          <q-carousel animated v-model="slide" infinite>
            <q-carousel-slide
              style="background-position: 30%"
              :name="1"
              img-src="/images/hero3.jpg"
            />
            <q-carousel-slide
              style="background-position: 35%"
              :name="2"
              img-src="/images/hero2.jpg"
            />
            <q-carousel-slide :name="3" img-src="/images/hero3.jpg" />
          </q-carousel>

          <div class="content"><h3>Contact</h3></div>
        </div>
      </div>
    </section>

    <section class="q-py-xl">
      <ContactComp />
    </section>

    <div class="wrapper">
      <FooterComp />
    </div>
  </div>
</template>

<script setup>
import FooterComp from "../components/FooterComp.vue";
import ContactComp from "../components/ContactComp.vue";
import { onMounted, ref } from "vue";
import { useMeta } from "quasar";
let slide = ref(1);

const metaData = {
  // sets document title
  title: "Uju Rochas",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Contact Us`,

  // meta tags
  meta: {
    description: {
      name: "description",
      content: "Uju Rochas",
    },
    keywords: {
      name: "keywords",
      content: "Uju, Uju Rochas",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Uju Rochas`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);
onMounted(() => {});
</script>

<style scoped>
.businesses {
  position: relative;
  z-index: 1;
  background: url("/images/home2.jpg") no-repeat center top/cover;
}

.wrapper {
  padding-top: 3rem;
}

img {
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.1);
}

img {
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.1);
}
.welcome {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.37);
  border-radius: 83.4527px;

  margin-bottom: 1rem;
  width: 222px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #005be3;
}

.header__text {
  font-style: normal;
  font-weight: 900;
  font-size: 54.3307px;
  line-height: 63px;

  color: #ffffff;

  margin-top: 1rem;
  margin-bottom: 1rem;
}

.rima_det {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 10%;
  transform: translate(-10%, -50%);
  color: #fff;
}

.rima_det p.dett {
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 104.4%;
  /* or 50px */

  color: #ffffff;
}

.hero-text {
  max-width: 70%;
}

@media (max-width: 500px) {
  .header__text {
    font-size: 44.3307px;
  }
  .hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .rima_det p.dett {
    font-size: 30px;
  }

  .hero_text {
    margin-top: 4rem;
  }

  .det div {
    font-size: 13px;
  }
}
</style>
