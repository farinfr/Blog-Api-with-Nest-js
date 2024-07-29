import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTable } from "./user.entity";
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTable]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UsersService],

})
export class UsersModule {}
