
-- Добавляем дополнительные услуги по категориям (по 20 в каждой)

-- Демонтаж (добавляем еще 12 услуг к существующим 8)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('demolition-bathroom', 'Демонтаж сантехкабіни', 2500, 'шт', 'demolition'),
  ('demolition-kitchen', 'Демонтаж кухні', 3000, 'шт', 'demolition'),
  ('demolition-balcony', 'Демонтаж балкона', 1500, 'м²', 'demolition'),
  ('demolition-stairs', 'Демонтаж сходів', 500, 'м.п.', 'demolition'),
  ('demolition-heating', 'Демонтаж системи опалення', 150, 'м.п.', 'demolition'),
  ('demolition-ventilation', 'Демонтаж вентиляції', 100, 'м.п.', 'demolition'),
  ('demolition-insulation', 'Демонтаж утеплення', 80, 'м²', 'demolition'),
  ('demolition-roofing', 'Демонтаж покрівлі', 120, 'м²', 'demolition'),
  ('demolition-partition', 'Демонтаж перегородки', 200, 'м²', 'demolition'),
  ('demolition-foundation', 'Демонтаж фундаменту', 800, 'м³', 'demolition'),
  ('demolition-chimney', 'Демонтаж труби', 1000, 'шт', 'demolition'),
  ('demolition-garage', 'Демонтаж гаража', 5000, 'шт', 'demolition');

-- Кладочні роботи (добавляем еще 16 услуг к существующим 4)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('masonry-gas-blocks', 'Кладка газоблоків', 450, 'м²', 'masonry'),
  ('masonry-foam-blocks', 'Кладка пінобетону', 400, 'м²', 'masonry'),
  ('masonry-ceramic-blocks', 'Кладка керамічних блоків', 550, 'м²', 'masonry'),
  ('masonry-silicate', 'Кладка силікатної цегли', 700, 'м²', 'masonry'),
  ('masonry-facing-brick', 'Кладка облицювальної цегли', 900, 'м²', 'masonry'),
  ('masonry-clinker', 'Кладка клінкерної цегли', 1100, 'м²', 'masonry'),
  ('masonry-natural-stone', 'Кладка природного каменю', 1500, 'м²', 'masonry'),
  ('masonry-decorative-stone', 'Кладка декоративного каменю', 1300, 'м²', 'masonry'),
  ('masonry-arches', 'Кладка арок', 2000, 'м.п.', 'masonry'),
  ('masonry-columns', 'Кладка колон', 1800, 'м.п.', 'masonry'),
  ('masonry-chimney-masonry', 'Кладка димоходу', 1500, 'м.п.', 'masonry'),
  ('masonry-foundation-blocks', 'Кладка фундаментних блоків', 600, 'м²', 'masonry'),
  ('masonry-retaining-wall', 'Кладка підпірної стіни', 1000, 'м²', 'masonry'),
  ('masonry-fence', 'Кладка паркану', 800, 'м.п.', 'masonry'),
  ('masonry-barbecue', 'Кладка мангала', 8000, 'шт', 'masonry'),
  ('masonry-fireplace', 'Кладка каміна', 15000, 'шт', 'masonry');

-- Бетонні роботи (добавляем еще 16 услуг к существующим 4)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('concrete-column', 'Бетонування колон', 3000, 'м³', 'concrete'),
  ('concrete-beam', 'Бетонування балок', 2500, 'м³', 'concrete'),
  ('concrete-stairs', 'Бетонні сходи', 4000, 'м³', 'concrete'),
  ('concrete-driveway', 'Бетонування під''їзду', 350, 'м²', 'concrete'),
  ('concrete-sidewalk', 'Бетонування тротуару', 300, 'м²', 'concrete'),
  ('concrete-pool', 'Бетонування басейну', 5000, 'м³', 'concrete'),
  ('concrete-retaining', 'Підпірна стіна з бетону', 2200, 'м³', 'concrete'),
  ('concrete-fence-posts', 'Бетонування стовпів', 500, 'шт', 'concrete'),
  ('concrete-septic', 'Бетонування септика', 8000, 'шт', 'concrete'),
  ('concrete-garage-floor', 'Бетонування підлоги гаража', 400, 'м²', 'concrete'),
  ('concrete-basement', 'Бетонування підвалу', 1800, 'м³', 'concrete'),
  ('concrete-ramp', 'Бетонування пандуса', 600, 'м²', 'concrete'),
  ('concrete-well', 'Бетонні кільця колодязя', 1200, 'шт', 'concrete'),
  ('concrete-manhole', 'Бетонний люк', 2000, 'шт', 'concrete'),
  ('concrete-curb', 'Бетонний бордюр', 200, 'м.п.', 'concrete'),
  ('concrete-decorative', 'Декоративний бетон', 800, 'м²', 'concrete');

-- Покрівельні роботи (добавляем еще 16 услуг к существующим 4)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('roofing-slate', 'Покрівля шифером', 200, 'м²', 'roofing'),
  ('roofing-ondulin', 'Покрівля ондуліном', 250, 'м²', 'roofing'),
  ('roofing-bitumen', 'Бітумна покрівля', 300, 'м²', 'roofing'),
  ('roofing-polymer', 'Полімерна покрівля', 450, 'м²', 'roofing'),
  ('roofing-copper', 'Мідна покрівля', 1200, 'м²', 'roofing'),
  ('roofing-zinc', 'Цинкова покрівля', 800, 'м²', 'roofing'),
  ('roofing-thatch', 'Солом''яна покрівля', 1500, 'м²', 'roofing'),
  ('roofing-green', 'Зелена покрівля', 2000, 'м²', 'roofing'),
  ('roofing-gutters', 'Установка водостоків', 150, 'м.п.', 'roofing'),
  ('roofing-snow-guards', 'Снігозатримувачі', 80, 'м.п.', 'roofing'),
  ('roofing-ventilation', 'Вентиляція покрівлі', 300, 'м²', 'roofing'),
  ('roofing-skylight', 'Мансардні вікна', 8000, 'шт', 'roofing'),
  ('roofing-flashing', 'Планки примикання', 200, 'м.п.', 'roofing'),
  ('roofing-ridge', 'Конькові елементи', 250, 'м.п.', 'roofing'),
  ('roofing-repair', 'Ремонт покрівлі', 180, 'м²', 'roofing'),
  ('roofing-waterproofing', 'Гідроізоляція покрівлі', 220, 'м²', 'roofing');

-- Електромонтажні роботи (добавляем еще 15 услуг к существующим 5)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('electrical-cable', 'Прокладка кабелю', 100, 'м.п.', 'electrical'),
  ('electrical-conduit', 'Прокладка в гофрі', 80, 'м.п.', 'electrical'),
  ('electrical-junction-box', 'Розподільна коробка', 300, 'шт', 'electrical'),
  ('electrical-grounding', 'Заземлення', 150, 'м.п.', 'electrical'),
  ('electrical-security', 'Охоронна сигналізація', 500, 'м.п.', 'electrical'),
  ('electrical-intercom', 'Домофон', 3000, 'шт', 'electrical'),
  ('electrical-video-surveillance', 'Відеоспостереження', 800, 'шт', 'electrical'),
  ('electrical-smart-home', 'Розумний дім', 1500, 'м²', 'electrical'),
  ('electrical-ups', 'Джерело безперебійного живлення', 5000, 'шт', 'electrical'),
  ('electrical-generator', 'Підключення генератора', 8000, 'шт', 'electrical'),
  ('electrical-heating-cable', 'Нагрівальний кабель', 300, 'м.п.', 'electrical'),
  ('electrical-fan', 'Витяжний вентилятор', 1500, 'шт', 'electrical'),
  ('electrical-chandelier', 'Підвіс люстри', 800, 'шт', 'electrical'),
  ('electrical-outdoor', 'Зовнішнє освітлення', 400, 'м.п.', 'electrical'),
  ('electrical-motion-sensor', 'Датчик руху', 600, 'шт', 'electrical');

-- Сантехнічні роботи (добавляем еще 16 услуг к существующим 4)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('plumbing-toilet', 'Установка унітазу', 1200, 'шт', 'plumbing'),
  ('plumbing-sink', 'Установка раковини', 800, 'шт', 'plumbing'),
  ('plumbing-bathtub', 'Установка ванни', 2000, 'шт', 'plumbing'),
  ('plumbing-shower', 'Установка душової кабіни', 2500, 'шт', 'plumbing'),
  ('plumbing-mixer', 'Установка змішувача', 600, 'шт', 'plumbing'),
  ('plumbing-boiler', 'Установка бойлера', 3000, 'шт', 'plumbing'),
  ('plumbing-radiator', 'Установка радіатора', 1500, 'шт', 'plumbing'),
  ('plumbing-underfloor', 'Тепла підлога', 400, 'м²', 'plumbing'),
  ('plumbing-pump', 'Установка насоса', 2500, 'шт', 'plumbing'),
  ('plumbing-filter', 'Фільтр для води', 1800, 'шт', 'plumbing'),
  ('plumbing-sewage', 'Каналізаційна система', 200, 'м.п.', 'plumbing'),
  ('plumbing-drain', 'Зливна система', 180, 'м.п.', 'plumbing'),
  ('plumbing-valve', 'Установка вентилів', 400, 'шт', 'plumbing'),
  ('plumbing-meter', 'Лічильник води', 1000, 'шт', 'plumbing'),
  ('plumbing-dishwasher', 'Підключення посудомийки', 1500, 'шт', 'plumbing'),
  ('plumbing-washing-machine', 'Підключення пральної машини', 1200, 'шт', 'plumbing');

-- Оздоблювальні роботи (добавляем еще 14 услуг к существующим 6)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('finishing-gypsum', 'Гіпсова штукатурка', 180, 'м²', 'finishing'),
  ('finishing-venetian', 'Венеціанська штукатурка', 500, 'м²', 'finishing'),
  ('finishing-texture', 'Декоративна штукатурка', 350, 'м²', 'finishing'),
  ('finishing-ceramic', 'Керамічна плитка', 450, 'м²', 'finishing'),
  ('finishing-porcelain', 'Керамограніт', 550, 'м²', 'finishing'),
  ('finishing-mosaic', 'Мозаїка', 800, 'м²', 'finishing'),
  ('finishing-vinyl', 'Вінілові шпалери', 200, 'м²', 'finishing'),
  ('finishing-fabric', 'Тканинні шпалери', 350, 'м²', 'finishing'),
  ('finishing-panel', 'Стінові панелі', 400, 'м²', 'finishing'),
  ('finishing-stone-veneer', 'Декоративний камінь', 600, 'м²', 'finishing'),
  ('finishing-cork', 'Корковий підлога', 600, 'м²', 'finishing'),
  ('finishing-epoxy', 'Епоксидна підлога', 400, 'м²', 'finishing'),
  ('finishing-carpet', 'Килимове покриття', 250, 'м²', 'finishing'),
  ('finishing-linoleum', 'Лінолеум', 200, 'м²', 'finishing');

-- Утеплення (добавляем еще 17 услуг к существующим 3)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('insulation-mineral-wool', 'Мінеральна вата', 150, 'м²', 'insulation'),
  ('insulation-foam-plastic', 'Пінопласт', 120, 'м²', 'insulation'),
  ('insulation-extruded', 'Екструдований пінополістирол', 180, 'м²', 'insulation'),
  ('insulation-polyurethane', 'Поліуретанова піна', 350, 'м²', 'insulation'),
  ('insulation-ecowool', 'Ековата', 200, 'м²', 'insulation'),
  ('insulation-reflective', 'Відбивна ізоляція', 100, 'м²', 'insulation'),
  ('insulation-glass-wool', 'Скловата', 130, 'м²', 'insulation'),
  ('insulation-cork-boards', 'Коркові плити', 400, 'м²', 'insulation'),
  ('insulation-facade', 'Утеплення фасаду', 450, 'м²', 'insulation'),
  ('insulation-basement', 'Утеплення підвалу', 280, 'м²', 'insulation'),
  ('insulation-attic', 'Утеплення горища', 220, 'м²', 'insulation'),
  ('insulation-balcony', 'Утеплення балкона', 350, 'м²', 'insulation'),
  ('insulation-pipe', 'Утеплення труб', 80, 'м.п.', 'insulation'),
  ('insulation-vapor-barrier', 'Пароізоляція', 50, 'м²', 'insulation'),
  ('insulation-windproof', 'Вітрозахист', 60, 'м²', 'insulation'),
  ('insulation-soundproof', 'Звукоізоляція', 320, 'м²', 'insulation'),
  ('insulation-thermal-bridge', 'Усунення містків холоду', 180, 'м.п.', 'insulation');

-- Вікна (добавляем еще 18 услуг к существующим 2)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('windows-aluminum', 'Алюмінієві вікна', 4000, 'шт', 'windows'),
  ('windows-fiberglass', 'Склопластикові вікна', 4500, 'шт', 'windows'),
  ('windows-composite', 'Композитні вікна', 5500, 'шт', 'windows'),
  ('windows-triple-glazed', 'Триплекс вікна', 6000, 'шт', 'windows'),
  ('windows-energy-efficient', 'Енергозберігаючі вікна', 5000, 'шт', 'windows'),
  ('windows-tinted', 'Тоновані вікна', 3500, 'шт', 'windows'),
  ('windows-panoramic', 'Панорамні вікна', 8000, 'шт', 'windows'),
  ('windows-bay', 'Еркерні вікна', 12000, 'шт', 'windows'),
  ('windows-sliding', 'Розсувні вікна', 7000, 'шт', 'windows'),
  ('windows-tilt-turn', 'Поворотно-відкидні вікна', 3200, 'шт', 'windows'),
  ('windows-roof', 'Мансардні вікна', 6000, 'шт', 'windows'),
  ('windows-blinds', 'Жалюзі на вікна', 1500, 'шт', 'windows'),
  ('windows-mosquito-net', 'Москітні сітки', 800, 'шт', 'windows'),
  ('windows-shutters', 'Віконниці', 2500, 'шт', 'windows'),
  ('windows-trim', 'Віконні відливи', 300, 'м.п.', 'windows'),
  ('windows-sill', 'Підвіконники', 500, 'м.п.', 'windows'),
  ('windows-repair', 'Ремонт вікон', 1200, 'шт', 'windows'),
  ('windows-installation', 'Демонтаж-монтаж вікон', 800, 'шт', 'windows');

-- Двері (добавляем еще 18 услуг к существующим 2)
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('doors-sliding-interior', 'Розсувні міжкімнатні двері', 4000, 'шт', 'doors'),
  ('doors-folding', 'Двері-гармошка', 3500, 'шт', 'doors'),
  ('doors-glass-interior', 'Скляні міжкімнатні двері', 5000, 'шт', 'doors'),
  ('doors-pocket', 'Двері-купе', 6000, 'шт', 'doors'),
  ('doors-barn', 'Двері-амбар', 7000, 'шт', 'doors'),
  ('doors-fire-rated', 'Протипожежні двері', 12000, 'шт', 'doors'),
  ('doors-soundproof', 'Звукоізоляційні двері', 15000, 'шт', 'doors'),
  ('doors-armored', 'Броньовані двері', 25000, 'шт', 'doors'),
  ('doors-automatic', 'Автоматичні двері', 35000, 'шт', 'doors'),
  ('doors-revolving', 'Карусельні двері', 80000, 'шт', 'doors'),
  ('doors-patio', 'Терасні двері', 8000, 'шт', 'doors'),
  ('doors-french', 'Французькі двері', 6500, 'шт', 'doors'),
  ('doors-double', 'Подвійні двері', 5000, 'шт', 'doors'),
  ('doors-arch', 'Арочні двері', 4500, 'шт', 'doors'),
  ('doors-handles', 'Дверні ручки', 800, 'шт', 'doors'),
  ('doors-locks', 'Дверні замки', 1500, 'шт', 'doors'),
  ('doors-frame', 'Дверна коробка', 1200, 'шт', 'doors'),
  ('doors-installation', 'Встановлення дверей', 1000, 'шт', 'doors');
