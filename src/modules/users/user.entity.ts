import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Timestamp } from "rxjs";

@Entity()
export class UserTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;


  // @Column({default:TIME})
  // created_at: Timestamp<string>


}