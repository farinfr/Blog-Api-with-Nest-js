import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikeBlog } from './user-like-blog.entity';

@Injectable()
export class UserLikeBlogService {
  constructor(
    @InjectRepository(UserLikeBlog)
    private readonly userLikeBlogRepository: Repository<UserLikeBlog>,
  ) {}

  async likeBlog(userId: number, blogId: number): Promise<UserLikeBlog> {
    const like = this.userLikeBlogRepository.create({ user: { id: userId }, blog: { id: blogId } });
    return this.userLikeBlogRepository.save(like);
  }

  async countLikes(blogId: number): Promise<number> {
    return this.userLikeBlogRepository.count({ where: { blog: { id: blogId } } });
  }
}
