export interface SubcategoryItem {
  label: string;
  slug: string;
}

export interface MenuCategory {
  name: string;
  slug: string;
  items: SubcategoryItem[];
}

export const megaMenuCategories: MenuCategory[] = [
  {
    name: "Women",
    slug: "women",
    items: [
      { label: "Salwar Kameez", slug: "salwar-kameez" },
      { label: "Sharara Sets", slug: "sharara-sets" },
      { label: "Lehengas", slug: "lehengas" },
      { label: "Sarees", slug: "sarees" },
      { label: "Gowns", slug: "gowns" },
      { label: "Designer Blouses", slug: "designer-blouses" },
    ],
  },
  {
    name: "Men's Ethnic",
    slug: "men",
    items: [
      { label: "Kurta Sets", slug: "kurta-sets" },
      { label: "Sherwanis", slug: "sherwanis" },
      { label: "Nehru Jackets", slug: "nehru-jackets" },
    ],
  },
  {
    name: "Kids",
    slug: "kids",
    items: [
      { label: "Boys Partywear", slug: "boys-partywear" },
      { label: "Girls Lehengas", slug: "girls-lehengas" },
    ],
  },
];

export const categorySlugMap: Record<string, string> = {
  women: "Women",
  men: "Men's Ethnic",
  kids: "Kids",
};

export const subCategorySlugMap: Record<string, string> = {
  "salwar-kameez": "Salwar Kameez",
  "sharara-sets": "Sarara Set",
  "lehengas": "Lehenga",
  "sarees": "Saree",
  "gowns": "Gown",
  "designer-blouses": "Blouse",
  "kurta-sets": "Kurta Set",
  "sherwanis": "Sherwani",
  "nehru-jackets": "Nehru Jacket",
  "boys-partywear": "Boys Partywear",
  "girls-lehengas": "Girls Partywear",
};
