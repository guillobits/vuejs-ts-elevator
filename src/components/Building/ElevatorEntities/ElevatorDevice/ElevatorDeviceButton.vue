<template>
  <div class="elevator-device-button">
    <button @click="btnPressed" :disabled="disabled">{{button.floor}}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FloorModel from '@/models/Floor.model'
import UserModel from '@/models/User.model'
import ElevatorDeviceButtonModel from '@/models/ElevatorDeviceButton.model'

@Component
export default class ElevatorDeviceButton extends Vue {
  @Prop({ required: true }) public floor!: FloorModel;
  @Prop({ required: true }) public button!: ElevatorDeviceButtonModel;
  @Prop() private disabled!: boolean;

  btnPressed (): void {
    const user = new UserModel(this.button.floor)
    if (this.button.floor !== this.floor.position) {
      this.floor.usersWaiting.push(user)
    }
  }
}
</script>
