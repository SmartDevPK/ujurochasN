<template>
  <q-page class="">
    <section>
      <div class="about hero container">
        <div class="left">
          <q-carousel
            animated
            v-model="slide"
            :autoplay="true"
            arrows
            navigation
            infinite
          >
            <q-carousel-slide
              style="background-position: 30%"
              :name="1"
              img-src="/images/about2.jpg"
            />
            <q-carousel-slide
              style="background-position: 35%"
              :name="2"
              img-src="/images/health.png"
            />
          </q-carousel>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h4 class="text-h4 text-weight-bold text-center">
          Primary Health Care
        </h4>
        <!-- <p class="text-center text-info section_para q-mt-md">
          Grateful for the successful ANRiN event The high-level dialogue
          between the National Council on Nutrition and the faith leaders
          provided a platform for strategic discussions and commitments towards
          sustainable nutrition investments for the benefit of all Nigerians.
        </p> -->

        <div class="q-mt-xl">
          <div class="grid two">
            <div class="left">
              <div>
                <img src="/images/ph1.jpg" alt="" />
              </div>
              <p class="q-mt-sm text-info">
                I had the honour of representing my boss, the Vice President of
                the Federal Republic of Nigeria, His Excellency, Sen. Kashim
                Shettima GCON at the Opening Ceremony of the Annual Technical
                Consultation of the UNFPA-UNICEF Joint Programme on the
                Elimination of Female Genital Mutilation.
              </p>
            </div>
            <div class="right">
              <div>
                <img src="/images/ph2.jpg" alt="" />
              </div>
              <p class="q-mt-sm text-info">
                The Vice President recognized the Director-General of the World
                Trade Organization, Dr. Ngozi Okonjo-Iweala, as the pride of the
                continent and the ambassador of our drive towards productivity,
                self-sufficiency, and commercial boom.I couldn’t agree more! She
                not only inspires but also paves the way for future generations
                of women leaders. She is the epitome of empowerment and a true
                trailblazer for change!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section video">
      <div class="container">
        <iframe
          width="100%"
          height="415"
          src="https://www.youtube.com/embed/J21TGKC-T2s?si=cMHX1pnoic2ejdfw"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { ref } from "vue";

let slide = ref(1);
</script>
