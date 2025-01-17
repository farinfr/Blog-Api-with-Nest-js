import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, FindUserDto } from "./users.dto";
import { ResControllerInterfaces } from "../../interfaces/resController.interfaces";
import { ResStatusEnum } from "../../enum/resStatus.enum";
import {AuthService} from '../auth/auth.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}


  @Post('signUp')
  async create(@Body() createUserDto : CreateUserDto):Promise<ResControllerInterfaces>
  {
    if(createUserDto.password !== createUserDto.confirmPass){
      return {
        statusCode:ResStatusEnum.FAULT,
        data:{},
        message:['confirmPass must be match with password'],
      }
    }
    const  result = await this.userService.creat(createUserDto);
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

  @Post('signIn')
  async findUser(@Body() findUserDio : FindUserDto):Promise<ResControllerInterfaces>
  {
    const result = await this.userService.findOne(findUserDio);

    if(result.statusCode !== ResStatusEnum.SUCCESS){
      return {
        statusCode:result.statusCode,
        message:[result.message],
        data:result.data
      }

    }
    const access_token = await this.authService.signIn(findUserDio.email);
    return {
      statusCode:ResStatusEnum.SUCCESS,
      message:[result.message],
      data:access_token
    }

  }

}
