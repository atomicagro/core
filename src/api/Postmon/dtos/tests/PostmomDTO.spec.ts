import { PostmonDto } from '@api/Postmon/dtos/PostmonDTO';
import { InfoCity } from '@api/Postmon/interfaces/infoCity';

describe('PostmonDTO', () => {
  it('should return a valid PostmonDTO object', async () => {
    const data = {
      cidade_info: { area_km2: '131,096', codigo_ibge: '4304606' },
    } as InfoCity;
    const postmonDto = PostmonDto.build(data);

    expect(postmonDto.ibgeCode).toStrictEqual(data.cidade_info.codigo_ibge);

    expect(Object.keys(postmonDto)).toHaveLength(1);
  });
});
