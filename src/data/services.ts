
export const categories = [
  { id: "demolition", name: "Демонтажні роботи", icon: "🔨" },
  { id: "interior", name: "Внутрішні роботи", icon: "🏠" },
  { id: "exterior", name: "Зовнішні роботи", icon: "🏗️" },
  { id: "plumbing", name: "Сантехнічні роботи", icon: "🚿" },
  { id: "electrical", name: "Електромонтажні роботи", icon: "⚡" },
  { id: "roofing", name: "Покрівельні роботи", icon: "🏠" },
  { id: "flooring", name: "Підлогові роботи", icon: "🔲" },
  { id: "heating", name: "Опалення та вентиляція", icon: "🔥" },
  { id: "landscaping", name: "Благоустрій території", icon: "🌳" },
  { id: "windows", name: "Вікна та двері", icon: "🚪" }
];

export const constructionServices = [
  // Демонтажні роботи
  { id: "wall_demolition", name: "Демонтаж стін", price: 250, unit: "м²", category: "demolition" },
  { id: "floor_demolition", name: "Демонтаж підлоги", price: 150, unit: "м²", category: "demolition" },
  { id: "ceiling_demolition", name: "Демонтаж стелі", price: 180, unit: "м²", category: "demolition" },
  { id: "tile_removal", name: "Зняття плитки", price: 120, unit: "м²", category: "demolition" },
  { id: "wallpaper_removal", name: "Зняття шпалер", price: 45, unit: "м²", category: "demolition" },

  // Внутрішні роботи
  { id: "wall_painting", name: "Фарбування стін", price: 180, unit: "м²", category: "interior" },
  { id: "wallpaper_installation", name: "Поклейка шпалер", price: 220, unit: "м²", category: "interior" },
  { id: "ceiling_installation", name: "Монтаж натяжної стелі", price: 450, unit: "м²", category: "interior" },
  { id: "wall_plastering", name: "Штукатурка стін", price: 320, unit: "м²", category: "interior" },
  { id: "drywall_installation", name: "Монтаж гіпсокартону", price: 280, unit: "м²", category: "interior" },

  // Зовнішні роботи
  { id: "facade_insulation", name: "Утеплення фасаду", price: 550, unit: "м²", category: "exterior" },
  { id: "facade_painting", name: "Фарбування фасаду", price: 220, unit: "м²", category: "exterior" },
  { id: "siding_installation", name: "Монтаж сайдингу", price: 380, unit: "м²", category: "exterior" },
  { id: "foundation_repair", name: "Ремонт фундаменту", price: 850, unit: "м.п.", category: "exterior" },
  { id: "balcony_glazing", name: "Скління балкона", price: 1200, unit: "м²", category: "exterior" },

  // Сантехнічні роботи
  { id: "toilet_installation", name: "Встановлення унітазу", price: 800, unit: "шт", category: "plumbing" },
  { id: "sink_installation", name: "Встановлення раковини", price: 600, unit: "шт", category: "plumbing" },
  { id: "shower_installation", name: "Встановлення душової кабіни", price: 1500, unit: "шт", category: "plumbing" },
  { id: "pipe_replacement", name: "Заміна труб", price: 280, unit: "м.п.", category: "plumbing" },
  { id: "bathtub_installation", name: "Встановлення ванни", price: 1200, unit: "шт", category: "plumbing" },

  // Електромонтажні роботи
  { id: "wiring_replacement", name: "Заміна проводки", price: 450, unit: "м.п.", category: "electrical" },
  { id: "socket_installation", name: "Встановлення розеток", price: 250, unit: "шт", category: "electrical" },
  { id: "switch_installation", name: "Встановлення вимикачів", price: 180, unit: "шт", category: "electrical" },
  { id: "chandelier_installation", name: "Встановлення люстри", price: 500, unit: "шт", category: "electrical" },
  { id: "electrical_panel", name: "Встановлення електрощита", price: 2200, unit: "шт", category: "electrical" },

  // Покрівельні роботи
  { id: "roof_repair", name: "Ремонт покрівлі", price: 380, unit: "м²", category: "roofing" },
  { id: "tile_roofing", name: "Покрівля черепицею", price: 650, unit: "м²", category: "roofing" },
  { id: "metal_roofing", name: "Металочерепиця", price: 420, unit: "м²", category: "roofing" },
  { id: "gutter_installation", name: "Встановлення водостоків", price: 320, unit: "м.п.", category: "roofing" },
  { id: "roof_insulation", name: "Утеплення даху", price: 480, unit: "м²", category: "roofing" },

  // Підлогові роботи
  { id: "laminate_flooring", name: "Укладання ламінату", price: 280, unit: "м²", category: "flooring" },
  { id: "parquet_installation", name: "Укладання паркету", price: 450, unit: "м²", category: "flooring" },
  { id: "tile_flooring", name: "Укладання плитки", price: 380, unit: "м²", category: "flooring" },
  { id: "floor_leveling", name: "Вирівнювання підлоги", price: 220, unit: "м²", category: "flooring" },
  { id: "linoleum_installation", name: "Укладання лінолеуму", price: 150, unit: "м²", category: "flooring" },

  // Опалення та вентиляція
  { id: "radiator_installation", name: "Встановлення радіаторів", price: 1200, unit: "шт", category: "heating" },
  { id: "boiler_installation", name: "Встановлення котла", price: 3500, unit: "шт", category: "heating" },
  { id: "ventilation_system", name: "Монтаж вентиляції", price: 850, unit: "м²", category: "heating" },
  { id: "underfloor_heating", name: "Тепла підлога", price: 550, unit: "м²", category: "heating" },
  { id: "chimney_installation", name: "Встановлення димоходу", price: 1800, unit: "м.п.", category: "heating" },

  // Благоустрій території
  { id: "lawn_installation", name: "Влаштування газону", price: 120, unit: "м²", category: "landscaping" },
  { id: "pathway_construction", name: "Будівництво доріжок", price: 380, unit: "м²", category: "landscaping" },
  { id: "fence_installation", name: "Встановлення паркану", price: 450, unit: "м.п.", category: "landscaping" },
  { id: "garden_design", name: "Ландшафтний дизайн", price: 280, unit: "м²", category: "landscaping" },
  { id: "drainage_system", name: "Дренажна система", price: 320, unit: "м.п.", category: "landscaping" },

  // Вікна та двері
  { id: "window_installation", name: "Встановлення вікон", price: 1500, unit: "шт", category: "windows" },
  { id: "door_installation", name: "Встановлення дверей", price: 800, unit: "шт", category: "windows" },
  { id: "window_repair", name: "Ремонт вікон", price: 450, unit: "шт", category: "windows" },
  { id: "door_adjustment", name: "Регулювання дверей", price: 250, unit: "шт", category: "windows" },
  { id: "windowsill_installation", name: "Встановлення підвіконня", price: 380, unit: "м.п.", category: "windows" }
];
