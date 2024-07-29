import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserTable } from "./user.entity";
import { CreateUserDto, FindUserDto, UpdateUserDto } from "./dto";
import { ResFunctionInterfaces } from "../../interfaces/resFunction.interfaces";
import { ResStatusEnum } from "../../enum/resStatus.enum";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserTable)
    private usersRepository: Repository<UserTable>,
  ) {}

  async creat(user: CreateUserDto):Promise<ResFunctionInterfaces>
  {

    try {
      let newUser = new UserTable();
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.password = user.password;
      await this.usersRepository.save(newUser);
    }catch (err){
      throw new BadRequestException("username already existed");
    }
    return {
      statusCode : ResStatusEnum.SUCCESS,
      message :"user signup successfully",
      data:{}
    }
  }

  // async findAll():Promise<ResFunctionInterfaces>
  // {
  //   try{
  //     const allUsers = await this.usersRepository.find();
  //     return {
  //       statusCode : ResStatusEnum.SUCCESS,
  //       message :"",
  //       data:{users: allUsers}
  //
  //     }
  //
  //   }catch (err){
  //     throw new InternalServerErrorException("database error");
  //   }
  //
  //
  //
  // }

  async findOne(user:FindUserDto):Promise<ResFunctionInterfaces>
  {
    try{
      const u = new UserTable();
      u.email = user.email;
      u.password = user.password;
      if(await this.usersRepository.findOneBy(u)){
        return {
          message:"find user",
          data :{},
          statusCode : ResStatusEnum.SUCCESS
        }
      }else {
        throw new NotFoundException("user not find")
      }

    }catch (err){
      throw new InternalServerErrorException("user not find");
    }


  }

  // async update(user:UpdateUserDto):Promise<ResFunctionInterfaces>
  // {
  //
  //   try{
  //     const u = new UserTable();
  //     u.username = user.username;
  //     const findUser = await this.usersRepository.findOneBy(u);
  //     await this.usersRepository.update(findUser , user)
  //     return {
  //       message:'user update successfully',
  //       data:{},
  //       statusCode:ResStatusEnum.SUCCESS
  //     }
  //
  //   }catch (err){
  //     throw new InternalServerErrorException("user not find");
  //   }
  //
  // }

  // async delete(id:number):Promise<ResFunctionInterfaces>
  // {
  //
  //   try{
  //     const u = new UserTable();
  //     u.id = id;
  //     const findUser = await this.usersRepository.findOneBy(u);
  //     await this.usersRepository.remove(findUser);
  //     return {
  //       message:'user deleted successfully',
  //       data:{},
  //       statusCode:ResStatusEnum.SUCCESS
  //     }
  //   }catch (err){
  //     throw new InternalServerErrorException("user not find");
  //   }
  //
  //
  // }

}
