<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
body, html, #app {
  font-family: 'PT Serif', serif;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: "Circular Std";
  src: url("assets/fonts/CircularStd-Book.eot");
  src: url("assets/fonts/CircularStd-Book.woff") format("woff"),
       url("assets/fonts/CircularStd-Book.otf") format("opentype"),
       url("assets/fonts/CircularStd-Book.svg#filename") format("svg");
}

.field {
  border-bottom: 1px solid black;
  outline: none;
}

.btn-primary,
.btn-primary:focus,
.btn-primary:active {
  outline: none;
  font-family: 'Circular Std';
  @apply bg-primary text-white border border-primary;

  &.loading {
    animation: loading 1.5s linear infinite;
  }
}

.btn-primary:hover {
  background: rgba(206, 152, 51, 0.9);
}

.btn-primary-outline,
.btn-primary-outline:focus,
.btn-primary-outline:active {
  outline: none;
  font-family: 'Circular Std';
  @apply bg-transparent border border-primary;
}

.btn-primary-outline:hover {
  @apply bg-primary text-white;
}

.btn-primary,
.btn-primary-outline {
  @apply p-3;
}

.input-fields {
  border-bottom: 1px solid black;

  input {
    outline: none;
  }
}

// This is just an idea for an animation, it can change
@keyframes loading {
  0% {
    background: #CE9833;
  }

  25% {
    background: #D6A853;
  }

  50% {
    background: #DDB872;
  }

  75% {
    background: #D6A853;
  }

  100% {
    background: #CE9833;
  }
}
</style>
