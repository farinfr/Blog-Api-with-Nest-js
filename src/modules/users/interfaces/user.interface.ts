import { Blog } from "../../blogs/blog.entity"

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  blog: Blog[];
}
