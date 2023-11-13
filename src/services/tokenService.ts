import jwt from 'jsonwebtoken';
import redis from 'redis';

const redisClient = redis.createClient();
const REDIS_EXPIRATION_TIME = 60;

const createToken = (email: string, card_number: string, cvv: string, expiration_year: string, expiration_month: string): string => {
  const payload = { email, card_number, cvv, expiration_year, expiration_month };
  const secretKey = 'tu_clave_secreta';
  const expiresIn = '1m';

  const token = jwt.sign(payload, secretKey, { expiresIn });

  redisClient.setex(token, REDIS_EXPIRATION_TIME, JSON.stringify(payload));

  return token;
};

const getCardDetailsByToken = (token: string): Record<string, string> => {
  const secretKey = 'tu_clave_secreta';

  try {
    const decodedToken = jwt.verify(token, secretKey) as Record<string, string>;

    const storedDetails = redisClient.get(token);

    if (!storedDetails) {
      throw new Error('Token expirado o no encontrado');
    }

    return JSON.parse(storedDetails);
  } catch (error) {
    throw new Error('Token inválido');
  }
};

export default { createToken, getCardDetailsByToken };
