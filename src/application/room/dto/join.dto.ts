import { IsNotEmpty, IsString } from 'class-validator';

export class JoinDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
