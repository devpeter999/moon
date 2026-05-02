import { createClient } from "@supabase/supabase-js";

// TODO: [Wave Issue] Replace with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-supabase-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getEndpointPrice(path: string): Promise<{ price: string; destination: string } | null> {
  // TODO: [Good First Issue] Implement dynamic pricing fetch
  // Example implementation:
  /*
  const { data, error } = await supabase
    .from("endpoints")
    .select("price, destination")
    .eq("path", path)
    .single();
    
  if (error || !data) return null;
  return data;
  */
  
  // Scaffold mock return
  return {
    price: "1.00",
    destination: "GDFW...MOON",
  };
}
