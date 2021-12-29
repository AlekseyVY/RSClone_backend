const uuid = require('uuid').v4;

export interface ICharacter {
  id: number;
  strength: string;
  agility: string;
  instinct: string;
  endurance: string;
  accuracy: string;
  intellect: string;
  name: string;
  userId: string;
  background: string;
  profession: string;
  city: string;
  coins: number;
  healthMin: number;
  healthCurrent: number;
  stats: number;
  outside: boolean;
  object: string;
  coordX: number;
  coordY: number;
  locationtime: number;
}

class Character {
  public userId: string;

  public id: number;

  public strength: string;

  public agility: string;

  public instinct: string;

  public endurance: string;

  public accuracy: string;

  public intellect: string;

  public name: string;

  public background: string;

  public profession: string;

  public city: string;

  public coins: number;

  public healthMin: number;

  public healthCurrent: number;

  public stats: number;

  public outside: boolean;

  public object: string;

  public coordX: number;

  public coordY: number;

  public locationtime: number;

  constructor({
    id = uuid(),
    strength,
    agility,
    instinct,
    endurance,
    accuracy,
    intellect,
    name,
    userId,
    background,
    profession,
    city,
    coins,
    healthMin,
    healthCurrent,
    stats,
    outside,
    object,
    coordX,
    coordY,
    locationtime,
  }: ICharacter) {
    this.id = id;
    this.userId = userId;
    this.strength = strength;
    this.agility = agility;
    this.instinct = instinct;
    this.endurance = endurance;
    this.accuracy = accuracy;
    this.intellect = intellect;
    this.name = name;
    this.background = background;
    this.profession = profession;
    this.city = city;
    this.coins = coins;
    this.healthMin = healthMin;
    this.healthCurrent = healthCurrent;
    this.stats = stats;
    this.outside = outside;
    this.object = object;
    this.coordX = coordX;
    this.coordY = coordY;
    this.locationtime = locationtime;
  }
}

export default Character;
