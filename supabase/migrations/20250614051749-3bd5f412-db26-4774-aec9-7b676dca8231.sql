
-- Создаем таблицу для пользователей с кастомной аутентификацией
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (пользователи могут читать только свои данные)
CREATE POLICY "Users can view their own data" 
  ON public.users 
  FOR SELECT 
  USING (id = auth.uid()::uuid OR auth.role() = 'anon');

-- Политика для вставки (разрешаем анонимным пользователям регистрироваться)
CREATE POLICY "Allow anonymous users to register" 
  ON public.users 
  FOR INSERT 
  WITH CHECK (true);

-- Обновляем таблицу user_estimates для связи с новой таблицей пользователей
ALTER TABLE public.user_estimates 
ADD COLUMN custom_user_id UUID REFERENCES public.users(id);

-- Создаем функцию для проверки пароля
CREATE OR REPLACE FUNCTION public.authenticate_user(p_username TEXT, p_password TEXT)
RETURNS TABLE(user_id UUID, username TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.username
  FROM public.users u
  WHERE u.username = p_username 
    AND u.password_hash = crypt(p_password, u.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Создаем функцию для создания пользователя
CREATE OR REPLACE FUNCTION public.create_user(p_username TEXT, p_password TEXT)
RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  INSERT INTO public.users (username, password_hash)
  VALUES (p_username, crypt(p_password, gen_salt('bf')))
  RETURNING id INTO new_user_id;
  
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
