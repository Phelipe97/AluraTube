import { createClient } from "@supabase/supabase-js"


const PROJECT_URL = "https://qwkqffrkbyhvqmzedxna.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3a3FmZnJrYnlodnFtemVkeG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTU3MTcsImV4cCI6MTk4Mzc3MTcxN30.OfYF1mshmizAEWNaa0ma9PgYXCZ8qPUpYSo5mn5G3bA";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
               
        }
    }
}