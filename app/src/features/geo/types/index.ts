export type Country = {
  url: string;
  name: string;
  nameAscii: string;
  slug: string;
  geonameId: number;
  alternateNames: string;
  code2: string;
  code3: string;
  continent: string;
  tld: string;
  phone: string;
}

export type Region = {
  url: string;
  country: string;
  name: string;
  nameAscii: string;
  geonameId: number;
  alternateNames: string;
  displayName: string;
  geonameCode: string;
}

export type SubRegion = {
  url: string;
  country: string;
  region: string;
  name: string;
  nameAscii: string;
  geonameId: number;
  alternateNames: string;
  displayName: string;
  geonameCode: string;
}

export type City = {
  url: string;
  country: string;
  region: string;
  subregion: string | null;
  name: string;
  nameAscii: string;
  geonameId: number;
  alternateNames: string;
  displayName: string;
  searchNames: string;
  latitude: string;
  longitude: string;
  population: number;
  featureCode: string;
  timezone: string;
}