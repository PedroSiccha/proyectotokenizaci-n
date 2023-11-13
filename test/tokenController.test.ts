import { Request, Response } from 'express';
import tokenController from '../src/controllers/tokenController';
import tokenService from '../src/services/tokenService';

jest.mock('../src/services/tokenService');

describe('Token Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a token successfully', () => {
    const req: Partial<Request> = {
      body: {
        email: 'test@gmail.com',
        card_number: '4111111111111111',
        cvv: '123',
        expiration_year: '2025',
        expiration_month: '09',
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    tokenService.createToken.mockReturnValueOnce('mocked_token');

    tokenController.createToken(req as Request, res as Response);

    expect(tokenService.createToken).toHaveBeenCalledWith(
      'test@gmail.com',
      '4111111111111111',
      '123',
      '2025',
      '09'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'mocked_token' });
  });

  it('should handle token creation error', () => {
    const req: Partial<Request> = {
      body: {
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    tokenService.createToken.mockImplementationOnce(() => {
      throw new Error('Datos inválidos');
    });

    tokenController.createToken(req as Request, res as Response);

    expect(tokenService.createToken).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Datos inválidos' });
  });
});
