<template>
  <div class="elevator">
    <user v-for="(user, idx) in elevator.usersInElevator" :key="idx" :user="user" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ElevatorModel from '@/models/Elevator.model'
import User from '@/components/User.vue'

@Component({
  components: { User }
})
export default class Elevator extends Vue {
  get elevator (): ElevatorModel {
    return this.$store.getters.getBuilding.elevator
  }
}
</script>

<style scoped lang="scss">
.elevator {
  background: url('https://media.gettyimages.com/photos/service-elevator-picture-id864555156?s=612x612') no-repeat center;
  background-size: contain;
  width: 200px;
  min-height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  > img {
    width: 200px;
  }
  .floor-number {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
