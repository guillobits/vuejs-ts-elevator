import UserModel from '@/models/User.model'

export default class FloorModel {
  readonly position!: number
  public usersWaiting: Array<UserModel> = []
  public usersArrived: Array<UserModel> = []

  constructor (p: number) {
    this.position = p
  }
}
