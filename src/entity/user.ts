import { IUSER_MODEL } from '../routes/userRoute/user.model';

const users: IUSER_MODEL[] = [
  {
    login: 'roman',
    password: 12345,
    character: [{ name: 'SuperRoman', level: 1 }],
  },
  {
    login: 'aleksey',
    password: 12345,
    character: [{ name: 'AlekseyVY', level: 9000 }],
  },
  {
    login: 'Ilya',
    password: 12345,
    character: [{ name: 'Ilya', level: 1 }],
  },
];

export default users;
