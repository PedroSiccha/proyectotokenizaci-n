import { Request, Response } from 'express';
import tokenService from '../services/tokenService';

const getCardDetails = (req: Request, res: Response): void => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      throw new Error('Token inválido');
    }

    const cardDetails = tokenService.getCardDetailsByToken(token);

    res.status(200).json(cardDetails);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export default { getCardDetails };
