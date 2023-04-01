export type TRecord = {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: {
    id: number;
    master_id: number;
    resource_url: string;
    thumb: string;
    cover_image: string;
    title: string;
    year: number;
    formats: {
      name: string;
      qty: string;
      descriptions: string[];
    }[];
    labels: {
      name: string;
      catno: string;
      entity_type: string;
      entity_type_name: string;
      id: number;
      resource_url: string;
    }[];
    artists: {
      name: string;
      anv: string;
      join: string;
      role: string;
      tracks: string;
      id: number;
      resource_url: string;
    }[];
    genres: string[];
    style: string[];
  };
  folder_id: number;
  is_favorite: boolean;
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
