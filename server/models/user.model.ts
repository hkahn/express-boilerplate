import { getModelForClass, prop } from '@typegoose/typegoose';

export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  hashedPassword?: string;
  name?: string;
}

export class UserDataInToken implements IUser {
  public email?: string;
  public name?: string;
}

export class User implements IUser {
  // email
  @prop({ type: String, required: false })
  public email?: string;
  // hashedPassword
  @prop({ type: String, required: false })
  public hashedPassword?: string;
  // nickname
  @prop({ type: String, required: false })
  public name?: string;
  // when deleted
  @prop({ type: Date, required: false })
  public deletedAt?: Date;

  constructor({ email, hashedPassword, name }: { email?: string; hashedPassword?: string; name?: string }) {
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.name = name;
  }
}

export default getModelForClass(User, { schemaOptions: { timestamps: true } });
