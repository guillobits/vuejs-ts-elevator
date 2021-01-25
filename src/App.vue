<template>
  <div id="app">
    <Building :number-floors="8" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Building from '@/components/Building/Building.vue'

@Component({
  components: { Building }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 50px;
}
</style>
