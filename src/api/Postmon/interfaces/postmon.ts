import { PostmonDto } from '@api/Postmon/dtos/PostmonDTO';

export interface Postmon {
  findIbgeCodeByZipCode(zipCode: string): Promise<PostmonDto>;
}
