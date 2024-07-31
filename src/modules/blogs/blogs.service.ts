import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { UserLikeBlog } from '../likes/user-like-blog.entity';
import { CreateBlogDto, UserIdDto } from '../blogs/blogs.dto';
import { User } from '../users/user.entity';
import { ResStatusEnum } from '../../enum/resStatus.enum';
import { ResFunctionInterfaces } from '../../interfaces/resFunction.interfaces';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(blog: CreateBlogDto , user: UserIdDto): Promise<ResFunctionInterfaces> {
    try {
      let newBlog = new Blog();
      newBlog.title = blog.title;
      newBlog.content = blog.content;
      const u = await this.usersRepository.findOneBy({id:user.userId});
      if(!u){
        throw new NotFoundException("userId is incorrect!");
      }
      newBlog.user = u;
      await this.blogsRepository.save(newBlog);
    }catch (err){
      throw new BadRequestException(err.message);
    }
    return {
      statusCode : ResStatusEnum.SUCCESS,
      message :"blog create successfully",
      data:{}
    }
  }


  async getBlogs(): Promise<ResFunctionInterfaces> {
    try{
      const blogs = await this.blogsRepository.find();
      return {
        statusCode : ResStatusEnum.SUCCESS,
        message :"",
        data: blogs
      }
    }catch (err){
      throw new InternalServerErrorException("database error");
    }

  }
}
