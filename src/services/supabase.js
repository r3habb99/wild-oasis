import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://yxazwfthabaoscybkhir.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YXp3ZnRoYWJhb3NjeWJraGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4MzY3ODEsImV4cCI6MjAzMTQxMjc4MX0.fkfCP78kB7PFSfkkfTQVkxD8hQ7FOWYazztZb3CWxnY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
