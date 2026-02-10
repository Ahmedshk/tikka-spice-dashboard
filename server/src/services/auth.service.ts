import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload,
} from "../utils/jwt.util.js";
import { IUser } from "../types/user.types.js";
import { UnauthorizedError } from "../utils/errors.util.js";

export class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    user: Omit<IUser, "password">;
    accessToken: string;
    refreshToken: string;
  }> {
    // Find user with password (select('+password') returns document with password)
    const user = await this.userRepository.findByEmail(email, true);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Verify password (user has password when found with includePassword: true)
    const userWithPassword = user as typeof user & { password: string };
    const isPasswordValid = await bcrypt.compare(password, userWithPassword.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError(
        "Your account has been deactivated. Please contact an administrator."
      );
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Return user without password (toObject() already omits password per model)
    const userWithoutPassword = user.toObject();

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string): Promise<{
    user: Omit<IUser, "password">;
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = verifyRefreshToken(token);
    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    if (!user.isActive) {
      throw new UnauthorizedError("Your account has been deactivated.");
    }
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    const userWithoutPassword = user.toObject();
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async logout(): Promise<void> {
    // Placeholder for logout logic (token blacklisting, etc.)
    // For now, logout is handled client-side by removing cookies
  }
}
