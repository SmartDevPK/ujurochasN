<template>
  <q-page>
    <!-- Hero Section -->
    <section class="q-mt-lg">
      <div class="hero">
        <div class="left">
          <q-carousel animated :autoplay="true" v-model="slide" infinite>
            <q-carousel-slide :name="1" img-src="/images/hero.jpg" />
            <q-carousel-slide :name="2" img-src="/images/landing.jpg" />
            <q-carousel-slide :name="3" img-src="/images/about2.jpg" />
          </q-carousel>
        </div>
        <div class="right">
          <div class="content">
            <h4 class="text-h4 text-center text-weight-bold">
              Uju Vanstasia Rochas-Anwukah
            </h4>
            <p class="q-mt-sm text-weight-medium">
              Uju Vanstasia Rochas-Anwukah is a distinguished leader in public
              health and sustainable development. With a robust educational
              background, including degrees from Southern Methodist University,
              Harvard, and King's College London, she combines her expertise to
              drive impactful change globally. Currently serving as the Special
              Assistant to the President in Public Health, Uju also leads
              nutritional initiatives and coordinates projects focused on clean
              water, sanitation, and hygiene. As the Founder of U-Save
              Foundation, she has empowered countless communities, earning
              recognition as a fellow of the African Institute of Public Health
              Professionals.
            </p>
            <div class="row items-center no-wrap" style="gap: 1rem">
              <q-btn
                target="_blank"
                href="mailto:info@ujurochas.com"
                color="green-7"
              >
                Get in touch
              </q-btn>
              <q-btn :to="{ name: 'about' }" text-color="black" color="white">
                Learn more
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Section -->
    <section class="section activities">
      <h4 class="text-h4 text-weight-bold text-center">Activities</h4>
      <div class="q-mt-xl q-py-xl bg-white">
        <div class="grid container">
          <div class="left">
            <h4 class="text-h4 text-center text-weight-bold">
              <i class="fa-brands fa-pagelines"></i> Primary Health Care
            </h4>
            <img src="/images/health.png" alt="Primary Health Care" />
            <div class="btn row items-center justify-center">
              <q-btn
                flat
                :to="{ name: 'primary.health.care' }"
                class="bg-green-7 text-white"
              >
                View More
              </q-btn>
            </div>
          </div>
          <div class="right">
            <h4 class="text-h4 text-center text-weight-bold">
              <i class="fa-solid fa-heart-circle-check q-mr-sm"></i> Nutrition
            </h4>
            <img src="/images/hero3.jpg" alt="Nutrition" />
            <div class="btn row items-center justify-center">
              <q-btn
                flat
                :to="{ name: 'nutrition' }"
                class="bg-green-7 text-white"
              >
                View More
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quotes Section -->
    <section class="section quote_sec">
      <div class="container">
        <div class="q-mt-xl grid">
          <div class="left">
            <img
              src="/images/quotes.png"
              alt="Quotes"
              style="width: 100%; object-fit: cover"
            />
          </div>
          <div class="right text-center">
            <h4 class="text-h4 text-black">Quotes</h4>
            <p class="quotes">
              “Malnutrition is a complex issue that demands a coordinated effort
              from all sectors of government and society. Our advocacy for
              budget inclusion and the tagging of nutrition-specific and
              sensitive programs across key sectors is vital to how we tackle
              malnutrition in Nigeria." - Uju Rochas-Anwukah
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="section articles">
      <div class="container">
        <div class="responsive_grid">
          <div v-for="item in items" :key="item._id" class="card">
            <img
              :src="`http://localhost:3000/${item.image}`"
              alt="Article Image"
              class="article-image"
            />
            <h6>{{ item.title }}</h6>
            <p>{{ item.description }}</p>
            <div>
              <q-btn
                v-if="item.youtubeLink"
                target="_blank"
                :href="item.youtubeLink"
                outline
                color="green-7"
              >
                Watch Video
              </q-btn>
            </div>
            <div v-if="item.youtubeLink">
              <iframe
                width="100%"
                height="250"
                :src="getYoutubeEmbedUrl(item.youtubeLink)"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- YouTube Links Section -->
    <section class="section youtube-links">
      <div class="container">
        <h4 class="text-h4 text-weight-bold text-center">Watch Our Videos</h4>
        <div class="responsive_grid">
          <div
            v-for="video in youtubeLinks"
            :key="video._id"
            class="video-card"
          >
            <iframe
              width="100%"
              height="250"
              :src="getYoutubeEmbedUrl(video.youtubeLink)"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <FooterCompVue />
  </q-page>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import FooterCompVue from "src/components/FooterComp.vue";

const slide = ref(1);
const items = ref([]);
const youtubeLinks = ref([]);

// Function to fetch articles and YouTube links from API
const fetchData = async () => {
  try {
    // Fetch items
    const itemsResponse = await axios.get("http://localhost:3000/items");
    items.value = itemsResponse.data.itemData;

    // Fetch YouTube links
    const youtubeResponse = await axios.get(
      "http://localhost:3000/youtubeLinks"
    );
    youtubeLinks.value = youtubeResponse.data.youtubeData;

    // Combine data on the frontend
    items.value = items.value.map((item) => {
      const matchingYoutube = youtubeLinks.value.find(
        (yt) => yt.title === item.title
      );
      return {
        ...item,
        youtubeLink: matchingYoutube ? matchingYoutube.youtubeLink : null,
      };
    });

    console.log("Combined Data:", items.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to extract YouTube embed URL
const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";
  const videoIdMatch = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};

// Fetch data on component mount
onMounted(fetchData);
</script>
<style scoped>
.responsive_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.video-item {
  margin-bottom: 20px;
}

.video-item iframe {
  width: 100%;
  height: 315px;
  border-radius: 8px;
}

.youtube-links {
  margin-top: 50px;
  text-align: center;
}

.video-card {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
