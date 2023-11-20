import { CityInfo } from '@api/Postmon/interfaces/cityInfo';

export class PostmonDto {
  ibgeCode: string;

  static build(data: CityInfo) {
    const postmonDto = new PostmonDto();
    postmonDto.ibgeCode = data?.cidade_info?.codigo_ibge;

    return postmonDto;
  }
}
