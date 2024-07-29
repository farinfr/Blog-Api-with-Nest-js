import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1272547841',
      database: 'blog_db',
      entities: [__dirname+"/../modules/**/*.entity.{ts,js}"],
      synchronize: true,
      autoLoadEntities :true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
