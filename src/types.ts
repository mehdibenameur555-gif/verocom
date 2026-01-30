export type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export type Settings = Record<string, any>;

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
};
