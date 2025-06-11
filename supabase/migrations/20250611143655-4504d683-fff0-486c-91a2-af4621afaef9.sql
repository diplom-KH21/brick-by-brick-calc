
-- Удаляем старые таблицы если они были созданы
DROP TABLE IF EXISTS public.estimate_items;
DROP TABLE IF EXISTS public.estimates;

-- Создаем таблицу для анонимных кошторисов
CREATE TABLE public.estimates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Создаем таблицу для позиций анонимных кошторисов
CREATE TABLE public.estimate_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES public.estimates(id) ON DELETE CASCADE NOT NULL,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Отключаем RLS для анонимного доступа (только для вставки данных)
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimate_items ENABLE ROW LEVEL SECURITY;

-- Политики для анонимной вставки данных
CREATE POLICY "Anyone can insert estimates" 
  ON public.estimates 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Anyone can insert estimate items" 
  ON public.estimate_items 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);
