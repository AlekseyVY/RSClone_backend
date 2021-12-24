import {
  Entity, ObjectID, ObjectIdColumn, Column,
} from 'typeorm';

@Entity({ name: 'users' })
class User {
  @ObjectIdColumn()
    id: ObjectID | undefined;

  @Column()
    login: string | undefined;

  @Column()
    password: string | undefined;
}

export default User;
