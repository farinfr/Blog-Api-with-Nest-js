import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserLikeBlogService } from './user-like-blog.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user-like-blog')
export class UserLikeBlogController {
  constructor(private readonly userLikeBlogService: UserLikeBlogService) {}

  @UseGuards(AuthGuard)
  @Post('like')
  async likeBlog(@Body('blogId') blogId: number, @Request() req) {
    return this.userLikeBlogService.likeBlog(req.user.userId, blogId);
  }
}
