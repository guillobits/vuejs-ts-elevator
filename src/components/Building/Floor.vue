<template>
  <tr class="floor">
    <td>{{floor.position}}</td>
    <td>
      <ElevatorDevice :number-floors="totalFloorNumber" :floor="floor" />
    </td>
    <td>
      <user v-for="(user, idx) in floor.usersWaiting" :key="idx" :user="user" />
    </td>
    <td class="elevator-area">
      <Elevator v-if="elevator.position === floor.position"/>
    </td>
    <td>
      <user v-for="(user, idx) in floor.usersArrived" :key="idx" :user="user" />
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Elevator from '@/components/Building/ElevatorEntities/Elevator.vue'
import User from '@/components/User.vue'
import ElevatorDevice from '@/components/Building/ElevatorEntities/ElevatorDevice/ElevatorDevice.vue'
import FloorModel from '@/models/Floor.model'
import ElevatorModel from '@/models/Elevator.model'

@Component({
  components: { ElevatorDevice, User, Elevator }
})
export default class Floor extends Vue {
  @Prop({ required: true }) public floor!: FloorModel
  @Prop() public totalFloorNumber!: number

  get elevator (): ElevatorModel {
    const building = this.$store.getters.getBuilding
    return (building) ? building.elevator : null
  }
}
</script>

<style scoped lang="scss">
tr {
  border: 1px solid black;
}

td {
  padding: 15px;
}

.floor {
  .elevator-area {
    text-align: center;
  }
}
</style>
