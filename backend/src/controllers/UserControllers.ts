// backend/src/controllers/UserController.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../services/UserService';
import { ErrorHandler } from '../middleware/ErrorHandler';

// Advanced TypeScript: Strongly typed input validation
const CreateUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2+ characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  role: z.enum(['ADMIN', 'MANAGER', 'CONTRIBUTOR'])
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

export class UserController {
  constructor(private userService: UserService) {}

  // Generics and type-safe error handling
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreateUserInput = CreateUserSchema.parse(req.body);
      const user = await this.userService.create(validatedData);
      
      res.status(201).json({
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  }
}