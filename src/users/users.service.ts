import { CreateUserDto } from './schemas/create-user.schema';
import { UpdateUserDto } from './schemas/update-user.schema';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import { hash, verify } from 'argon2';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findOneByEmail(data.email);
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    data.password = await hash(data.password);
    return this.usersRepository.create(data);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      return null;
    }

    if (data.password) {
      if (await verify(user.password, data.password)) {
        throw new Error('Password is the same as the current one');
      }
      data.password = await hash(data.password);
    }

    return this.usersRepository.update(id, data);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneById(id);
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      return null;
    }
    await this.usersRepository.delete(user);
    return user;
  }
}
