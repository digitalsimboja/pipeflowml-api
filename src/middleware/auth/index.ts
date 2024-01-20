if (!process.env.JWT_KEY) {
    throw new Error(`Undefined 'JWT_KEY' in authorizeUser.`);
  }
  

export const JWT_KEY = process.env.JWT_KEY;