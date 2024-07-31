import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { UserLikeBlog } from '../likes/user-like-blog.entity';

@Entity('Blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  likeCount: number;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @OneToMany(() => UserLikeBlog, (like) => like.blog)
  likes: UserLikeBlog[];
}
