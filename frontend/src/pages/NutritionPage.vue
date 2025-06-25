<template>
  <q-page class="">
    <section>
      <div class="about hero container">
        <div class="left">
          <q-carousel
            animated
            :autoplay="true"
            v-model="slide"
            arrows
            navigation
            infinite
          >
            <q-carousel-slide
              style="background-position: 30%"
              :name="1"
              img-src="/images/ng.jpg"
            />
            <q-carousel-slide
              style="background-position: 35%"
              :name="2"
              img-src="/images/img3.jpg"
            />
            <!-- <q-carousel-slide :name="3" img-src="/images/img5.jpg" /> -->
          </q-carousel>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h4 class="text-h4 text-weight-bold text-center">Nutrition</h4>
        <p class="text-center text-info section_para q-mt-md">
          Grateful for the successful ANRiN event The high-level dialogue
          between the National Council on Nutrition and the faith leaders
          provided a platform for strategic discussions and commitments towards
          sustainable nutrition investments for the benefit of all Nigerians.
        </p>

        <div class="q-mt-xl">
          <div class="grid two">
            <div class="left">
              <div>
                <img src="/images/show2.png" alt="" />
              </div>
              <p class="q-mt-sm text-info">
                The USAID Advancing Nutrition FY25 Work Plan Co-Creation
                Workshop ignited a crucial dialogue on tackling Nigeria's silent
                crisis—malnutrition. Key stakeholders in collaboration with the
                Office of the Vice President set the stage for transformative
                nutrition interventions across our nation. This isn't just a
                meeting; it's a call to action. Together, we are determined to
                turn challenges into opportunities for every Nigerian,
                especially our women, children, and adolescents.
              </p>
            </div>
            <div class="right">
              <div>
                <img src="/images/show1.png" alt="" />
              </div>
              <p class="q-mt-sm text-info">
                Grateful for the successful ANRiN event The high-level dialogue
                between the National Council on Nutrition and the faith leaders
                provided a platform for strategic discussions and commitments
                towards sustainable nutrition investments for the benefit
                of all Nigerians.
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
