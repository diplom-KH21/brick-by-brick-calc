
-- Внутрішні роботи (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('interior-wall-preparation', 'Підготовка стін під фарбування', 120, 'м²', 'interior'),
  ('interior-ceiling-painting', 'Фарбування стелі', 150, 'м²', 'interior'),
  ('interior-wall-painting', 'Фарбування стін', 130, 'м²', 'interior'),
  ('interior-baseboards', 'Установка плінтусів', 80, 'м.п.', 'interior'),
  ('interior-door-trim', 'Установка дверних наличників', 200, 'компл', 'interior'),
  ('interior-built-in-wardrobe', 'Вбудована шафа', 8000, 'шт', 'interior'),
  ('interior-shelving', 'Установка полиць', 500, 'м.п.', 'interior'),
  ('interior-mirror-installation', 'Установка дзеркал', 300, 'шт', 'interior'),
  ('interior-partition-wall', 'Зведення перегородки', 450, 'м²', 'interior'),
  ('interior-arch-construction', 'Спорудження арки', 3000, 'шт', 'interior');

-- Зовнішні роботи (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('exterior-facade-cleaning', 'Очищення фасаду', 80, 'м²', 'exterior'),
  ('exterior-facade-painting', 'Фарбування фасаду', 200, 'м²', 'exterior'),
  ('exterior-siding-installation', 'Монтаж сайдингу', 350, 'м²', 'exterior'),
  ('exterior-balcony-repair', 'Ремонт балкона', 2500, 'шт', 'exterior'),
  ('exterior-entrance-repair', 'Ремонт під''їзду', 15000, 'шт', 'exterior'),
  ('exterior-roof-cleaning', 'Очищення покрівлі', 100, 'м²', 'exterior'),
  ('exterior-gutter-cleaning', 'Очищення водостоків', 50, 'м.п.', 'exterior'),
  ('exterior-window-washing', 'Миття вікон', 150, 'шт', 'exterior'),
  ('exterior-facade-restoration', 'Реставрація фасаду', 800, 'м²', 'exterior'),
  ('exterior-awning-installation', 'Установка навісу', 4000, 'шт', 'exterior');

-- Підлогові роботи (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('flooring-screed', 'Стяжка підлоги', 180, 'м²', 'flooring'),
  ('flooring-self-leveling', 'Самовирівнююча стяжка', 250, 'м²', 'flooring'),
  ('flooring-parquet', 'Паркетна підлога', 800, 'м²', 'flooring'),
  ('flooring-engineered-wood', 'Інженерна дошка', 600, 'м²', 'flooring'),
  ('flooring-tile-laying', 'Укладка плитки', 400, 'м²', 'flooring'),
  ('flooring-vinyl-installation', 'Вініловий підлога', 300, 'м²', 'flooring'),
  ('flooring-underfloor-prep', 'Підготовка основи', 120, 'м²', 'flooring'),
  ('flooring-skirting-board', 'Установка підлогових плінтусів', 100, 'м.п.', 'flooring'),
  ('flooring-threshold-strips', 'Поріжки для підлоги', 150, 'м.п.', 'flooring'),
  ('flooring-polishing', 'Полірування підлоги', 200, 'м²', 'flooring');

-- Опалення та вентиляція (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('hvac-boiler-installation', 'Установка котла', 8000, 'шт', 'hvac'),
  ('hvac-ductwork', 'Монтаж повітроводів', 300, 'м.п.', 'hvac'),
  ('hvac-ventilation-system', 'Система вентиляції', 500, 'м²', 'hvac'),
  ('hvac-air-conditioning', 'Кондиціонування', 12000, 'шт', 'hvac'),
  ('hvac-heat-pump', 'Тепловий насос', 25000, 'шт', 'hvac'),
  ('hvac-radiator-connection', 'Підключення радіаторів', 800, 'шт', 'hvac'),
  ('hvac-thermostat', 'Термостат', 1500, 'шт', 'hvac'),
  ('hvac-pipe-insulation', 'Ізоляція труб опалення', 100, 'м.п.', 'hvac'),
  ('hvac-exhaust-fan', 'Витяжний вентилятор', 1200, 'шт', 'hvac'),
  ('hvac-system-balancing', 'Балансування системи', 3000, 'компл', 'hvac');

-- Благоустрій території (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('landscaping-lawn-installation', 'Влаштування газону', 150, 'м²', 'landscaping'),
  ('landscaping-tree-planting', 'Посадка дерев', 800, 'шт', 'landscaping'),
  ('landscaping-flower-beds', 'Квіткові клумби', 300, 'м²', 'landscaping'),
  ('landscaping-pathway-paving', 'Мощення доріжок', 400, 'м²', 'landscaping'),
  ('landscaping-fence-installation', 'Установка паркану', 500, 'м.п.', 'landscaping'),
  ('landscaping-irrigation', 'Система зрошення', 200, 'м²', 'landscaping'),
  ('landscaping-outdoor-lighting', 'Зовнішнє освітлення', 350, 'м.п.', 'landscaping'),
  ('landscaping-gazebo', 'Будівництво альтанки', 15000, 'шт', 'landscaping'),
  ('landscaping-retaining-walls', 'Підпірні стінки', 800, 'м²', 'landscaping'),
  ('landscaping-drainage', 'Дренажна система', 180, 'м.п.', 'landscaping');

-- Гідроізоляційні роботи (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('waterproofing-basement', 'Гідроізоляція підвалу', 300, 'м²', 'waterproofing'),
  ('waterproofing-foundation', 'Гідроізоляція фундаменту', 250, 'м²', 'waterproofing'),
  ('waterproofing-bathroom', 'Гідроізоляція ванної', 400, 'м²', 'waterproofing'),
  ('waterproofing-balcony', 'Гідроізоляція балкона', 350, 'м²', 'waterproofing'),
  ('waterproofing-roof-membrane', 'Мембранна покрівля', 280, 'м²', 'waterproofing'),
  ('waterproofing-liquid-rubber', 'Рідина гума', 320, 'м²', 'waterproofing'),
  ('waterproofing-penetrating', 'Проникаюча гідроізоляція', 200, 'м²', 'waterproofing'),
  ('waterproofing-injection', 'Ін''єкційна гідроізоляція', 500, 'м.п.', 'waterproofing'),
  ('waterproofing-pool', 'Гідроізоляція басейну', 600, 'м²', 'waterproofing'),
  ('waterproofing-terrace', 'Гідроізоляція тераси', 380, 'м²', 'waterproofing');

-- Декоративні роботи (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('decorative-molding', 'Декоративні молдинги', 150, 'м.п.', 'decorative'),
  ('decorative-ceiling-rosettes', 'Потолочні розетки', 800, 'шт', 'decorative'),
  ('decorative-wall-panels', 'Декоративні панелі', 600, 'м²', 'decorative'),
  ('decorative-faux-painting', 'Декоративне фарбування', 400, 'м²', 'decorative'),
  ('decorative-stucco', 'Декоративна ліпнина', 1200, 'м²', 'decorative'),
  ('decorative-wallpaper', 'Дизайнерські шпалери', 350, 'м²', 'decorative'),
  ('decorative-art-installation', 'Художнє оформлення', 2000, 'м²', 'decorative'),
  ('decorative-niche', 'Декоративні ніші', 1500, 'шт', 'decorative'),
  ('decorative-columns', 'Декоративні колони', 3000, 'шт', 'decorative'),
  ('decorative-fireplace-surround', 'Облицювання каміна', 8000, 'шт', 'decorative');

-- Металеві конструкції (10 послуг)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('metalwork-stairs', 'Металеві сходи', 2500, 'м.п.', 'metalwork'),
  ('metalwork-railings', 'Металеві перила', 800, 'м.п.', 'metalwork'),
  ('metalwork-gates', 'Металеві ворота', 12000, 'шт', 'metalwork'),
  ('metalwork-fence', 'Металевий паркан', 600, 'м.п.', 'metalwork'),
  ('metalwork-carport', 'Металевий навіс', 1500, 'м²', 'metalwork'),
  ('metalwork-balcony', 'Металевий балкон', 15000, 'шт', 'metalwork'),
  ('metalwork-fire-escape', 'Пожежні сходи', 3000, 'м.п.', 'metalwork'),
  ('metalwork-canopy', 'Металевий козирок', 2000, 'м²', 'metalwork'),
  ('metalwork-framework', 'Металокаркас', 1800, 'тонна', 'metalwork'),
  ('metalwork-welding', 'Зварювальні роботи', 500, 'година', 'metalwork');
