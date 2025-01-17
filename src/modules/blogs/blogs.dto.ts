import { IsNotEmpty } from 'class-validator';


export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

}

export class UserIdDto {

  @IsNotEmpty()
  userId: number;
}