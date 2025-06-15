
-- Удаляем внешний ключ constraint, который вызывает ошибку
ALTER TABLE public.user_estimates DROP CONSTRAINT IF EXISTS user_estimates_user_id_fkey;

-- Делаем user_id nullable, так как мы используем custom_user_id
ALTER TABLE public.user_estimates ALTER COLUMN user_id DROP NOT NULL;

-- Добавляем значение по умолчанию для user_id
ALTER TABLE public.user_estimates ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';
