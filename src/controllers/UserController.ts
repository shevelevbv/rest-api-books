import { FastifyReply, FastifyRequest } from 'fastify';
import IUser from '../interfaces/IUser';
import { v4 } from 'uuid';
import UserService from '../services/UserService';
import { server } from '../index';

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
      const token = server.jwt.sign(newUser);
      res.code(201).send({...newUser, token});
    } catch {
      res.code(400).send({ error: 'Bad Request' });
    }
  };

  static deleteUser = async (req: FastifyRequest<{Params: IUserDeleteParams}>, res: FastifyReply) => {
    const id: string = req.params.id;
    try {
      await UserService.deleteUser(id);
      res.code(204).send();
    } catch (err) {
      res.code(404).send({error: err.message});
    }
  }
}