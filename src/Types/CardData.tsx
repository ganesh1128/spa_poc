export interface CardData {
    id: string;
    image: string;
    brand: string;
    description?: string;
  }

  
  export interface FormData {
  id?: string;
  image?: string;
  brand: string;
  modal: string;
  owner: string;
  budget: string;
  Fuel: string;
  transmission: string;
  bodyType: string;
  location: string;
  kms: string;
}
export interface DetailedView {
  id: string;
  image: string;
  modal: string;
  owner: string;
  budget: string;
  Fuel: string;
  transmission: string;
  bodyType: string;
  location: string;
  kms: string;
}
  export interface Brand {
    id?: string;
    logo?: string;
    brand: string;
    detailedView?: {
      id: string;
      image: string;
      modal: string;
      owner: string;
      budget: string;
      Fuel: string;
      transmission: string;
      bodyType: string;
      location: string;
      kms: string;
    }[]
  }
  