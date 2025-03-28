import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tyjfsfhzxibgrxsmyywi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5amZzZmh6eGliZ3J4c215eXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTE2OTYsImV4cCI6MjA1ODM4NzY5Nn0.-Xp2HtmOJOngFpYoUn7-aOIYVyoNhJnnUAiDYb9TqFU";
export const supabase = createClient(supabaseUrl, supabaseKey);
