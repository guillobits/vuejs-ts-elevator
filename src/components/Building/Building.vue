<template>
  <table class="building" v-if="building">
    <Floor
      v-for="(f, idx) in reversedFloors"
      :key="idx"
      :floor="f"
      :total-floor-number="numberFloors"
    />
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Floor from '@/components/Building/Floor.vue'
import BuildingModel from '@/models/Building.model'
import ElevatorModel from '@/models/Elevator.model'
import FloorModel from '@/models/Floor.model'

@Component({
  components: { Floor }
})
export default class Building extends Vue {
  @Prop() public numberFloors!: number;
  private building!: BuildingModel;
  private ran = false

  get elevator (): ElevatorModel {
    return this.building.elevator
  }

  get reversedFloors (): Array<FloorModel> {
    return [...this.building.floors].reverse()
  }

  get currentFloor (): FloorModel {
    return this.building.floors[this.elevator.position]
  }

  created (): void {
    this.building = new BuildingModel(this.numberFloors)
    this.$store.commit('setBuilding', this.building)
  }

  mounted (): void {
    if (!this.ran) {
      this.actionLoop(0)
    }
  }

  actionLoop (loop = 0) {
    this.ran = true
    if (this.elevator.usersInElevator.length <= 0) {
      this.goToClosetFloorWithUser()
    } else {
      this.goToFirstUserDestination()
    }
    // Move all users in current floor to elevator if exists
    if (this.currentFloor.usersWaiting.length) {
      this.currentFloor.usersWaiting.forEach(u => {
        this.elevator.userEnterInElevator(u)
      })
      this.currentFloor.usersWaiting = []
    }

    console.log('size = ', this.elevator.usersInElevator.length)
    // Move users arrived at destination
    for (const u of this.elevator.usersInElevator) {
      console.log('Traitement d un user')
      if (u.destinationFloor === this.elevator.position) {
        this.currentFloor.usersArrived.push(u)
        this.elevator.userLeaveElevator(u)
      }
    }
    setTimeout(() => {
      this.actionLoop(loop + 1)
    }, 1000)
  }

  goToClosetFloorWithUser (): void {
    const direction = this.closestUserPositionFromElevator()
    if (direction !== null) {
      if (direction > this.elevator.position) {
        this.elevator.up()
      } else if (direction < this.elevator.position) {
        this.elevator.down()
      }
    }
  }

  goToFirstUserDestination (): void {
    // In case user inside the elevator
    const direction = this.elevator.usersInElevator[0].destinationFloor
    if (direction > this.elevator.position) {
      this.elevator.up()
    } else if (direction < this.elevator.position) {
      this.elevator.down()
    }
  }

  closestUserPositionFromElevator (): number | null {
    const elevatorPosition = this.elevator.position

    // Navigate in floor to find closest user waiting for elevator
    for (let shift = 0; shift <= this.numberFloors; shift++) {
      const positionUp = elevatorPosition + shift
      const positionDown = elevatorPosition - shift

      // Find with positive shift
      if (positionUp < this.building.floors.length) {
        const waitingUserInFloor = this.building.floors[positionUp].usersWaiting
        if (waitingUserInFloor.length > 0) return this.building.floors[positionUp].position
      }

      // Find with negative shift
      if (positionDown >= 0) {
        const waitingUserInFloor = this.building.floors[positionDown].usersWaiting
        if (waitingUserInFloor.length > 0) return this.building.floors[positionDown].position
      }
    }
    return null
  }
}
</script>

<style scoped lang="scss">
table.building {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  table-layout: auto;
}
</style>
