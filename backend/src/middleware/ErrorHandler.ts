// backend/src/middleware/ErrorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class ErrorHandler {
  static handleError(res: Response, error: unknown): Response {
    console.error('Error occurred:', error);

    if (error instanceof Error) {
      switch (true) {
        case error.name === 'ValidationError':
          return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            details: error.message
          });

        case error.name === 'UnauthorizedError':
          return res.status(401).json({
            status: 'error',
            message: 'Unauthorized access'
          });

        default:
          return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            details: error.message
          });
      }
    }

    return res.status(500).json({
      status: 'error',
      message: 'Unknown error occurred'
    });
  }

  static errorMiddleware(
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
  ) {
    this.handleError(res, error);
  }
}