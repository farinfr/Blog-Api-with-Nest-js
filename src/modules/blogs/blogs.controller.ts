import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '../auth/auth.guard';
import { FindUserDto } from '../users/users.dto';
import { CreateBlogDto } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createBlog(@Body() createBlogDio : CreateBlogDto) {
    return this.blogsService.createBlog(createBlogDio);
  }

  // @UseGuards(AuthGuard)
  // @Post('like')
  // async likeBlog(@Body('blogId') blogId: number, @Request() req) {
  //   await this.blogsService.likeBlog(req.user.userId, blogId);
  // }

  @Get()
  async getBlogs() {
    return this.blogsService.getBlogs();
  }
}
