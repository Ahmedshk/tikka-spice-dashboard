import { UserRepository } from '../repositories/user.repository.js';
import { UserDocument } from '../models/user.model.js';
import { IUser } from '../types/user.types.js';

function toIUser(doc: UserDocument): IUser {
  const { _id, ...rest } = doc;
  return { ...rest, _id: _id.toString() } as IUser;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const doc = await this.userRepository.create(userData);
    return toIUser(doc);
  }

  async getUserById(id: string): Promise<IUser | null> {
    const doc = await this.userRepository.findById(id);
    return doc ? toIUser(doc) : null;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const doc = await this.userRepository.findByEmail(email);
    return doc ? toIUser(doc) : null;
  }

  async getAllUsers(): Promise<IUser[]> {
    const docs = await this.userRepository.findAll();
    return docs.map(toIUser);
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    const doc = await this.userRepository.updateById(id, updateData);
    return doc ? toIUser(doc) : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteById(id);
  }
}
