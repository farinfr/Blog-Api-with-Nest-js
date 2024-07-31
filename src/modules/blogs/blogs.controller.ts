import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateBlogDto } from './blogs.dto';

@Controller()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(AuthGuard)
  @Post("createBlog")
  async createBlog(@Body() createBlogDio : CreateBlogDto) {
    return this.blogsService.createBlog(createBlogDio);
  }

  @Get("getBlogs")
  async getBlogs() {
    return this.blogsService.getBlogs();
  }
}
