import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/database.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserRole } from '../types/user.types.js';
import { logger } from '../utils/logger.util.js';

// Load environment variables
dotenv.config();

const createOwner = async () => {
  try {
    // Connect to database
    await connectDatabase();

    const userRepository = new UserRepository();

    // Default owner credentials (can be overridden via environment variables)
    const email = process.env.OWNER_EMAIL || 'owner@tikkaspice.com';
    const password = process.env.OWNER_PASSWORD || 'Admin@123';
    const firstName = process.env.OWNER_FIRST_NAME || 'Owner';
    const lastName = process.env.OWNER_LAST_NAME || 'Admin';

    // Check if owner already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      logger.warn(`User with email ${email} already exists`);
      console.log(`\n❌ User with email ${email} already exists!`);
      console.log(`   If you want to update the password, please delete the user first or use a different email.\n`);
      process.exit(1);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create owner user
    const owner = await userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.OWNER,
      isActive: true,
    });

    logger.info('Owner user created successfully', { email: owner.email, role: owner.role });

    console.log('\n✅ Owner user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email:    ${owner.email}`);
    console.log(`Password: ${password}`);
    console.log(`Name:     ${owner.firstName} ${owner.lastName}`);
    console.log(`Role:     ${owner.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  Please save these credentials securely!');
    console.log('   You can change the password after logging in.\n');

    process.exit(0);
  } catch (error) {
    logger.error('Failed to create owner user', error);
    console.error('\n❌ Error creating owner user:', error);
    process.exit(1);
  }
};

createOwner();
