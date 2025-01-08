DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.sync_auth_user_to_users()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (email)
    VALUES (NEW.email)
    ON CONFLICT (email) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_auth_user_to_users();  
