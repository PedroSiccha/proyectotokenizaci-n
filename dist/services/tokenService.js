"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("redis"));
// Configuración de Redis (reemplaza con tu configuración real)
const redisClient = redis_1.default.createClient();
const REDIS_EXPIRATION_TIME = 60; // en segundos
const createToken = (email, card_number, cvv, expiration_year, expiration_month) => {
    // Validar la información según tus requisitos
    const payload = { email, card_number, cvv, expiration_year, expiration_month };
    const secretKey = 'tu_clave_secreta'; // Reemplaza con tu clave secreta real
    const expiresIn = '1m'; // Expiración de 1 minuto para fines prácticos
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
    // Almacenar el token en Redis con expiración
    redisClient.setex(token, REDIS_EXPIRATION_TIME, JSON.stringify(payload));
    return token;
};
const getCardDetailsByToken = (token) => {
    // Verificar y obtener detalles de la tarjeta desde Redis
    const secretKey = 'tu_clave_secreta'; // Reemplaza con tu clave secreta real
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        // Obtener detalles de la tarjeta de la base de datos no relacional (Redis)
        const storedDetails = redisClient.get(token);
        if (!storedDetails) {
            throw new Error('Token expirado o no encontrado');
        }
        return JSON.parse(storedDetails);
    }
    catch (error) {
        throw new Error('Token inválido');
    }
};
exports.default = { createToken, getCardDetailsByToken };
