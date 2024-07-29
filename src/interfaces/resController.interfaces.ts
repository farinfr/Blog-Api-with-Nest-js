import { ResStatusEnum } from "../enum/resStatus.enum";

export interface ResControllerInterfaces
{
  statusCode: ResStatusEnum;
  message: [string];
  data: object;
}
