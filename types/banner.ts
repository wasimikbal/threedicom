
export interface Image {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }
  
  export interface Banner {
    _id: string;
    _type: string;
    image: Image;
    buttonText: string;
    product: string;
    desc: string;
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    discount: string;
    saleTime: string;
  }
  