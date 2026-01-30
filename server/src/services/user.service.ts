import { UserRepository } from '../repositories/user.repository.js';
import { IUser } from '../types/user.types.js';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    // Placeholder for user creation logic
    // Will include password hashing, validation, etc.
    return await this.userRepository.create(userData);
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await this.userRepository.updateById(id, updateData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteById(id);
  }
}
