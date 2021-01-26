<template>
  <div class="elevator-device">
    <elevator-device-button
      :button="b"
      v-for="(b, idx) in elevatorDevice.buttons"
      :key="idx"
      :floor="floor"
      :disabled="floor.position === b.floor"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ElevatorDeviceButton from '@/components/Building/ElevatorEntities/ElevatorDevice/ElevatorDeviceButton.vue'
import FloorModel from '@/models/Floor.model'
import ElevatorDeviceModel from '@/models/ElevatorDevice.model'

@Component({
  components: { ElevatorDeviceButton }
})
export default class ElevatorDevice extends Vue {
  @Prop({ required: true }) public numberFloors!: number;
  @Prop({ required: true }) private floor!: FloorModel;
  private elevatorDevice: ElevatorDeviceModel;

  constructor () {
    super()
    this.elevatorDevice = new ElevatorDeviceModel(this.numberFloors)
  }
}
</script>
