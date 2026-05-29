// Configuration NOURYA — remplissez ces valeurs dans le panneau admin ou ici
const NOURYA_CONFIG = {
  supabase: {
    url: 'https://wnwirmlvgjfzymixswsy.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indud2lybWx2Z2pmenltaXhzd3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzcxMzksImV4cCI6MjA4OTQ1MzEzOX0.wxrbK6_ny7j3wI2l-bvIy9ljYqj_xbiyHncB5QJCnSc',
  },
  resend: {
    // Clé API Resend pour les emails — configurez via Supabase Edge Function secrets
    // Ne jamais mettre la clé ici, elle va dans les secrets Supabase
    // Supabase Dashboard → Edge Functions → Secrets → ajouter RESEND_API_KEY
  },
  email: {
    adminEmail: 'admin@nourya.dz', // Email de l'administrateur pour recevoir les nouvelles commandes
    fromEmail: 'commandes@nourya.dz',
    fromName: 'NOURYA'
  }
};
