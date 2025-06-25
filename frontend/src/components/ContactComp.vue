<template>
  <section class="section">
    <div class="wrap container">
      <div class="grid">
        <div class="">
          <div class="head_text">Get in Touch</div>
          <p class="section-desc contact q-mt-md">
            We're here to answer your questions, provide information, and
            discuss how we can assist you in achieving your goals. Feel free to
            reach out to us using the following contact options:
          </p>
          <!-- @submit.prevent="sendMessage" -->
          <form class="q-mt-xl" @submit.prevent="sendMessage">
            <div class="inputs">
              <div class="input">
                <label for="">Full Name</label>
                <input
                  required
                  v-model="data.name"
                  type="text"
                  name="Fullname"
                  placeholder="Enter your full name"
                />
              </div>

              <div class="input">
                <label for="">Email</label>
                <input
                  v-model="data.email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div class="input">
                <label for="">Phone</label>
                <input
                  v-model="data.phoneNumber"
                  type="text"
                  required
                  name="phone"
                  placeholder="Enter your phone number"
                />
              </div>

              <div class="input">
                <label for="">Ask your question</label>
                <textarea
                  v-model="data.message"
                  name="message"
                  required
                  cols="20"
                  rows="10"
                ></textarea>
              </div>

              <q-btn
                no-caps
                type="submit"
                :loading="loading"
                class="btn btn-primary q-mt-lg"
                >Send message</q-btn
              >
            </div>
          </form>
        </div>

        <div class="">
          <div class="img">
            <img src="/images/annual.jpg" alt="" />
          </div>

          <h5>Call Us Today or Leave a Message</h5>

          <div class="hold_det">
            <div class="call">
              <div class="icon"><i class="fa-solid fa-phone"></i></div>

              <div class="det">
                <a href="tel:+2347007310000" class="footer-item-link">
                  07007310000</a
                >
              </div>
            </div>
            <div class="call">
              <div class="icon">
                <i class="fa-solid fa-envelope"></i>
              </div>

              <div class="det">
                <div class="">
                  <a
                    target="_blank"
                    href="mailto:info@ujurochas.com"
                    class="footer-item-link"
                    >info@ujurochas.com</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="call">
            <div class="det">
              <address style="gap: 1rem" class="row items-start no-wrap">
                <span
                  ><i class="fa-solid text-primary fa-location-dot"></i
                ></span>
                <span>
                  <span class="text-weight-bold"> Office Address: </span> 1
                  Unity House , 24 Nkwerre Street Area 11, Garki, Abuja
                  900247</span
                >
              </address>
            </div>
          </div>
        </div>
      </div>
      <div
        class="q-mt-xl"
        style="overflow: hidden; max-width: 100%; width: 100%; height: 500px"
      >
        <div
          style="overflow: hidden; max-width: 100%; width: 100%; height: 500px"
        >
          <div
            id="embedded-map-display"
            style="height: 100%; width: 100%; max-width: 100%"
          >
            <iframe
              style="height: 100%; width: 100%; border: 0"
              frameborder="0"
              src="https://www.google.com/maps/embed/v1/place?q=Unity+House+,+24+Nkwerre+Street+Area+11,+Garki,+Abuja+900247&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>

  <q-dialog v-model="responseDialog" class="response">
    <q-card>
      <div class="column q-pa-md items-center justify-center text-center">
        <div class="row justify-center">
          <i class="ri-checkbox-circle-line text-h3 text-green"></i>
        </div>
        <h5 class="text-weight-bold">Success</h5>

        <p class="q-mt-md">
          Dear {{ data?.name }}, Thank you for reaching out to us . We have
          received your inquiry and appreciate your interest in reaching out to
          us. Our team is reviewing your request and will get back to you
          shortly with more information tailored to your needs. In the meantime,
          we are happy to receive your message.
        </p>
      </div>

      <q-card-actions align="right">
        <q-btn flat label="Okay" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import { Notify } from "quasar";
import { api } from "src/boot/axios";
let bar = ref(false);
let loading = ref(false);
let responseDialog = ref(false);
let data = ref({});

const closeModal = () => {
  data.value = {};
  responseDialog.value = false;
};
const sendMessage = async () => {
  try {
    let dataa = {
      ...data.value,
      // origin: `${window.location.origin}`,
    };
    loading.value = true;
    let response = await axios.post("https://formspree.io/f/xrbggvwp", dataa);
    loading.value = false;

    Notify.create({
      message:
        "Your message has been successfully sent, we are glad to hear from you and we would reach out soon.",
      position: "top-right",
      timeout: 3000,
      actions: [{ icon: "close", color: "white" }],
      color: "green",
    });
    responseDialog.value = true;
    // console.log(response);
  } catch ({ response }) {
    loading.value = false;
    console.log(response);
    Notify.create({
      message:
        "Sorry your message could not be sent at this time. Please try again soon.",
      position: "top-right",
      actions: [{ icon: "close", color: "white" }],
      color: "red",
    });
  }
};
</script>

<style scoped>
.wrapper {
  padding-top: 3rem;
  position: relative;
  margin: 1rem 0 4rem;
  padding-bottom: 1rem;
}
#g-mapdisplay img {
  max-width: none !important;
  background: none !important;
  font-size: inherit;
  font-weight: inherit;
}
img {
  width: 100%;
}

a {
  display: inline;
}
.mapouter {
  position: relative;
  text-align: right;
  width: 100%;
  height: 400px;
  padding: 4rem 0;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  width: 100%;
  height: 400px;
}
.gmap_iframe {
  width: 100% !important;
  height: 400px !important;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.hold_dia {
  background: white;
  padding: 3rem 1rem;
}

input:focus,
textarea:focus {
  outline: none;
}

.hold_dia .top {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
}

.contact_row {
  gap: 2rem;
}

.head_text {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
}
.icon {
  display: grid;
  place-items: center;
  /* animation: zoom 4s infinite; */
  transition: all 0.5s ease-in-out;
}

.icon i {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
}

.call {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.call a {
  color: var(--st-patricks-blueL);
  text-decoration: underline;
}

.call .span {
  font-weight: bold;
}

/* @keyframes zoom {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(0.9);
    opacity: 1;
    transform: scale(1);
  }
} */

.head_desc {
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 1rem;
}

label {
  /* color: black; */
  font-style: normal;
  font-weight: 500;
  font-size: 12.3667px;
  line-height: 20px;
}
input {
  border: none;
  background: var(--st-patricks-blueL);
}
.inputs .input input,
.inputs .input textarea {
  background-color: var(--white);
  box-shadow: var(--shadow-1);
  padding: 0.85rem;
  width: 100%;
  margin: 1rem 0;
  color: black;
  border: none;
  border-radius: 3px;
}

::placeholder {
  color: var(--cadet-grey);
  font-size: 12px;
}
.bg {
  width: 150px;
  position: absolute;
  right: 0;
  top: 0%;
}

.img {
  position: relative;
  max-height: 400px;
  margin-bottom: 1rem;
}

.img img {
  /* position: absolute; */
  /* height: 100%; */
  /* object-fit: contain; */
  margin-top: 1rem;
  border-radius: 10px;
}
address {
  font-size: 12px;
}

@media (max-width: 800px) {
  .contact_row {
    flex-wrap: wrap;
  }

  .img {
    position: relative;
    height: 300px;
  }
  h4 {
    font-size: 1.4rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 500px) {
  .det div,
  .det a {
    font-size: 13px;
  }

  .det {
    margin: 0;
  }

  .head_text {
    font-size: 25px;
  }
  .head_desc {
    font-size: 18px;
    margin-top: 0;
    padding: 0;
  }
  .inputs .input input,
  .inputs .input textarea {
    font-size: 12px;
  }
}
</style>
