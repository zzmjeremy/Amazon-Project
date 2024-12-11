class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(car) {
    this.#brand = car.brand;
    this.#model = car.model;
  }

  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model} ${this.speed} ${this.isTrunkOpen}`
    );
  }

  go() {
    if (this.speed <= 195 && this.isTrunkOpen === false) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(raceCar) {
    super(raceCar);
    this.acceleration = raceCar.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model} ${this.speed}`);
  }

  go() {
    if (this.speed <= 300 - this.acceleration) {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {}

  closeTrunk() {}
}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });
console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.displayInfo();
car1.brake();
car1.displayInfo();
// for (let i = 1; i <= 45; i++) {
//   car2.go();
//   car2.displayInfo();
// }

car1.openTrunk();
car1.go();
car1.displayInfo();
car1.closeTrunk();
car1.displayInfo();
car1.go();
car1.openTrunk();
car1.displayInfo();

const raceCar1 = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});
// for (let i = 1; i <= 20; i++) {
//   raceCar1.go();
//   raceCar1.displayInfo();
// }
