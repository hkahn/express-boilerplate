import { Length, IsString, IsMongoId, IsOptional, IsEmail, MinLength } from 'class-validator';
// import { Type } from 'class-transformer';
import { IUser } from '../models';

// example body
export class userDTO implements IUser {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @Length(4, 100)
  name?: string;
}

export class registerDTO implements IUser {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  @Length(4, 100)
  name: string;
}

export class loginDTO implements IUser {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

// example param _id
// export class exampleParamsDTO {
//   @IsMongoId()
//   _id?: string;
// }

// example query
// export class exampleQueryDTO {
//   @IsInt()
//   @Min(1)
//   @Type(() => Number)
//   page?: number;

//   @IsInt()
//   @Max(50)
//   @Min(1)
//   @Type(() => Number)
//   perPage?: number;
// }
