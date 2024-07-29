import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikeBlog } from './user-like-blog.entity';
import { UserLikeBlogService } from './user-like-blog.service';
import { UserLikeBlogController } from './user-like-blog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserLikeBlog])],
  providers: [UserLikeBlogService],
  controllers: [UserLikeBlogController],
  exports: [UserLikeBlogService],
})
export class UserLikeBlogModule {}
