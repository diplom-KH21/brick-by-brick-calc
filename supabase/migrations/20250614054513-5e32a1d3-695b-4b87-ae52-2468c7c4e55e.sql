
-- Пересоздаем функцию authenticate_user с правильным search_path
DROP FUNCTION IF EXISTS public.authenticate_user(text, text);
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

-- Пересоздаем функцию create_user с правильным search_path
DROP FUNCTION IF EXISTS public.create_user(text, text);
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
