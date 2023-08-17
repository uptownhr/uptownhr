import { ApiProperty } from '@nestjs/swagger';

export class CreatePageInput {
  @ApiProperty()
  title: string;
}

export class Page {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
