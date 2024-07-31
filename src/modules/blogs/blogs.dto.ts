// import { UserInterface } from "./interfaces/user.interface";
import { IsNotEmpty } from 'class-validator';

// export class ListAllEntitiesDto {
//   users: UserInterface[];
// }

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  userId: number;
}