# Supabase Setup Guide

This guide will help you configure Supabase for the CodeNow application with proper authentication and user management.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm/yarn installed
3. The project dependencies installed (`npm install`)

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `codenow-app` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL (e.g., `https://your-project-id.supabase.co`)
   - Anon public key (starts with `eyJ...`)

## Step 3: Update Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Update Supabase Configuration

1. Open `src/lib/supabase.ts`
2. Replace the hardcoded values with environment variables:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

## Step 5: Set Up Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `supabase-setup.sql`
3. Paste and run the SQL script

This will create:
- `profiles` table for user information
- `waitlist` table for email signups
- Row Level Security (RLS) policies
- Triggers for automatic profile creation
- Helper functions for user management

## Step 6: Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure the following:

### Site URL
- Add your development URL: `http://localhost:5173`
- Add your production URL when deployed

### Email Templates
- Customize the email templates for:
  - Confirm signup
  - Magic link
  - Change email address
  - Reset password

### Email Auth
- Enable "Enable email confirmations"
- Set "Secure email change" to enabled
- Configure SMTP settings if needed

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5173/signup`
3. Create a test account
4. Check your email for confirmation
5. Sign in at `http://localhost:5173/login`
6. Verify you can access the dashboard

## Database Schema Overview

### Users Table (auth.users)
- Managed by Supabase Auth
- Contains: id, email, encrypted_password, created_at, updated_at
- Automatically created when users sign up

### Profiles Table (public.profiles)
- Stores additional user information
- Linked to auth.users via foreign key
- Contains: id, full_name, username, avatar_url, created_at, updated_at
- Automatically created when a user signs up (via trigger)

### Waitlist Table (public.waitlist)
- Stores email signups from the landing page
- Contains: id, name, email, created_at, updated_at

## Security Features

### Row Level Security (RLS)
- Users can only view and edit their own profile
- Waitlist entries are publicly insertable but only viewable by authenticated users
- All tables have RLS enabled with appropriate policies

### Authentication Flow
1. User signs up with email/password
2. Supabase creates auth.users entry
3. Trigger automatically creates profiles entry
4. User receives confirmation email
5. User confirms email and can sign in
6. User profile is loaded on authentication

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your environment variables are correct
   - Ensure the anon key is copied correctly

2. **"Email not confirmed" error**
   - Check your email spam folder
   - Verify email confirmation is enabled in Supabase settings

3. **"RLS policy violation" error**
   - Ensure the database schema has been applied correctly
   - Check that RLS policies are properly configured

4. **Profile not created automatically**
   - Verify the trigger function exists in the database
   - Check that the function has proper permissions

### Debugging

1. Check the browser console for errors
2. Use Supabase dashboard to view logs
3. Check the Network tab for failed requests
4. Verify database tables and policies in Supabase dashboard

## Next Steps

1. **Add Social Authentication**: Configure Google, GitHub, etc.
2. **Add User Roles**: Implement admin/user roles
3. **Add Profile Management**: Allow users to edit their profiles
4. **Add Password Reset**: Implement forgot password functionality
5. **Add Email Verification**: Customize email templates
6. **Add Analytics**: Track user behavior and engagement

## Production Deployment

1. Update environment variables for production
2. Configure custom domain in Supabase
3. Set up proper CORS settings
4. Configure email templates for production
5. Set up monitoring and logging
6. Test all authentication flows in production

## Support

If you encounter issues:
1. Check the Supabase documentation
2. Review the error logs in Supabase dashboard
3. Test with a fresh database setup
4. Verify all environment variables are set correctly 