import jwt from 'jsonwebtoken'
import { SECRET } from '../config'


export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("userId is required"));
    }
    jwt.sign({ id: userId }, SECRET, (err, token) => {
        if (err) return reject(err);
        
        resolve(token);
        
      });

  });
};
