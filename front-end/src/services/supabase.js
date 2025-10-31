import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://msssajpqjooeggljlurm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zc3NhanBxam9vZWdnbGpsdXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTQ5MzEsImV4cCI6MjA2Nzc5MDkzMX0.iZTQVtYWGIuMtEzODu5Y4EBEYPKjgAky5QUkTL5Lb9g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
