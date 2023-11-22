# SEEDZ FARM CORE

A simple library to search for the city's CEP with coordinates and IBGE Code by CEP.

## Install

Install the library using yarn:

```bash
yarn add @seedz-d2f/seedz-farm-core
```

## How to use

Import the City Service instance into your code:

```js
const { cityService } = require('@seedz-d2f/seedz-farm-core');
```

Set Token default to Google Maps

```js
const token = 'your_google_key_api';

cityService.setGoogleMapsToken(token);
```

Search Zip Code by Coordinates:

```js
const coordinates = { lat: '123.456', long: '-789.012' };

const { zipCode } = await cityService.getZipCodeByCoordinates(coordinates); // { zipCode: '00000-000' }
console.log('CEP:', zipCode); //'00000-000'
```

Search Ibge Code by Zip Code:

```js
const zipCode = '12345-678';

const { ibgeCode } = await cityService.getIbgeCodeByZipCode(zipCode); // { ibgeCode: '9876543' }
console.log('IBGE Code:', ibgeCode); // '9876543'
```

## Contribution

If you want to contribute to this project, feel free to open issues or pull requests.

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
