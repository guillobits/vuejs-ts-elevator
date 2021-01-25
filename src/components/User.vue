<template>
  <div class="user">
    <img :src="require('@/assets/elevator-user.png')" alt="Elevator user"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import UserModel from '@/models/User.model'

@Component
export default class User extends Vue {
  @Prop() public user!: UserModel
}
</script>

<style scoped lang="scss">
.user {
  img {
    height: 25px;
  }
}
</style>
