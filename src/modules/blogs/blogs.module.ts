import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./blog.entity";
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog , User]),
    AuthModule,

  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],

})
export class BlogsModule {}
