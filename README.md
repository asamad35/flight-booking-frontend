# Flight Booking Frontend

A modern, user-friendly flight booking application built with Next.js and Tailwind CSS. This application allows users to search for flights, view available options, manage bookings, and create a personalized travel experience.

## Features

- **User Authentication**: Secure login and registration using Supabase authentication
- **Flight Search**: Advanced search functionality with filters for destinations, dates, and passengers
- **Interactive UI**: Responsive design optimized for all devices
- **Profile Management**: User profile customization and settings
- **Booking Dashboard**: View and manage all your flight bookings
- **Real-time Updates**: Get notifications about flight status and changes
- **Global State Management**: Centralized state management using React Context API
- **Offline Capability**: Local data persistence using IndexedDB
- **Form Validation**: Robust form validation using React Hook Form and Zod
- **Admin Dashboard**: Data visualization with interactive charts and analytics
- **Reusable Components**: Modular, consistent UI components across the application
- **Beautiful UI**: Elegant, accessible interface built with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API for global application state
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form with Zod validation
- **Data Visualization**: Recharts for analytics and dashboard metrics
- **Date Handling**: date-fns and react-day-picker
- **HTTP Client**: Axios
- **Local Storage**: IndexedDB for client-side data persistence
- **UI Components**: shadcn/ui for consistent, accessible, and beautiful interface elements

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd flight-booking/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
flight-booking/frontend/
├── app/                    # Main application pages
│   ├── (auth)/             # Authentication routes
│   ├── auth/               # Auth-related pages
│   ├── dashboard/          # User dashboard
│   ├── profile/            # User profile pages
│   ├── search-flight/      # Flight search functionality
│   └── api/                # API routes
├── components/             # React components
│   ├── dashboard/          # Dashboard-related components
│   ├── flights/            # Flight-related components
│   ├── layout/             # Layout components (Header, Footer, etc.)
│   ├── profile/            # Profile-related components
│   └── ui/                 # UI components
├── contexts/               # React Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Library code and utilities
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Key Components

- **Home**: Landing page with hero section, flight search, featured destinations, and more
- **FlightSearch**: Main flight search form with various input options
- **FlightResults**: Displays search results with sorting and filtering options
- **Dashboard**: User dashboard showing bookings, upcoming trips, and account activity
- **Profile**: User profile management
- **AdminDashboard**: Administrative interface with data visualization and management tools

## UI Component System

The application's polished and professional UI is built using shadcn/ui, a collection of reusable and customizable components:

- **Design System Consistency**: Uniform visual language across the entire application
- **Accessibility**: ARIA-compliant components that work for all users
- **Dark/Light Mode**: Seamless theme switching with preserved user preferences
- **Customizable**: Tailored components that match the flight booking brand identity
- **Component Composition**: Building complex interfaces from simple, composable parts
- **Responsive Design**: Components that adapt beautifully to any screen size
- **Interactive Elements**: Polished animations and transitions for a premium feel
- **Form Controls**: Styled inputs, selects, and buttons that maintain consistency

The shadcn/ui integration provides a solid foundation of UI primitives while allowing for customization that matches the flight booking brand identity. This approach significantly reduces development time while ensuring a professional, modern aesthetic.

## State Management

The application uses React Context API for global state management, providing a clean and efficient way to share data across components without prop drilling. Key context providers include:

- **FlightContext**: Manages flight search parameters, results, and filtering options
- **AuthContext**: Handles user authentication state and related functions
- **BookingContext**: Tracks user bookings and reservation information
- **UIContext**: Controls UI state such as modals, notifications, and theme preferences

These context providers are configured in the `contexts/` directory and made available throughout the application via provider wrappers in the application layout.

## Form Management and Validation

The application implements a robust form handling system using React Hook Form with Zod validation:

- **Type-Safe Validation**: All form schemas are defined using Zod, providing runtime type checking and validation
- **Reusable Form Components**: Common form elements are abstracted into reusable components for consistency
- **Form State Management**: React Hook Form efficiently manages form state without unnecessary re-renders
- **Validation Feedback**: Immediate user feedback for form errors with clear error messages
- **Multi-Step Forms**: Support for complex, multi-step forms with state persistence between steps
- **Custom Form Controls**: Specialized form inputs for flight search, date selection, and passenger information

This approach ensures a consistent user experience across all forms while minimizing code duplication.

## Data Visualization

The admin dashboard features comprehensive data visualization capabilities using Recharts:

- **Booking Analytics**: Charts displaying booking trends, popular destinations, and revenue metrics
- **User Insights**: Visualization of user demographics, acquisition channels, and engagement data
- **Flight Statistics**: Graphics showing flight occupancy rates, cancellation statistics, and route popularity
- **Performance Metrics**: Real-time and historical performance data with customizable date ranges
- **Interactive Dashboards**: Filterable charts that allow administrators to drill down into specific data segments
- **Responsive Visualizations**: Charts that adapt to different screen sizes for optimal viewing

These visualizations enable administrators to make data-driven decisions and monitor the platform's performance effectively.

## Client-Side Storage with IndexedDB

The application leverages IndexedDB for client-side data persistence, enabling:

- **Offline Functionality**: Critical data is stored locally, allowing the application to function with limited capabilities even when offline
- **Performance Optimization**: Recently searched flights and results are cached to reduce API calls and improve load times
- **Form Persistence**: User input in multi-step forms is saved locally to prevent data loss if the browser is closed
- **User Preferences**: Settings and preferences are stored for a personalized experience across sessions
- **Booking Draft Storage**: Unfinished bookings are saved locally so users can resume the booking process later

IndexedDB implementation is abstracted through custom hooks in the `hooks/` directory, making it easy to use throughout the application while maintaining a consistent API for data access.

## Authentication Flow

The application uses Supabase authentication with a custom middleware that:

- Updates the user session on each request
- Redirects authenticated users away from login pages
- Protects private routes from unauthorized access

## API Integration

The frontend connects to:

1. Supabase for authentication and data storage
2. A backend API (running at the URL specified in NEXT_PUBLIC_API_URL) for flight-specific operations

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## License

[Specify your license here]

## Contact

[Your contact information]
