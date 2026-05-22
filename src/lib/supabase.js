import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uuqeyymuoyslzsvqimao.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1cWV5eW11b3lzbHpzdnFpbWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MzA5NjMsImV4cCI6MjA5NTAwNjk2M30.DFXveVDcu6x_3JZMebhsZHoGqAoDcsIvtqniNrf6icw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);