import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { UserLikeBlog } from '../likes/user-like-blog.entity';
import {CreateBlogDto } from '../blogs/blogs.dto';
import { User } from '../users/user.entity';
import { ResStatusEnum } from '../../enum/resStatus.enum';
import { ResFunctionInterfaces } from '../../interfaces/resFunction.interfaces';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    // @InjectRepository(UserLikeBlog)
    // private likesRepository: Repository<UserLikeBlog>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createBlog(blog: CreateBlogDto): Promise<ResFunctionInterfaces> {
    try {
      let newBlog = new Blog();
      newBlog.title = blog.title;
      newBlog.content = blog.content;
      const user = await this.usersRepository.findOneBy({id:blog.userId});
      if(!user){
        throw new NotFoundException("userId is incorrect!")
      }
      newBlog.user = user;
      await this.blogsRepository.save(newBlog);
    }catch (err){
      throw new BadRequestException("blog didn't save!");
    }
    return {
      statusCode : ResStatusEnum.SUCCESS,
      message :"blog create successfully",
      data:{}
    }
  }

  // async likeBlog(userId: number, blogId: number): Promise<void> {
  //   const like = this.likesRepository.create({ user: { id: userId }, blog: { id: blogId } });
  //   await this.likesRepository.save(like);
  // }

  async getBlogs(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }
}
