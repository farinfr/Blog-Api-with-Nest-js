import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikeBlog } from './user-like-blog.entity';
import { Blog } from '../blogs/blog.entity';
import { User } from '../users/user.entity';

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

  async likeBlog(userId: number, blogId: number): Promise<String> {
    try {
      const newLike = new UserLikeBlog()
      const user = await this.usersRepository.findOneBy({ id: userId });
      const blog = await this.blogsRepository.findOneBy({ id: blogId });

      const u = await this.userLikeBlogRepository.findOneBy({user: user , blog:blog})
      if(u){
        return "The user has already liked!!"
      }
      newLike.user = user;
      newLike.blog =blog;
      await this.blogsRepository.increment({ id: blogId } , 'likeCount' , 1);
      await this.userLikeBlogRepository.save(newLike);
    }catch (err){
      return err.message;
    }
    return "Successes"
  }
}
