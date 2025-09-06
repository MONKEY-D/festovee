// helper to grab all images in a folder
function getImages(glob) {
  return Object.values(glob).map((mod) => mod.default);
}

// helper to pick a random one
function pickRandom(images) {
  return images[Math.floor(Math.random() * images.length)];
}

// Load all images into memory once
const images = {
  handlooms: getImages(
    import.meta.glob("./HandloomsAndTextiles/*.jpg", { eager: true })
  ),
  apparel: getImages(
    import.meta.glob("./ApparelAndFashion/*.jpg", { eager: true })
  ),
  homeLiving: getImages(
    import.meta.glob("./HomeAndLiving/*.jpg", { eager: true })
  ),
  electronics: getImages(
    import.meta.glob("./ElectronicsAndAppliances/*.jpg", { eager: true })
  ),
  stationery: getImages(
    import.meta.glob("./StationaryAndOffice/*.jpg", { eager: true })
  ),
  health: getImages(
    import.meta.glob("./HealthAndWellness/*.jpg", { eager: true })
  ),
  food: getImages(
    import.meta.glob("./FoodAndBeverages/*.jpg", { eager: true })
  ),
  bamboo: getImages(
    import.meta.glob("./SustainableProducts/*.jpg", { eager: true })
  ),
  industrial: getImages(
    import.meta.glob("./IndustrialAndRawMaterials/*.jpg", { eager: true })
  ),
  automobile: getImages(
    import.meta.glob("./AutomobileAndSpareparts/*.jpg", { eager: true })
  ),
  logistics: getImages(
    import.meta.glob("./LogisticsAndPackaging/*.jpg", { eager: true })
  ),
  exportExclusive: getImages(
    import.meta.glob("./ExportsExclusive/*.jpg", { eager: true })
  ),
};

// function that returns categories with fresh random images
export function getCategories() {
  return [
    { category: "Handlooms & Textiles", image: pickRandom(images.handlooms) },
    { category: "Apparel & Fashion", image: pickRandom(images.apparel) },
    { category: "Home & Living", image: pickRandom(images.homeLiving) },
    {
      category: "Electronics & Appliances",
      image: pickRandom(images.electronics),
    },
    {
      category: "Stationery & Office Supplies",
      image: pickRandom(images.stationery),
    },
    { category: "Health & Wellness", image: pickRandom(images.health) },
    { category: "Food & Beverages", image: pickRandom(images.food) },
    {
      category: "Bamboo & Sustainable Products",
      image: pickRandom(images.bamboo),
    },
    {
      category: "Industrial & Raw Materials",
      image: pickRandom(images.industrial),
    },
    {
      category: "Automobile & Spare Parts",
      image: pickRandom(images.automobile),
    },
    { category: "Logistics & Packaging", image: pickRandom(images.logistics) },
    {
      category: "Export-Exclusive Section",
      image: pickRandom(images.exportExclusive),
    },
  ];
}
