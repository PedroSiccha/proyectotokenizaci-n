import redis from 'redis';

const redisClient = redis.createClient();

const getCardDetailsByToken = (token: string): Record<string, string> => {
  try {
    const storedDetails = redisClient.get(token);

    if (!storedDetails) {
      throw new Error('Token expirado o no encontrado');
    }

    return JSON.parse(storedDetails);
  } catch (error) {
    throw new Error('Error al obtener detalles de la tarjeta');
  }
};

export default { getCardDetailsByToken };
