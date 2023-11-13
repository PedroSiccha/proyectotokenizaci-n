"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
// Configuración de Redis (reemplaza con tu configuración real)
const redisClient = redis_1.default.createClient();
const getCardDetailsByToken = (token) => {
    try {
        // Obtener detalles de la tarjeta desde la base de datos no relacional (Redis)
        const storedDetails = redisClient.get(token);
        if (!storedDetails) {
            throw new Error('Token expirado o no encontrado');
        }
        return JSON.parse(storedDetails);
    }
    catch (error) {
        throw new Error('Error al obtener detalles de la tarjeta');
    }
};
exports.default = { getCardDetailsByToken };
