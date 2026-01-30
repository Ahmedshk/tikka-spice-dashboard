import { UserModel, UserDocument } from '../models/user.model.js';
import { IUser } from '../types/user.types.js';

export class UserRepository {
  async create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<UserDocument> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await UserModel.findById(id);
  }

  async findByEmail(email: string, includePassword = false): Promise<UserDocument | null> {
    const query = UserModel.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      return await query.select('+password');
    }
    return await query;
  }

  async findAll(): Promise<UserDocument[]> {
    return await UserModel.find();
  }

  async updateById(id: string, updateData: Partial<IUser>): Promise<UserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findByRole(role: string): Promise<UserDocument[]> {
    return await UserModel.find({ role });
  }
}
