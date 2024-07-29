import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Blog} from "../blogs/blog.entity"
import {UserLikeBlog} from '../likes/user-like-blog.entity';

//import { Timestamp } from "rxjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => UserLikeBlog, (like) => like.user)
  likes: UserLikeBlog[];
  // @Column({default:TIME})
  // created_at: Timestamp<string>


}