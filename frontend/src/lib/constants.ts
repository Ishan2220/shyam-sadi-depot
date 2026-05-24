export const BRAND = {
  name: "Shyam Sadi Depot",
  tagline: "25+ Years of Trust & Elegance",
  description:
    "Shyam Sadi Depot is a trusted family saree business serving customers for more than 25 years. We provide original and premium sarees from all over India.",
  phone: "+91 81778 87720",
  email: "abhichandwani8888@gmail.com",
  whatsapp: "918177887720",
  instagram: "https://instagram.com/shyamsadidepot",
  facebook: "https://www.facebook.com/profile.php?id=61561722380386",
  address: "Lohiya compound main road, Opposite Gurunanak petrol pump, Gandhinagar, Kolhapur, Maharashtra 416119",
  mapUrl: "https://www.google.com/maps/dir/?api=1&destination=16.70538117735975,74.29537049030138",
  gstin: "27ABBPC6348R1Z8",
};

export const CATEGORIES = [
  {
    name: "Printed Sarees",
    slug: "printed-sarees",
    image: "/images/sub_fancy_printed.png",
    subcategories: [
      { name: "आयरी Printed", slug: "ayri-printed" },
      { name: "Fancy Printed", slug: "fancy-printed" },
    ],
  },
  {
    name: "Party Wear",
    slug: "party-wear",
    image: "/images/sub_embroidery.png",
    subcategories: [
      { name: "Designer Sarees", slug: "designer-sarees" },
      { name: "Designer Bridal Wear", slug: "designer-bridal-wear" },
    ],
  },
  {
    name: "काठपदर",
    slug: "kathpadar",
    image: "/images/sub_paithani.png",
    subcategories: [
      { name: "Kanjivaram", slug: "kanjivaram" },
      { name: "Dharmavaram", slug: "dharmavaram" },
      { name: "Peshwai Silk", slug: "peshwai-silk" },
      { name: "Paithani", slug: "paithani" },
      { name: "Wedding Collection", slug: "wedding-collection" },
    ],
  },
  {
    name: "9 Wari Sarees",
    slug: "9-wari-sarees",
    image: "/images/sub_nauvari.png",
    subcategories: [
      { name: "9 Wari Sarees", slug: "9-wari-sarees-sub" }
    ],
  },
  {
    name: "Cotton Summer Collection",
    slug: "cotton-summer-collection",
    image: "/images/summer_collection.png",
    subcategories: [
      { name: "Cotton Sarees", slug: "cotton-sarees-sub" }
    ],
  },
  {
    name: "Uniform Sarees",
    slug: "uniform-sarees",
    image: "/images/uniform_saree.png",
    subcategories: [
      { name: "Uniform Sarees", slug: "uniform-sarees-sub" }
    ],
  },
] as const;

export const SUBCATEGORY_IMAGES: Record<string, string> = {
  "ayri-printed": "/images/sub_ayri.png",
  "fancy-printed": "/images/sub_fancy_printed.png",
  "designer-sarees": "/images/sub_embroidery.png",
  "designer-bridal-wear": "/images/sub_bridal_wear.png",
  "kanjivaram": "/images/sub_kanjivaram.png",
  "dharmavaram": "/images/sub_dharmavaram.png",
  "peshwai-silk": "/images/sub_peshwai_silk.png",
  "paithani": "/images/sub_paithani.png",
  "wedding-collection": "/images/wedding_collection.png",
  "9-wari-sarees-sub": "/images/sub_nauvari.png",
  "cotton-sarees-sub": "/images/summer_collection.png",
  "uniform-sarees-sub": "/images/uniform_saree.png",
};

export const ADMIN_CATEGORIES = [
  "Printed Sarees",
  "Party Wear",
  "काठपदर",
  "9 Wari Sarees",
  "Cotton Summer Collection",
  "Uniform Sarees",
];
