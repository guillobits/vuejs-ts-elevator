import UserModel from '@/models/User.model'

export default class ElevatorModel {
  private users: Array<UserModel> = []
  public position = 0
  readonly maxPosition: number

  constructor (maxPosition: number) {
    this.maxPosition = maxPosition
  }

  get usersInElevator () {
    return this.users
  }

  up () {
    this.position = (this.position >= this.maxPosition) ? this.position : this.position + 1
  }

  down () {
    this.position = (this.position <= 0) ? this.position : this.position - 1
  }

  userEnterInElevator (user: UserModel) {
    this.users.push(user)
  }

  userLeaveElevator (user: UserModel) {
    this.users = this.users.filter(u => {
      return u !== user
    })
  }
}
