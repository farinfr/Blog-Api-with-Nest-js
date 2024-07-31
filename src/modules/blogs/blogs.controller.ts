import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateBlogDto ,UserIdDto } from './blogs.dto';
import { ResControllerInterfaces } from '../../interfaces/resController.interfaces';
import { ResStatusEnum } from '../../enum/resStatus.enum';
import { User } from '../users/user.entity';

@Controller()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(AuthGuard)
  @Post("createBlog/:userId")
  async createBlog(@Body() createBlogDio : CreateBlogDto,@Param() userIdDto: UserIdDto):Promise<ResControllerInterfaces> {

    const  result = await this.blogsService.create(createBlogDio , userIdDto);
    if(result.statusCode !== ResStatusEnum.SUCCESS){
      return {
        statusCode:result.statusCode,
        message:[result.message],
        data:result.data
      }

    }
    return {
      statusCode:ResStatusEnum.SUCCESS,
      message:[result.message],
      data:result.data
    }
  }

  @UseGuards(AuthGuard)
  @Get("getBlogs")
  async getBlogs():Promise<ResControllerInterfaces> {
      try{
        const result = await this.blogsService.getBlogs();
        return {
          statusCode : result.statusCode,
          message :[result.message],
          data:{blogs: result.data}
        }
      }catch (err){
        throw new InternalServerErrorException("database error");
      }
  }
}
