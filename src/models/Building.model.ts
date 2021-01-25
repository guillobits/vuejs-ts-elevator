import FloorModel from '@/models/Floor.model'
import ElevatorModel from '@/models/Elevator.model'

export default class BuildingModel {
  public floors: Array<FloorModel> = [];
  public elevator: ElevatorModel;

  constructor (nbFloor: number) {
    this.floors = []
    for (let f = 0; f < nbFloor; f++) {
      this.floors.push(new FloorModel(f))
    }
    this.elevator = new ElevatorModel(nbFloor)
  }
}
