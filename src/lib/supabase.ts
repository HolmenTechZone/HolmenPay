import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://vmtrdvwohsjthdijsytb.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjUyYmNmOTRmLWEzZTMtNGYwOS1hMGMxLWIyOTc2ZTU1Yjk0YiJ9.eyJwcm9qZWN0SWQiOiJ2bXRyZHZ3b2hzanRoZGlqc3l0YiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0ODM5Mzc4LCJleHAiOjIwODAxOTkzNzgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.lVz0r1dVrHhoMDdotq_9YN1RGWGEqfbNFEg2769zlPI';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };