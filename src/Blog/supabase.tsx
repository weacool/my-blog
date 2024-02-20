import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://odkrsrivnkvolymszufu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ka3Jzcml2bmt2b2x5bXN6dWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MDEzODUsImV4cCI6MjAyMzk3NzM4NX0.BqZ2XAPxiSM57fHpxdNhV9NQ-QZLA8TVjBAf6lvxRag"
);

export default supabase;
