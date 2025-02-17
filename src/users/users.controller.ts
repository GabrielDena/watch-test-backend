import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from './schemas/create-user.schema';
import { GetUserDto } from './schemas/get-user.schema';
import { UpdateUserDto } from './schemas/update-user.schema';
import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async getAllUsers(req: FastifyRequest, res: FastifyReply) {
    try {
      const users = await this.usersService.getAllUsers();

      return res.send(users);
    } catch (err) {
      console.error('Error getting all users');
      console.error(err);
      return res.status(500).send({ message: err });
    }
  }

  async getUserById(req: FastifyRequest<{ Params: GetUserDto }>, res: FastifyReply) {
    try {
      const user = await this.usersService.getUserById(req.params.id);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.send(user);
    } catch (err) {
      console.error('Error getting user by id');
      console.error(err);
      return res.status(500).send({ message: err });
    }
  }

  async createUser(req: FastifyRequest<{ Body: CreateUserDto }>, res: FastifyReply) {
    try {
      const user = await this.usersService.createUser(req.body);

      return res.status(201).send(user);
    } catch (err) {
      console.error('Error creating user');
      console.error(err);
      return res.status(500).send({ message: err });
    }
  }

  async updateUser(req: FastifyRequest<{ Body: UpdateUserDto; Params: GetUserDto }>, res: FastifyReply) {
    try {
      const updatedUser = await this.usersService.updateUser(req.params.id, req.body);

      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.send(updatedUser);
    } catch (err) {
      console.error('Error updating user');
      console.error(err);
      return res.status(500).send({ message: err });
    }
  }

  async deleteUser(req: FastifyRequest<{ Params: GetUserDto }>, res: FastifyReply) {
    try {
      const deletedUser = await this.usersService.deleteUser(req.params.id);

      if (!deletedUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.send(deletedUser);
    } catch (err) {
      console.error('Error deleting user');
      console.error(err);
      return res.status(500).send({ message: err });
    }
  }
}
