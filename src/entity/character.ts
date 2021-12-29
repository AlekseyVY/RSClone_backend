import {
  Entity, Column, ObjectIdColumn, ObjectID,
} from 'typeorm';

@Entity({ name: 'characters' })
class Character {
  @ObjectIdColumn()
    id: ObjectID | undefined;

  @Column()
    strength: string | undefined;

  @Column()
    agility: string | undefined;

  @Column()
    instinct: string | undefined;

  @Column()
    endurance: string | undefined;

  @Column()
    accuracy: string | undefined;

  @Column()
    intellect: string | undefined;

  @Column()
    name: string | undefined;

  @Column()
    userId: string | undefined;

  @Column()
    background: string | undefined;

  @Column()
    profession: string | undefined;

  @Column()
    city: string | undefined;

  @Column()
    coins: number | undefined;

  @Column()
    healthMin: number | undefined;

  @Column()
    healthCurrent: number | undefined;

  @Column()
    stats: number | undefined;

  @Column()
    outside: boolean | undefined;

  @Column()
    object: string | undefined;

  @Column()
    coordX: number | undefined;

  @Column()
    coordY: number | undefined;

  @Column()
    locationtime: number | undefined;
}

export default Character;
