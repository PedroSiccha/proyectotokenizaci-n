import { Request, Response } from 'express';
import cardController from '../src/controllers/cardController';
import tokenService from '../src/services/tokenService';

jest.mock('../src/services/tokenService');

describe('Card Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get card details successfully', () => {
    const req: Partial<Request> = {
      query: {
        token: 'valid_token',
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    tokenService.getCardDetailsByToken.mockReturnValueOnce({
      email: 'test@gmail.com',
      card_number: '4111111111111111',
      cvv: '123',
      expiration_year: '2025',
      expiration_month: '09'
    });

    cardController.getCardDetails(req as Request, res as Response);

    expect(tokenService.getCardDetailsByToken).toHaveBeenCalledWith('valid_token');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      card_number: '4111111111111111',
      cvv: '123',
      expiration_year: '2025',
      expiration_month: '09'
    });
  });

  it('should handle invalid or missing token', () => {
    const req: Partial<Request> = {
      query: {
        
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    cardController.getCardDetails(req as Request, res as Response);

    expect(tokenService.getCardDetailsByToken).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
  });

  it('should handle token retrieval error', () => {
    const req: Partial<Request> = {
      query: {
        token: 'error_token',
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    tokenService.getCardDetailsByToken.mockImplementationOnce(() => {
      throw new Error('Token inválido');
    });

    cardController.getCardDetails(req as Request, res as Response);

    expect(tokenService.getCardDetailsByToken).toHaveBeenCalledWith('error_token');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
  });
});
