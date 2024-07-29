import { UserInterface } from "./interfaces/user.interface";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ListAllEntitiesDto {
  users: UserInterface[];
}
export class FindUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
export class UpdateUserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPass: string;
}