import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Blog } from '../blogs/blog.entity';

@Entity('User_Like_Blog')
export class UserLikeBlog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Blog, (blog) => blog.likes)
  blog: Blog;
}
