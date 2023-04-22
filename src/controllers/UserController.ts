import { FastifyReply, FastifyRequest } from 'fastify';
import IUser from '../interfaces/IUser';
import { v4 } from 'uuid';
import UserService from '../services/UserService';

interface IUserPostBody {
  username: string;
}

interface IUserDeleteParams {
  id: string;
}
export default class UserController {
  static addUser = async (req: FastifyRequest<{Body: IUserPostBody}>, res: FastifyReply) => {
    const { username } = req.body;
    const newUser: IUser = {
      id: v4(),
      username,
    };

    try {
      await UserService.addUser(newUser);
      res.code(201).send(newUser);
    } catch {
      res.code(400).send({ error: 'Bad Request' });
    }
  };

  static deleteUser = async (req: FastifyRequest<{Params: IUserDeleteParams}>, res: FastifyReply) => {
    const userID: string = req.params.id;
    try {
      await UserService.deleteUser(userID);
      res.code(204).send({message: 'User deleted'});
    } catch {
      res.code(404).send({message: "The user doesn't exist"});
    }
  }
}