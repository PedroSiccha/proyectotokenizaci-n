"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luhnAlgorithm = (cardNumber) => {
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
exports.default = luhnAlgorithm;
