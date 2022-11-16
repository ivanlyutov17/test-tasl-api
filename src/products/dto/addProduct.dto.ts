import { IsDefined, IsNumberString, MaxLength } from 'class-validator';

export class AddProductDto {
  @IsDefined()
  @MaxLength(100)
  name: string;

  @IsNumberString()
  @IsDefined()
  price: string;
}
