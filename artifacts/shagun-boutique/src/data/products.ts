export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  category: "Women" | "Men's Ethnic" | "Kids";
  subCategory: string;
  image: string;
  badge?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Gulmohar Silk Lehenga",
    price: 45999,
    originalPrice: 52000,
    category: "Women",
    subCategory: "Lehenga",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    description: "A rich maroon silk lehenga adorned with intricate zardozi embroidery."
  },
  {
    id: 2,
    title: "Ivory Chanderi Kurta Set",
    price: 18500,
    category: "Men's Ethnic",
    subCategory: "Kurta Set",
    image: "https://images.unsplash.com/photo-1614660309652-3ebf50125e19?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    description: "Classic ivory kurta set in fine Chanderi silk, perfect for day events."
  },
  {
    id: 3,
    title: "Midnight Blue Velvet Saree",
    price: 28999,
    originalPrice: 32000,
    category: "Women",
    subCategory: "Saree",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Deep blue velvet saree featuring a heavy antique gold border."
  },
  {
    id: 4,
    title: "Regal Gold Sherwani",
    price: 65000,
    category: "Men's Ethnic",
    subCategory: "Sherwani",
    image: "https://images.unsplash.com/photo-1559582798-678dfc71cee4?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    description: "A masterpiece in gold brocade, tailored for the modern groom."
  },
  {
    id: 5,
    title: "Blush Pink Organza Sharara",
    price: 22499,
    category: "Women",
    subCategory: "Sarara Set",
    image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=800&q=80",
    description: "Soft pink organza layered sharara with mirror work detailing."
  },
  {
    id: 6,
    title: "Emerald Silk Salwar Kameez",
    price: 16500,
    originalPrice: 19000,
    category: "Women",
    subCategory: "Salwar Kameez",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac062?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    description: "Rich emerald green pure silk suit with a contrast Banarasi dupatta."
  },
  {
    id: 7,
    title: "Little Nawab Kurta",
    price: 4999,
    category: "Kids",
    subCategory: "Boys Partywear",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable and stylish cotton silk kurta set for boys."
  },
  {
    id: 8,
    title: "Rose Gold Party Gown",
    price: 8500,
    category: "Kids",
    subCategory: "Girls Partywear",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
    description: "Fairy-tale gown with delicate sequins and a soft tulle skirt."
  }
];
