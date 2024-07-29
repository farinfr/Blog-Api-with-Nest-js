import { ResStatusEnum } from "../enum/resStatus.enum";

export interface ResFunctionInterfaces
{
  statusCode: ResStatusEnum;
  message: string;
  data: any;
}