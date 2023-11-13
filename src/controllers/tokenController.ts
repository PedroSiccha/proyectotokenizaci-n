import { Request, Response } from 'express';
import tokenService from '../services/tokenService';

const createToken = (req: Request, res: Response): void => {
  try {
    const { email, card_number, cvv, expiration_year, expiration_month } = req.body;

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

    const token = tokenService.createToken(email, card_number, cvv, expiration_year, expiration_month);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Funciones de validación
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidCardNumber = (cardNumber: string): boolean => {
  const sanitizedCardNumber = cardNumber.replace(/\D/g, '');

  if (!/^\d{2,}$/.test(sanitizedCardNumber)) {
    return false;
  }

  let sum = 0;
  let double = false;

  for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedCardNumber[i], 10);

    if (double) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;

    double = !double;
  }

  return sum % 10 === 0;
};

const isValidCVV = (cvv: string): boolean => {
  return /^[0-9]{3,4}$/.test(cvv);
};

const isValidExpiration = (year: string, month: string): boolean => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  return (
    /^\d{4}$/.test(year) &&
    /^\d{1,2}$/.test(month) &&
    parseInt(year, 10) >= currentYear &&
    (parseInt(year, 10) !== currentYear || parseInt(month, 10) >= currentMonth)
  );
};

export default { createToken };
