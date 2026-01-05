# Learn by Sensory - Sensory Play Class Booking Platform

## Project Overview

Create a modern, professional web application for "Learn by Sensory" - a sensory play class booking platform designed for parents to discover and book therapeutic play sessions for children aged 2-8. The platform focuses on sensory exploration, social skills development, and specialized learning activities tailored to children with diverse needs.

## Core Features

### 1. Class Discovery & Booking
- **Class Listings**: Display available sensory play classes with rich details including title, description, date, time, duration, capacity, enrollment status, pricing, age groups, and skill focus areas
- **Class Filtering**: Filter classes by location, age group (2-3, 3-5, 4-6, 6-8), and date range
- **Class Details**: Individual class detail pages with comprehensive information, instructor details, location information, and booking form
- **Booking System**: Multi-step booking form collecting parent/guardian information (name, email, phone) and child information (name, age, special needs/accommodations)
- **Booking Confirmation**: Confirmation page displaying booking details and next steps

### 2. Location Management
- **Location Listings**: Display all available sensory play centers with images, addresses, and facility information
- **Location Details**: Individual location pages showing all classes available at that location, facility amenities, accessibility information, and contact details
- **Geographic Coverage**: Support for multiple locations across Portland, OR (Downtown, Eastside, West Hills)

### 3. Information & Marketing
- **Homepage**: Hero section with compelling CTA, featured classes, testimonials, feature highlights, and newsletter signup
- **About Page**: Information about the Learn by Sensory approach, mission, values, and team
- **Contact Page**: Contact form with subject categories (Class Information, Booking Question, Special Accommodations, Technical Issue, Other)
- **Newsletter**: Email subscription form for updates and special offers

### 4. Content & Resources
- **Testimonials**: Parent and caregiver reviews highlighting positive experiences
- **Feature Sections**: Highlight key benefits (expert-led sessions, small group sizes, inclusive environment, flexible scheduling)
- **Legal Pages**: Privacy Policy and Terms of Service

## Technical Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom color scheme (purple/green branding)
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Lucide React
- **Forms**: React Hook Form for form validation and management
- **Date Handling**: date-fns for date formatting and manipulation

### Backend (Optional - Currently in Demo Mode)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/password)
- **Edge Functions**: Supabase Edge Functions for email notifications
- **Row Level Security**: Properly configured RLS policies for data security

### Deployment
- **Platform**: Netlify
- **Type**: Static site with SPA configuration
- **Environment**: Production-ready build with optimized assets

## Design Requirements

### Brand Identity
- **Logo**: Purple & Green Playful Children's Logo
- **Brand Name**: "Learn by Sensory" (formatted as "Learn by Sensory" with green for "Learn/Sensory" and purple for "by")
- **Color Scheme**:
  - Primary: Purple/violet tones (brand color)
  - Secondary: Green tones (accent color)
  - Background: Warm, welcoming neutrals (gray-50)
  - Success: Green tones
  - Error: Red tones

### Design Principles
- **Child-Friendly**: Warm, approachable design that appeals to parents while being playful
- **Accessible**: High contrast, readable fonts, clear navigation, WCAG compliance
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop
- **Professional**: Clean, organized layouts that build trust with parents
- **Visual Hierarchy**: Clear information architecture with prominent CTAs
- **Imagery**: Stock photos from Pexels showing children engaged in sensory activities

### UI Components
- **Header**: Fixed navigation with logo, main menu, and CTA button
- **Footer**: Multi-column layout with links, contact info, and social media
- **Cards**: Rounded corners, shadows, hover effects for classes and locations
- **Forms**: Multi-step forms with progress indicators, validation, and clear error messages
- **Buttons**: Primary (purple), secondary (outlined), and text variations
- **Animations**: Smooth page transitions, hover effects, loading states

## Data Structure

### Classes
- ID, title, description, date, time, duration (minutes)
- Capacity, enrolled count, price
- Location ID (foreign key)
- Age group (2-3, 3-5, 4-6, 6-8)
- Skills array (e.g., Sensory Processing, Fine Motor, Social Interaction)
- Image URL

### Locations
- ID, name, full address (street, city, state, zip)
- Image URL
- Facility details, amenities, accessibility information

### Bookings
- ID, class ID (foreign key), user ID (foreign key)
- Parent name, child name, child age
- Special needs/accommodations (optional)
- Payment status (pending, completed, cancelled)
- Timestamps (created_at, updated_at)

### Contact Messages
- ID, name, email, subject, message
- Status (new, read, responded)
- Timestamp (created_at)

## User Flows

### Primary Flow: Browsing to Booking
1. User lands on homepage and views featured classes
2. User navigates to "Classes" page and applies filters (location, age group, date)
3. User clicks on a class to view detailed information
4. User clicks "Book This Class" button
5. User fills out Step 1: Parent/Guardian contact information
6. User proceeds to Step 2: Child information and special needs
7. User submits booking and is redirected to confirmation page
8. User receives confirmation message with booking details

### Secondary Flow: Location Discovery
1. User navigates to "Locations" page
2. User browses available locations with images and addresses
3. User clicks on a location to view details
4. User views all classes available at that location
5. User can book directly from location page

### Support Flow: Contact
1. User navigates to "Contact" page
2. User fills out contact form with name, email, subject, and message
3. User submits form and receives confirmation
4. Message is stored for admin review

## Special Considerations

### Accessibility
- All images have descriptive alt text
- Keyboard navigation support throughout
- Focus states clearly visible
- Screen reader-friendly markup
- Sufficient color contrast ratios

### Performance
- Optimized images (appropriate sizes and formats)
- Code splitting for faster initial load
- Lazy loading for below-the-fold content
- Minimal bundle size (currently ~407KB gzipped to ~119KB)

### SEO
- Semantic HTML structure
- Meta tags for all pages
- Sitemap.xml included
- Robots.txt configured
- Descriptive page titles and headings

### Mobile Experience
- Touch-friendly button sizes (minimum 44x44px)
- Responsive navigation with hamburger menu
- Optimized form layouts for small screens
- Swipe-friendly card carousels

## Current Implementation Status

### Completed Features
✅ Full responsive layout with mobile navigation
✅ Homepage with hero, featured classes, testimonials, features
✅ Class browsing with filtering capabilities
✅ Class detail pages with booking forms
✅ Location browsing and detail pages
✅ About page with mission and values
✅ Contact page with form submission
✅ Privacy Policy and Terms of Service pages
✅ Newsletter signup functionality
✅ Demo mode with mock data (no database required)
✅ Build optimization and deployment configuration

### Optional Enhancements (Not Implemented)
- User authentication and profiles
- User booking management dashboard
- Admin dashboard for class and booking management
- Payment processing integration (Stripe)
- Email notifications for bookings and confirmations
- Calendar integration
- Waitlist management for full classes
- Multi-language support
- Advanced search with autocomplete
- Class recommendations based on child's age/needs

## Development Guidelines

### Code Organization
- Component-based architecture with reusable UI components
- Centralized context for global state management (AppContext)
- Type-safe development with TypeScript
- Mock data in `/src/data/mockData.ts` for development/demo
- Clean separation of concerns (components, pages, context, types, utilities)

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level page components
├── context/        # React Context providers
├── data/           # Mock data and constants
├── lib/            # Third-party library configurations
├── types/          # TypeScript type definitions
└── index.css       # Global styles and Tailwind imports
```

### Styling Conventions
- Tailwind CSS utility classes for all styling
- Custom CSS classes defined in `index.css` for common patterns
- Consistent spacing system using Tailwind's default scale
- Component-specific animations using Framer Motion

### Best Practices
- Use semantic HTML elements
- Keep components focused and single-purpose
- Implement proper error handling and loading states
- Add descriptive comments for complex logic
- Test responsiveness across all breakpoints
- Optimize images before adding to the project

## Deployment Instructions

### Build Process
```bash
npm install          # Install dependencies
npm run build        # Create production build
npm run preview      # Preview production build locally
```

### Netlify Configuration
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects configured for SPA routing in `public/_redirects`
- Environment variables (if using database): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### Demo Mode
The application runs in demo mode without database by default. All data is loaded from local mock files. To enable full functionality with Supabase:
1. Create a Supabase project
2. Run migrations from `/supabase/migrations/`
3. Add environment variables to `.env` and Netlify
4. The app will automatically detect valid credentials and switch modes

## Success Metrics

### User Engagement
- Number of class bookings completed
- Newsletter signup conversion rate
- Contact form submissions
- Average time on class detail pages
- Return visitor rate

### Technical Performance
- Page load time < 3 seconds
- Lighthouse score > 90 across all categories
- Zero console errors in production
- Mobile usability score > 95

### Business Goals
- Increase class enrollment by providing easy online booking
- Reduce admin workload through automated booking system
- Improve parent satisfaction with transparent information
- Build community through newsletter and testimonials

## Future Roadmap

### Phase 2: Enhanced Booking
- Real-time availability updates
- Recurring class packages and memberships
- Gift card purchases
- Referral program

### Phase 3: Community Features
- Parent forums and discussion boards
- Photo galleries from past classes
- Blog with parenting resources
- Event calendar beyond regular classes

### Phase 4: Advanced Features
- Mobile app (React Native)
- Video previews of class activities
- Virtual class options
- Progress tracking for enrolled children
- Personalized class recommendations using ML

---

**Project Goal**: Create a welcoming, professional platform that makes it easy for parents to discover and book sensory play classes while providing children with enriching, inclusive learning experiences.
