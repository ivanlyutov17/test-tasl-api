import { IsDefined, IsUUID } from 'class-validator';

export class RemoveProductDto {
  @IsDefined()
  @IsUUID()
  id: number;
}
