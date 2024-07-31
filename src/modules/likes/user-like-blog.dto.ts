import { IsNotEmpty } from 'class-validator';

// export class ListAllEntitiesDto {
//   users: UserInterface[];
// }
export class BlogIdDto {
  @IsNotEmpty()
  blogId: number;
}
export class UserIdDto {
  @IsNotEmpty()
  userId: number;
}

