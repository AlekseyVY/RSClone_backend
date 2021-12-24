interface Icharacter {
  name: string;
  level: number;
}

export interface IUSER_MODEL {
  login: string;
  password: number;
  character: Icharacter[];
}
