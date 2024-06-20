
export interface Image {
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }
  
  export interface Slug {
    _type: string;
    current: string;
  }
  
  export interface Product {
    _id: string;
    _type: string;
    name: string;
    slug: Slug;
    price: number;
    availableQty: number;
    details: string;
    image: Image[];
  }
  