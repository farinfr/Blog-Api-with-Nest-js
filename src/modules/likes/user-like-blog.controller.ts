import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserLikeBlogService } from './user-like-blog.service';
import { AuthGuard } from '../auth/auth.guard';
import { BlogIdDto , UserIdDto } from './user-like-blog.dto';
import { AuthService } from '../auth/auth.service';
import { ResControllerInterfaces } from '../../interfaces/resController.interfaces';
import { ResStatusEnum } from '../../enum/resStatus.enum';

@Controller()
export class UserLikeBlogController {
  constructor(
    private readonly userLikeBlogService: UserLikeBlogService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard)
  @Post('likeBlog/:userId')
  async likeBlog(@Body() blogIdDto: BlogIdDto, @Param() userIdDto: UserIdDto):Promise<ResControllerInterfaces> {

    const result = await this.userLikeBlogService.likeBlog(userIdDto, blogIdDto);
    if(result.statusCode !== ResStatusEnum.SUCCESS){
      return {
        statusCode:result.statusCode,
        message:[result.message],
        data:result.data
      };
    }
    return {
      statusCode:ResStatusEnum.SUCCESS,
      message:[result.message],
      data:result.data
    };
  }

}
