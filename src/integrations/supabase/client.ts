// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kjanxdseaylvqzegfpol.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqYW54ZHNlYXlsdnF6ZWdmcG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjUxMjYsImV4cCI6MjA2MDg0MTEyNn0.llm6QAV6dXzb0XBR0isnSv_QbGen4TYwP8G6FUoBv2M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);