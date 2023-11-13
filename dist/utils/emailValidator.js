"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
const emailValidator = (email) => {
    // Validar el formato general de la dirección de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    // Obtener el dominio del correo electrónico
    const [, domain] = email.split('@');
    // Verificar si el dominio está permitido
    return allowedDomains.includes(domain);
};
exports.default = emailValidator;
