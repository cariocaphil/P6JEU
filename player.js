
export default class Player {
  constructor(number, name, image) {
    this.number = number;
    this.name = name;
    this.image = image;
    this.posY = 0;
    this.posX = 0;
    this.previousWeapon = null;
    this.weapon = {name: 'Pair of Fists', force: 5};
    this.newWeapon = null;
    this.lifePoints = 100;
    this.previousLifePoints = 100;
    this.score = 0;
  };
  locatePosition = function (mapArray) {
    var l = 0;
    var m = 0;

    for (l = 0; l < mapArray.length; l++) {
      for (m = 0; m < mapArray[l].length; m++) {

        if ((mapArray[l][m]) === this.number) {
          this.posY = [l];
          this.posX = [m];
        }
      }
    }
  }
  getPlayerX = () => {
    return this.posX;
  }
  getPlayerY = () => {
    return this.posY;
  }
  attack = (damageBalance) => {
    const defensiveCoefficient = 1;
    const damageReceived = damageBalance * defensiveCoefficient;
    this.updateLifePoints(damageReceived);
    return this.weapon && this.weapon.force;
    ;
  }
  defend = (damageBalance) => {
    const defensiveCoefficient = 0.5;
    const damageReceived = damageBalance * defensiveCoefficient;
    this.updateLifePoints(damageReceived);
    return 0; // 0 as no damage is created on defense
  }
  updateLifePoints(damageReceived){
    this.previousLifePoints = this.lifePoints;
    this.lifePoints = this.lifePoints - damageReceived;
  }
};



