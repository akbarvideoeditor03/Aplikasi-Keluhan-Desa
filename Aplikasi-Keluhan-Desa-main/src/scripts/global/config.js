import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vjbefaastsmthknjufpj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqYmVmYWFzdHNtdGhrbmp1ZnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTg5NDgsImV4cCI6MjAzNDA5NDk0OH0.YCSx1pM9cHljr9CCd-smgf4aXvjE5arPqm-_qxFAGt8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;