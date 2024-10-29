declare module 'world-countries' {
    export interface Country {
      cca2: string;  // Country code
      translations: { [languageCode: string]: { official: string; common: string } };
      latlng: [number, number];
      demonyms: { [languageCode: string]: { f: string; m: string } };
      landlocked: boolean;
      borders: string[];
      area: number;
      name: { common: string };  // Country name
      flag: string;  // Country flag
      region: string;  // Country region
    }
  
    const countries: Country[];
    export default countries;
  }
  