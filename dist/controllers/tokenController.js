"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = __importDefault(require("../services/tokenService"));
const createToken = (req, res) => {
    try {
        const { email, card_number, cvv, expiration_year, expiration_month } = req.body;
        // Validaciones de datos
        if (!isValidEmail(email)) {
            throw new Error('Email inválido');
        }
        if (!isValidCardNumber(card_number)) {
            throw new Error('Número de tarjeta inválido');
        }
        if (!isValidCVV(cvv)) {
            throw new Error('CVV inválido');
        }
        if (!isValidExpiration(expiration_year, expiration_month)) {
            throw new Error('Fecha de expiración inválida');
        }
        // Lógica de creación de token
        const token = tokenService_1.default.createToken(email, card_number, cvv, expiration_year, expiration_month);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};
// Funciones de validación
const isValidEmail = (email) => {
    // Implementa lógica de validación de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const isValidCardNumber = (cardNumber) => {
    // Eliminar espacios y caracteres no numéricos
    const sanitizedCardNumber = cardNumber.replace(/\D/g, '');
    // Verificar que el número de tarjeta sea numérico y tenga al menos dos dígitos
    if (!/^\d{2,}$/.test(sanitizedCardNumber)) {
        return false;
    }
    let sum = 0;
    let double = false;
    // Aplicar el algoritmo de Luhn desde la derecha hacia la izquierda
    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedCardNumber[i], 10);
        // Duplicar cada segundo dígito
        if (double) {
            digit *= 2;
            // Restar 9 si el resultado es mayor a 9
            if (digit > 9) {
                digit -= 9;
            }
        }
        // Sumar el dígito al total
        sum += digit;
        // Alternar entre duplicar y no duplicar
        double = !double;
    }
    // La tarjeta es válida si la suma es un múltiplo de 10
    return sum % 10 === 0;
};
const isValidCVV = (cvv) => {
    // Implementa lógica de validación de CVV
    return /^[0-9]{3,4}$/.test(cvv);
};
const isValidExpiration = (year, month) => {
    // Implementa lógica de validación de fecha de expiración
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    return (/^\d{4}$/.test(year) &&
        /^\d{1,2}$/.test(month) &&
        parseInt(year, 10) >= currentYear &&
        (parseInt(year, 10) !== currentYear || parseInt(month, 10) >= currentMonth));
};
exports.default = { createToken };
