export default {
      server: {
        port: process.env.PORT || 3000,
      },
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        // Agrega más configuraciones de Redis según sea necesario
      },
      jwt: {
        secretKey: process.env.JWT_SECRET || 'tu_clave_secreta',
        expiresIn: process.env.JWT_EXPIRES_IN || '1m',
      },
      allowedDomains: ['gmail.com', 'hotmail.com', 'yahoo.es'],
    };
    