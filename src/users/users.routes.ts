import { FastifyInstance } from 'fastify';
import { CreateUserSchema } from './schemas/create-user.schema';
import { GetUserSchema } from './schemas/get-user.schema';
import { UpdateUserSchema } from './schemas/update-user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AppDataSource } from 'common/database';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

export default async function userRoutes(app: FastifyInstance) {
  const usersRepository = new UsersRepository(AppDataSource.getRepository(User));
  const usersService = new UsersService(usersRepository);
  const usersController = new UsersController(usersService);

  app.get('/', usersController.getAllUsers.bind(usersController));
  app.get('/:id', { schema: { params: GetUserSchema } }, usersController.getUserById.bind(usersController));
  app.post('/', { schema: { params: CreateUserSchema } }, usersController.createUser.bind(usersController));
  app.put('/:id', { schema: { params: UpdateUserSchema } }, usersController.updateUser.bind(usersController));
  app.delete('/:id', { schema: { params: GetUserSchema } }, usersController.deleteUser.bind(usersController));
}
