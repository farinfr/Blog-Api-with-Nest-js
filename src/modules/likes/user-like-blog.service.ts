import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikeBlog } from './user-like-blog.entity';
import { Blog } from '../blogs/blog.entity';
import { User } from '../users/user.entity';
import { ResFunctionInterfaces } from '../../interfaces/resFunction.interfaces';
import { ResStatusEnum} from '../../enum/resStatus.enum';
import { UserIdDto } from '../blogs/blogs.dto';
import { BlogIdDto } from './user-like-blog.dto';

@Injectable()
export class UserLikeBlogService {
  constructor(
    @InjectRepository(UserLikeBlog)
    private readonly userLikeBlogRepository: Repository<UserLikeBlog>,
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async likeBlog(user: UserIdDto, blog: BlogIdDto):Promise<ResFunctionInterfaces> {
    try {
      const newLike = new UserLikeBlog()
      const userFined = await this.usersRepository.findOneBy({ id: user.userId });
      const blogFined = await this.blogsRepository.findOneBy({ id: blog.blogId });
      if (!userFined){
        throw new NotFoundException("userId is incorrect!");
      }
      if (!blogFined){
        throw new NotFoundException("blogId is incorrect!");
      }

      const u = await this.userLikeBlogRepository.findOneBy({user: userFined , blog:blogFined})
      if(u){
        return {
        message:"The user has already liked",
          data :{},
        statusCode : ResStatusEnum.FAULT
        };
      }
      newLike.user = userFined;
      newLike.blog = blogFined;
      await this.blogsRepository.increment({ id: blog.blogId } , 'likeCount' , 1);
      await this.userLikeBlogRepository.save(newLike);
    }catch (err){
      throw new InternalServerErrorException(err.message);
    }
    return {
      message:"The user liked blog",
      data :{},
      statusCode : ResStatusEnum.SUCCESS
    };
  }
}
