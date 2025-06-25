<template>
  <q-layout view="lHh Lpr lFf">
    <header>
      <div style="" class="container row justify-between items-center">
        <div class="logo">
          <router-link :to="{ name: 'home' }">
            <img src="/images/govtlogo.svg" alt="" />
          </router-link>
        </div>

        <nav>
          <ul style="gap: 2rem" class="row text-black items-center">
            <li>
              <router-link :to="{ name: 'home' }">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'about' }"
                >About Uju Rochas</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'nutrition' }">Nutrition</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'primary.health.care' }"
                >Public Health</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'contact' }"
                >Contact Uju Rochas</router-link
              >
            </li>
          </ul>
        </nav>
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="expand_menu"
          flat
        >
          <i class="fa-solid text-black fa-bars"></i>
        </q-btn>
      </div>
    </header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list class="q-pt-lg">
        <div class="logo text-center">
          <img src="/images/govtlogo.svg" alt="" />
        </div>
        <q-item clickable :to="{ name: 'home' }">Home</q-item>
        <q-item clickable :to="{ name: 'about' }">About Uju Rochas</q-item>
        <q-item clickable :to="{ name: 'nutrition' }">Nutrition</q-item>
        <q-item :to="{ name: 'primary.health.care' }">Public Health</q-item>
        <q-item :to="{ name: 'contact' }">Contact Uju Rochas</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);

let toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
<style lang="scss" scoped>
.expand_menu {
  display: none;
}

.q-item.q-router-link--exact-active.q-router-link--active {
  background: #cabe9f;
  color: white;
  display: flex;
  align-items: center;
}

@media (max-width: 764px) {
  nav {
    display: none;
  }
  .expand_menu {
    display: flex;
    font-size: 1.5rem;
  }
}
</style>
