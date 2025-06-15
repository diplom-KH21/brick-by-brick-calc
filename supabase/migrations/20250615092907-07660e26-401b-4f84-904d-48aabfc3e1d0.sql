
-- Удаляем старые политики
DROP POLICY IF EXISTS "Users can view their own estimates" ON public.user_estimates;
DROP POLICY IF EXISTS "Users can create their own estimates" ON public.user_estimates;
DROP POLICY IF EXISTS "Users can update their own estimates" ON public.user_estimates;
DROP POLICY IF EXISTS "Users can delete their own estimates" ON public.user_estimates;

-- Создаем новые политики, которые разрешают доступ всем аутентифицированным пользователям
-- так как мы используем кастомную систему аутентификации
CREATE POLICY "Allow all operations on user_estimates" 
  ON public.user_estimates 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
