"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = __importDefault(require("../services/tokenService"));
const getCardDetails = (req, res) => {
    try {
        const { token } = req.query;
        // Validación de token
        if (!token || typeof token !== 'string') {
            throw new Error('Token inválido');
        }
        // Lógica para obtener detalles de la tarjeta por el token
        const cardDetails = tokenService_1.default.getCardDetailsByToken(token);
        res.status(200).json(cardDetails);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};
exports.default = { getCardDetails };
