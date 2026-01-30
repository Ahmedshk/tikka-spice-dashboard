import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository.js';
import { generateAccessToken, generateRefreshToken, TokenPayload } from '../utils/jwt.util.js';
import { IUser } from '../types/user.types.js';
import { UnauthorizedError } from '../utils/errors.util.js';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string): Promise<{
    user: Omit<IUser, 'password'>;
    accessToken: string;
    refreshToken: string;
  }> {
    // Find user with password
    const user = await this.userRepository.findByEmail(email, true);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('Your account has been deactivated. Please contact an administrator.');
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    // Token verification will be handled by middleware
    // This is a placeholder for refresh token logic
    throw new Error('Refresh token logic not yet implemented');
  }

  async logout(): Promise<void> {
    // Placeholder for logout logic (token blacklisting, etc.)
    // For now, logout is handled client-side by removing cookies
  }
}
