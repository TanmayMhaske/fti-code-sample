// backend/src/types/User.ts
export type UserRole = 'ADMIN' | 'MANAGER' | 'CONTRIBUTOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// Generic Repository Interface
export interface Repository<T> {
  create(item: Omit<T, 'id' | 'createdAt'>): Promise<T>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Advanced Utility Type: Partial Nested
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Conditional Type for Permission Checks
type PermissionCheck<T extends UserRole> =
  T extends 'ADMIN' ? true : false;