import { IsDefined, IsNumberString, IsUUID, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsDefined()
  @IsUUID()
  id: number;

  @IsDefined()
  @MaxLength(100)
  name: string;

  @IsNumberString()
  @IsDefined()
  price: string;
}
