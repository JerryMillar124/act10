import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://zfqlwupplahepakjglsp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmcWx3dXBwbGFoZXBha2pnbHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzMjU0NzIsImV4cCI6MjAyODkwMTQ3Mn0.ym4G8npHB33qCUKwhy2KXO_gu-8-LT1UcNLSLlW7kfw'

);

export default supabase;