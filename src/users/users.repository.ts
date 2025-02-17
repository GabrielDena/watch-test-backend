import { Repository } from 'typeorm';
import { CreateUserDto } from './schemas/create-user.schema';
import { UpdateUserDto } from './schemas/update-user.schema';
import { User } from './users.entity';

export class UsersRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.userRepository.save(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.save({id, ...data});
    return user;
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async delete(user: User): Promise<boolean> {
    await this.userRepository.remove(user);
    return true;
  }
}
