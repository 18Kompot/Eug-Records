export type TArtist = {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
};

export type TLabel = {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
};

export type TIdentifier = {
  type: string;
  value: string;
  description: string;
};

export type TFormat = {
  name: string;
  qty: string;
  descriptions: string[];
};

export type TTrack = {
  position: string;
  type_: string;
  title: string;
  extraartists: [];
  duration: string;
};

export type TBasicInformation = {
  id: number;
  master_id: number;
  resource_url: string;
  thumb: string;
  title: string;
  artists_sort: string;
  year: number;
  country: string;
  cover_image: string;
  labels: TLabel[];
  artists: TArtist[];
  formats: TFormat[];
  genres: string[];
  style: string[];
  tracklist: TTrack[];
  identifiers: TIdentifier[];
};

export type TRecord = {
  id: number;
  date_added: string;
  basic_information: TBasicInformation;
};

export type TCollection = {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      last: string;
      next: string;
    };
  };
  releases: TRecord[];
};

export interface ISignupData {
  name: string;
  email: string;
  password: string;
}

export interface IContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
