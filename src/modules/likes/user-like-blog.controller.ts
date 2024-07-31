import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserLikeBlogService } from './user-like-blog.service';
import { AuthGuard } from '../auth/auth.guard';
import { LikeBlogIdDto , LikeUserIdDto } from './user-like-blog.dto';

@Controller()
export class UserLikeBlogController {
  constructor(private readonly userLikeBlogService: UserLikeBlogService) {}

  // @UseGuards(AuthGuard)
  @Post('likeBlog')
  async likeBlog(@Body() likeBlogIdDto: LikeBlogIdDto, @Param() likeUserIdDto: LikeUserIdDto) {
    return this.userLikeBlogService.likeBlog(likeUserIdDto.userId, likeBlogIdDto.blogId);
  }
  // @Get('getBlogs')
  // async getBlogs() {
  //   return this.userLikeBlogService.getBlogs();
  // }
}
