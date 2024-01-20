import { JWT } from "../middleware/auth/interface";
import { User } from "../entities/user";
import { sign } from 'jsonwebtoken';
import { JWT_KEY } from "../middleware/auth";


export const signUserToken = (user: User) => {
    return sign(
      {
        email: user.email,
        user: {
          id: user.id,
        },
      } as JWT,
      JWT_KEY,
      {
        expiresIn: '30d',
      }
    );
  };