import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import db from '../models/db';
import { loginDTO, registerDTO } from '../dtos/user.dto';
import { User, IUser } from '../models';
import envs from '../config/envs';
import HTTPError from '../errors/HTTPError';

export default class AuthService {
  public async register(body: registerDTO): Promise<{ accessToken: string; refreshToken: string }> {
    // check duplicate email
    const duplicateUser = await db.User.findOne({ email: body.email });
    if (duplicateUser) throw new HTTPError(400, 'The email already exists');

    // create new user
    const userData: User = new User(body);
    // hash password
    const hashedPassword = await hash(body.password, 10);
    // create user document
    const user = await db.User.create({ ...userData, hashedPassword });

    // create tokens
    // access token valid for 5 mins in production, 7 days in dev
    const accessToken = this.signToken(user, envs.env !== 'development' ? 5 * 60 : 7 * 24 * 60 * 60);
    const refreshToken = this.signToken(user, 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
  }

  public async login(body: loginDTO): Promise<{ accessToken: string; refreshToken: string }> {
    // find user
    const user = await db.User.findOne({ email: body.email, deletedAt: null });
    if (!user) throw new HTTPError(401, 'User does not exist');
    if (!user.hashedPassword) throw new HTTPError(401, 'User registered via different method');
    const isMatchingPassword = await compare(body.password, user.hashedPassword);
    if (!isMatchingPassword) throw new HTTPError(401, 'Wrong password');

    // create tokens
    // access token valid for 5 mins in production, 7 days in dev
    const accessToken = this.signToken(user, envs.env !== 'development' ? 5 * 60 : 7 * 24 * 60 * 60);
    const refreshToken = this.signToken(user, 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
  }

  public getNewTokens(receivedRefreshToken: string) {
    try {
      const userData = verify(receivedRefreshToken, envs.secretKey) as IUser;

      const accessToken = this.signToken(userData, envs.env !== 'development' ? 5 * 60 : 7 * 24 * 60 * 60);
      const refreshToken = this.signToken(userData, 7 * 24 * 60 * 60);
      return { accessToken, refreshToken };
    } catch (e) {
      throw new HTTPError(401, 'Invalid refreshToken');
    }
  }

  public signToken(user: IUser, expiresIn: number): string {
    const filteredUserInfo = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    return sign(filteredUserInfo, envs.secretKey, { expiresIn });
  }
}
