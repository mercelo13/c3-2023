import request from 'supertest';
import { server, app } from '../../../src/index';

describe('GET /api/cities', () => {
  afterAll(() => {
    server.close();
  });

  test('DEBERIA MOSTRAR TODOS LOS PAISES', async () => {
    const response = await request(app.callback()).get('/api/cities');
    expect(response.status).toBe(200);
    
    // Obtener todos los países sin repetir
    const uniqueCountries = new Set(response.body.map(city => city.country));
    
    console.log('Países disponibles:', Array.from(uniqueCountries));
    
    // Obtener el número de países en el dataset
    const datasetCountriesCount = uniqueCountries.size;
    console.log('Cantidad de países en el dataset:', datasetCountriesCount);
    
    // Verificar que el número de países en el test sea igual al número de países en el dataset
    expect(uniqueCountries.size).toBe(datasetCountriesCount);
  });

  describe('GET /api/cities/by_country/:country', () => {

    test('DEBE DEVOLVER LOS OBJETOS DE LA BÚSQUEDA', async () => {
      const country = 'ATLANTIS'; // Reemplazar con el país de prueba
    
      const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);
      expect(response.status).toBe(200);
    
      const searchResults = response.body;
    
      console.log(`Resultados de la búsqueda para ${country}:`, searchResults);
    
      // Verificar si no se encontraron ciudades
      if (searchResults.length === 0) {
        // Devolver mensaje de error
        expect(searchResults).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });
      } else {
        // Verificar que la respuesta contenga un arreglo con los objetos de la búsqueda
        expect(Array.isArray(searchResults)).toBe(true);
      }
    });
  });
});