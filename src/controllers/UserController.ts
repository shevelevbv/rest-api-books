import { FastifyReply, FastifyRequest } from 'fastify';
import IUser from '../interfaces/IUser';
import { v4 } from 'uuid';
import UserService from '../services/UserService';
import { server } from '../index';
import User from '../entities/User';
import { revokedTokens } from '../utils/revokedTokens';

interface IUserPostBody {
  username: string;
}

interface IUserDeleteParams {
  id: string;
}

interface IDecodedToken {
  id: string;
  username: string;
  _id: string;
  iat: number;
}

export default class UserController {
  static addUser = async (req: FastifyRequest<{Body: IUserPostBody}>, res: FastifyReply): Promise<void> => {
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

  static checkUser = async (req: FastifyRequest): Promise<void> => {
    const token_part = 1;
    const token: string | undefined = req.headers.authorization?.split(' ')[token_part];
    if (!token || revokedTokens.has(token)) {
      throw new Error();
    }
    const decoded: IDecodedToken = await req.jwtVerify();
    const user: User | null = await UserService.findUser(decoded.id);
    if (!user) {
      revokedTokens.set(token, true);
      throw new Error();
    }
  }

  static deleteUser = async (req: FastifyRequest<{Params: IUserDeleteParams}>, res: FastifyReply): Promise<void> => {
    const id: string = req.params.id;
    try {
      await UserService.deleteUser(id);
      res.code(204).send();
    } catch (err) {
      res.code(404).send({error: err.message});
    }
  };
}