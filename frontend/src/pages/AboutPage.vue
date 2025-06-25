<template>
  <q-page class="">
    <section>
      <div class="about about2 hero container">
        <div class="">
          <q-carousel animated v-model="slide" infinite>
            <q-carousel-slide
              style="background-position: 30%"
              :name="1"
              img-src="/images/about.jpg"
            />
            <q-carousel-slide
              style="background-position: 35%"
              :name="2"
              img-src="/images/hero2.jpg"
            />
            <q-carousel-slide :name="3" img-src="/images/hero3.jpg" />
          </q-carousel>

          <div class="content"><h3>About</h3></div>
        </div>
      </div>
    </section>

    <section class="section aboutme">
      <div class="container">
        <div class="grid">
          <div class="left">
            <h5>A Trailblazer in Public Health and Sustainable Development</h5>
            <p class="">
              <br />

              Uju Rochas-Anwukah is a distinguished leader in the fields of
              public health and sustainable development. With a diverse
              educational background, including a first-class degree in
              Biochemistry and Mathematics from Southern Methodist University,
              Dallas, Texas, a certificate in Sustainable Business Strategy from
              Harvard, an ongoing law degree from Baze University, and a
              Master's in Global Health from King's College London, she
              possesses a wealth of knowledge and skills that have driven
              impactful change in communities globally. <br />
              <br />
              Currently, Uju serves as the Special Assistant to the President in
              Public Health at the Office of the Vice President. She also holds
              the position of Focal Person on Nutrition at the OVP and acts as
              the Coordinator of the Nutrition Core Working Committee, bringing
              a specialized focus to nutritional initiatives within public
              health. Her strategic planning abilities, coupled with her
              expertise in project management and stakeholder engagement, have
              been instrumental in the success of her endeavors.
            </p>
          </div>

          <div class="right">
            <img src="/images/quotes.png" alt="" />
          </div>
        </div>
        <div class="q-my-xl">
          <div class="grid alt">
            <div class="left">
              <p class="">
                As the Founder of the U-Save Foundation, Uju has spearheaded
                numerous initiatives focused on clean water access, sanitation
                solutions, and hygiene education for disadvantaged communities.
                Her work has positively impacted thousands of individuals,
                empowering young girls, providing health services to rural
                communities, and promoting sustainable development practices.
              </p>
              <p class="q-mt-lg">
                Her commitment to public health has earned her recognition as a
                fellow of the African Institute of Public Health Professionals.
                She continues to inspire others through her speaking engagements
                and involvement in various organizations, such as the Rochas
                Foundation, where she serves on the board. Her dedication to
                improving healthcare access and advocating for social justice
                has earned her several accolades.
              </p>
            </div>

            <div class="right">
              <img src="/images/annual.jpg" alt="" />
            </div>
          </div>
        </div>

        <div class="q-px-lg q-py-md">
          <q-timeline :layout="layout" color="secondary">
            <q-timeline-entry heading> Areas of Expertise </q-timeline-entry>

            <q-timeline-entry
              icon="radio_button_unchecked"
              title="WASH"
              subtitle="Water, Sanitation, and Hygiene"
              side="left"
            >
              <div>
                Uju has extensive experience in designing and executing WASH
                projects, ensuring access to clean water, proper sanitation, and
                hygiene education for needy communities.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Public Health"
              subtitle="Primary Health Care"
              side="right"
              icon="radio_button_unchecked"
            >
              <div>
                With a strong background in public health, Uju has hands-on
                experience in implementing health-related initiatives and
                programs that have positively impacted communities.
              </div>
            </q-timeline-entry>
            <q-timeline-entry
              icon="radio_button_unchecked"
              title="Mentorship"
              side="left"
            >
              <div>
                Uju is passionate about providing mentorship for young boys and
                girls, offering guidance and support in navigating their life
                paths.
              </div>
            </q-timeline-entry>
            <q-timeline-entry
              icon="radio_button_unchecked"
              title="Nutrition"
              side="right"
            >
              <div>
                As the Focal Person on Nutrition at the OVP, Uju brings a
                specialized focus to nutritional initiatives within public
                health.
              </div>
            </q-timeline-entry>
          </q-timeline>
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
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

let slide = ref(1);
const $q = useQuasar();

let layout = computed(() => {
  return $q.screen.lt.sm ? "dense" : $q.screen.lt.md ? "comfortable" : "loose";
});
</script>
