const uuid = require('uuid').v4;

export interface IUser {
  id: number;
  login: string;
  password: string;
}

class User {
  public id: number;

  public login: string;

  public password: string;

  constructor({
    id = uuid(),
    login,
    password,
  }: IUser) {
    this.id = id;
    this.login = login;
    this.password = password;
  }
}

export default User;
