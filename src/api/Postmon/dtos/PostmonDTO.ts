import { InfoCity } from '@api/Postmon/interfaces/infoCity';

export class PostmonDto {
  ibgeCode: string;

  static build(data: InfoCity) {
    const postmonDto = new PostmonDto();
    postmonDto.ibgeCode = data?.cidade_info?.codigo_ibge;

    return postmonDto;
  }
}
