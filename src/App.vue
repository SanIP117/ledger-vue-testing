<template>
  <div id="app">
    <Ledger />
  </div>
</template>

<script>
import Ledger from './components/Ledger.vue'

export default {
  name: 'App',
  components: {
    Ledger
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
