import { HttpResponse, http } from 'msw';
import bairros from './response_geometrias_bairros.json';
import populacao from './response_populacao_bairros.json';

export const endpoints = [
  http.get('/bairros-geojson', () => {
    return HttpResponse.json(bairros);
  }),
  http.get('/populacao', () => {
    return HttpResponse.json(populacao);
  }),
];
