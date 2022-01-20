export interface IPlayer {
  x: number,
  y: number,
  rotation: number,
  playerId: string,
  firing: boolean
}

export const players: {[index: string]: IPlayer} = {};

export interface IHp {
  hp: number
  playerId: string
  id: string
}

export const hp: {[index: string]: IHp} = {};
