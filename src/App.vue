<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
body, html, #app {
  font-family: 'PT Serif', serif;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.field {
  border-bottom: 1px solid black;
  outline: none;
}

.btn-primary,
.btn-primary:focus,
.btn-primary:active {
  outline: none;
  @apply bg-primary font-semibold p-3 text-white;

  &.loading {
    animation: loading 1.5s linear infinite;
  }
}

.btn-primary:hover {
  background: rgba(206, 152, 51, 0.9);
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
