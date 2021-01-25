import ElevatorDeviceButtonModel from '@/models/ElevatorDeviceButton.model'

export default class ElevatorDeviceModel {
  public buttons: Array<ElevatorDeviceButtonModel>

  constructor (nbButton: number) {
    // Construct the button list
    this.buttons = []
    for (let i = nbButton - 1; i >= 0; i--) {
      const button = new ElevatorDeviceButtonModel(i)
      this.buttons.push(button)
    }
  }
}
