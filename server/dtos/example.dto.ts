import { Length, IsString, IsInt, Max, Min, IsMongoId, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { IExample } from '../models';

// example body
export class exampleDTO implements IExample {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @Length(10, 20)
  title?: string;

  @IsString()
  description?: string;
}

// example param _id
export class exampleParamsDTO {
  @IsMongoId()
  _id?: string;
}

// example query
export class exampleQueryDTO {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsInt()
  @Max(50)
  @Min(1)
  @Type(() => Number)
  perPage?: number;
}
