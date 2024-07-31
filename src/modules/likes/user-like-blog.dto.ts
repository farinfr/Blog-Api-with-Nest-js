import { IsNotEmpty } from 'class-validator';

// export class ListAllEntitiesDto {
//   users: UserInterface[];
// }
export class LikeBlogIdDto {
  @IsNotEmpty()
  blogId: number;
}
export class LikeUserIdDto {
  @IsNotEmpty()
  userId: number;
}

