import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserLikeBlogService } from './user-like-blog.service';
import { AuthGuard } from '../auth/auth.guard';
import { LikeBlogIdDto , LikeUserIdDto } from './user-like-blog.dto';
import { AuthService } from '../auth/auth.service';

@Controller()
export class UserLikeBlogController {
  constructor(
    private readonly userLikeBlogService: UserLikeBlogService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('likeBlog')
  async likeBlog(@Body() likeBlogIdDto: LikeBlogIdDto, @Param() likeUserIdDto: LikeUserIdDto) {
    return this.userLikeBlogService.likeBlog(likeUserIdDto.userId, likeBlogIdDto.blogId);
  }

}
