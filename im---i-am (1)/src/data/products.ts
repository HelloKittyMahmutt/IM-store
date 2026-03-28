export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
  sizes: string[];
  statement?: string;
  quote?: string;
  details?: string[];
  fit?: string;
  delivery?: string;
}

export const products: Product[] = [
  {
    id: "im-tank",
    name: "IM TANK",
    price: 49,
    shortDescription: "The foundation.",
    description: "A core layer built for daily wear. It sits close to the body. It moves with you. No excess fabric. Just a clean shape that holds its form.",
    images: [
      "/tank-front.png",
      "/tank-back.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    statement: "Essential form.",
    quote: "IM — Everything I Want To Be.",
    details: [
      "88% nylon, 12% spandex",
      "190 GSM weight",
      "Clean bound edges",
      "Matte finish"
    ],
    fit: "True to size. Designed to sit close to the body.",
    delivery: "Standard delivery in 2-4 business days."
  },
  {
    id: "im-tee",
    name: "IM TEE",
    price: 59,
    shortDescription: "The standard.",
    description: "A heavy t-shirt with a structured drape. It feels substantial. The cut is precise. It looks sharp on its own. It layers perfectly.",
    images: [
      "/tee-front.png",
      "/tee-back.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    statement: "Uncompromising cut.",
    quote: "IM — Everything I Want To Be.",
    details: [
      "80% nylon, 20% spandex",
      "220 GSM weight",
      "Structured collar",
      "Smooth drape"
    ],
    fit: "Slightly relaxed. Take your normal size.",
    delivery: "Standard delivery in 2-4 business days."
  },
  {
    id: "im-long-sleeve",
    name: "IM LONG SLEEVE",
    price: 69,
    shortDescription: "The uniform.",
    description: "Full coverage with a clean silhouette. The fabric has weight. It keeps its shape through movement. A reliable piece for any environment.",
    images: [
      "/longsleeve-front.png",
      "/longsleeve-back.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    statement: "Quiet strength.",
    quote: "IM — Everything I Want To Be.",
    details: [
      "80% nylon, 20% spandex",
      "220 GSM weight",
      "Fitted cuffs",
      "Structured drape"
    ],
    fit: "True to size with a relaxed drape.",
    delivery: "Standard delivery in 2-4 business days."
  }
];
