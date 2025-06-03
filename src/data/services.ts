
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
  { id: "windows", name: "Вікна та двері", icon: "🚪" },
  { id: "insulation", name: "Теплоізоляційні роботи", icon: "🧱" },
  { id: "waterproofing", name: "Гідроізоляційні роботи", icon: "💧" },
  { id: "decoration", name: "Декоративні роботи", icon: "🎨" },
  { id: "concrete", name: "Бетонні роботи", icon: "🏗️" },
  { id: "metalwork", name: "Металеві конструкції", icon: "⚙️" }
];

export const constructionServices = [
  // Демонтажні роботи - Updated prices
  { id: "wall_demolition", name: "Демонтаж стін", price: 180, unit: "м²", category: "demolition" },
  { id: "floor_demolition", name: "Демонтаж підлоги", price: 120, unit: "м²", category: "demolition" },
  { id: "ceiling_demolition", name: "Демонтаж стелі", price: 150, unit: "м²", category: "demolition" },
  { id: "tile_removal", name: "Зняття плитки", price: 85, unit: "м²", category: "demolition" },
  { id: "wallpaper_removal", name: "Зняття шпалер", price: 35, unit: "м²", category: "demolition" },

  // Внутрішні роботи - Updated prices
  { id: "wall_painting", name: "Фарбування стін", price: 120, unit: "м²", category: "interior" },
  { id: "wallpaper_installation", name: "Поклейка шпалер", price: 160, unit: "м²", category: "interior" },
  { id: "ceiling_installation", name: "Монтаж натяжної стелі", price: 320, unit: "м²", category: "interior" },
  { id: "wall_plastering", name: "Штукатурка стін", price: 220, unit: "м²", category: "interior" },
  { id: "drywall_installation", name: "Монтаж гіпсокартону", price: 200, unit: "м²", category: "interior" },

  // Зовнішні роботи - Updated prices
  { id: "facade_insulation", name: "Утеплення фасаду", price: 420, unit: "м²", category: "exterior" },
  { id: "facade_painting", name: "Фарбування фасаду", price: 180, unit: "м²", category: "exterior" },
  { id: "siding_installation", name: "Монтаж сайдингу", price: 280, unit: "м²", category: "exterior" },
  { id: "foundation_repair", name: "Ремонт фундаменту", price: 650, unit: "м.п.", category: "exterior" },
  { id: "balcony_glazing", name: "Скління балкона", price: 950, unit: "м²", category: "exterior" },

  // Сантехнічні роботи - Updated prices
  { id: "toilet_installation", name: "Встановлення унітазу", price: 600, unit: "шт", category: "plumbing" },
  { id: "sink_installation", name: "Встановлення раковини", price: 450, unit: "шт", category: "plumbing" },
  { id: "shower_installation", name: "Встановлення душової кабіни", price: 1200, unit: "шт", category: "plumbing" },
  { id: "pipe_replacement", name: "Заміна труб", price: 220, unit: "м.п.", category: "plumbing" },
  { id: "bathtub_installation", name: "Встановлення ванни", price: 900, unit: "шт", category: "plumbing" },

  // Електромонтажні роботи - Updated prices
  { id: "wiring_replacement", name: "Заміна проводки", price: 350, unit: "м.п.", category: "electrical" },
  { id: "socket_installation", name: "Встановлення розеток", price: 180, unit: "шт", category: "electrical" },
  { id: "switch_installation", name: "Встановлення вимикачів", price: 140, unit: "шт", category: "electrical" },
  { id: "chandelier_installation", name: "Встановлення люстри", price: 380, unit: "шт", category: "electrical" },
  { id: "electrical_panel", name: "Встановлення електрощита", price: 1800, unit: "шт", category: "electrical" },

  // Покрівельні роботи - Updated prices
  { id: "roof_repair", name: "Ремонт покрівлі", price: 280, unit: "м²", category: "roofing" },
  { id: "tile_roofing", name: "Покрівля черепицею", price: 480, unit: "м²", category: "roofing" },
  { id: "metal_roofing", name: "Металочерепиця", price: 320, unit: "м²", category: "roofing" },
  { id: "gutter_installation", name: "Встановлення водостоків", price: 240, unit: "м.п.", category: "roofing" },
  { id: "roof_insulation", name: "Утеплення даху", price: 350, unit: "м²", category: "roofing" },

  // Підлогові роботи - Updated prices
  { id: "laminate_flooring", name: "Укладання ламінату", price: 200, unit: "м²", category: "flooring" },
  { id: "parquet_installation", name: "Укладання паркету", price: 320, unit: "м²", category: "flooring" },
  { id: "tile_flooring", name: "Укладання плитки", price: 280, unit: "м²", category: "flooring" },
  { id: "floor_leveling", name: "Вирівнювання підлоги", price: 160, unit: "м²", category: "flooring" },
  { id: "linoleum_installation", name: "Укладання лінолеуму", price: 120, unit: "м²", category: "flooring" },

  // Опалення та вентиляція - Updated prices
  { id: "radiator_installation", name: "Встановлення радіаторів", price: 900, unit: "шт", category: "heating" },
  { id: "boiler_installation", name: "Встановлення котла", price: 2800, unit: "шт", category: "heating" },
  { id: "ventilation_system", name: "Монтаж вентиляції", price: 650, unit: "м²", category: "heating" },
  { id: "underfloor_heating", name: "Тепла підлога", price: 420, unit: "м²", category: "heating" },
  { id: "chimney_installation", name: "Встановлення димоходу", price: 1400, unit: "м.п.", category: "heating" },

  // Благоустрій території - Updated prices
  { id: "lawn_installation", name: "Влаштування газону", price: 80, unit: "м²", category: "landscaping" },
  { id: "pathway_construction", name: "Будівництво доріжок", price: 280, unit: "м²", category: "landscaping" },
  { id: "fence_installation", name: "Встановлення паркану", price: 320, unit: "м.п.", category: "landscaping" },
  { id: "garden_design", name: "Ландшафтний дизайн", price: 200, unit: "м²", category: "landscaping" },
  { id: "drainage_system", name: "Дренажна система", price: 240, unit: "м.п.", category: "landscaping" },

  // Вікна та двері - Updated prices
  { id: "window_installation", name: "Встановлення вікон", price: 1200, unit: "шт", category: "windows" },
  { id: "door_installation", name: "Встановлення дверей", price: 600, unit: "шт", category: "windows" },
  { id: "window_repair", name: "Ремонт вікон", price: 320, unit: "шт", category: "windows" },
  { id: "door_adjustment", name: "Регулювання дверей", price: 180, unit: "шт", category: "windows" },
  { id: "windowsill_installation", name: "Встановлення підвіконня", price: 280, unit: "м.п.", category: "windows" },

  // Теплоізоляційні роботи - New category
  { id: "wall_insulation", name: "Утеплення стін", price: 180, unit: "м²", category: "insulation" },
  { id: "attic_insulation", name: "Утеплення горища", price: 140, unit: "м²", category: "insulation" },
  { id: "basement_insulation", name: "Утеплення підвалу", price: 160, unit: "м²", category: "insulation" },
  { id: "pipe_insulation", name: "Утеплення труб", price: 80, unit: "м.п.", category: "insulation" },
  { id: "thermal_bridge_elimination", name: "Усунення мостиків холоду", price: 220, unit: "м.п.", category: "insulation" },

  // Гідроізоляційні роботи - New category
  { id: "basement_waterproofing", name: "Гідроізоляція підвалу", price: 240, unit: "м²", category: "waterproofing" },
  { id: "roof_waterproofing", name: "Гідроізоляція покрівлі", price: 180, unit: "м²", category: "waterproofing" },
  { id: "bathroom_waterproofing", name: "Гідроізоляція ванної", price: 320, unit: "м²", category: "waterproofing" },
  { id: "foundation_waterproofing", name: "Гідроізоляція фундаменту", price: 280, unit: "м²", category: "waterproofing" },
  { id: "balcony_waterproofing", name: "Гідроізоляція балкона", price: 260, unit: "м²", category: "waterproofing" },

  // Декоративні роботи - New category
  { id: "decorative_plaster", name: "Декоративна штукатурка", price: 380, unit: "м²", category: "decoration" },
  { id: "stone_veneer", name: "Облицювання каменем", price: 520, unit: "м²", category: "decoration" },
  { id: "wood_paneling", name: "Обшивка деревом", price: 450, unit: "м²", category: "decoration" },
  { id: "ceiling_molding", name: "Монтаж ліпнини", price: 180, unit: "м.п.", category: "decoration" },
  { id: "artistic_painting", name: "Художнє розпиc", price: 800, unit: "м²", category: "decoration" },

  // Бетонні роботи - New category
  { id: "concrete_pouring", name: "Заливка бетону", price: 220, unit: "м³", category: "concrete" },
  { id: "concrete_screed", name: "Бетонна стяжка", price: 180, unit: "м²", category: "concrete" },
  { id: "reinforcement_work", name: "Армування", price: 120, unit: "м²", category: "concrete" },
  { id: "concrete_cutting", name: "Різання бетону", price: 300, unit: "м.п.", category: "concrete" },
  { id: "concrete_repair", name: "Ремонт бетону", price: 250, unit: "м²", category: "concrete" },

  // Металеві конструкції - New category
  { id: "steel_frame", name: "Металевий каркас", price: 450, unit: "м²", category: "metalwork" },
  { id: "railing_installation", name: "Встановлення перил", price: 380, unit: "м.п.", category: "metalwork" },
  { id: "metal_stairs", name: "Металеві сходи", price: 1200, unit: "м²", category: "metalwork" },
  { id: "welding_work", name: "Зварювальні роботи", price: 200, unit: "м.п.", category: "metalwork" },
  { id: "metal_roofing_frame", name: "Каркас під покрівлю", price: 320, unit: "м²", category: "metalwork" }
];
