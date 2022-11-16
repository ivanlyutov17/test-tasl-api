import { IsDefined, IsUUID } from 'class-validator';

export class GetProductDto {
  @IsDefined()
  @IsUUID()
  id: number;
}
