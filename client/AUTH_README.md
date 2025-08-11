# Authentication System

This project includes a complete authentication system built with Next.js, React Hook Form, Zod validation, and shadcn/ui components.

## Features

### 🔐 Authentication Pages

- **Login Page** (`/auth/login`) - Sign in with email and password
- **Signup Page** (`/auth/signup`) - Create a new account with form validation
- **Forgot Password** (`/auth/forgot-password`) - Password reset functionality

### 🎨 Design Features

- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Dark Mode Support** - Automatic theme switching
- **Gradient Backgrounds** - Beautiful gradient designs matching the overall project theme
- **Form Validation** - Real-time validation with helpful error messages
- **Loading States** - Visual feedback during authentication processes

### 🛡️ Security Features

- **Password Strength Validation** - Enforces strong passwords with multiple criteria
- **Email Validation** - Proper email format validation
- **Rate Limiting** - Built-in utilities for preventing abuse
- **Social Authentication** - UI ready for Google and Facebook integration

## File Structure

```
src/
├── app/
│   └── auth/
│       ├── layout.tsx          # Auth layout with navbar and footer
│       ├── login/
│       │   └── page.tsx        # Login page
│       ├── signup/
│       │   └── page.tsx        # Signup page
│       └── forgot-password/
│           └── page.tsx        # Forgot password page
├── components/
│   └── auth/
│       ├── AuthStatus.tsx      # User dropdown menu component (for future use)
│       └── SimpleAuthButtons.tsx # Login/Signup buttons for navbar
├── hooks/
│   └── useAuth.tsx            # Authentication context and hook
└── lib/
    └── auth/
        ├── authService.ts     # API service functions
        └── utils.ts           # Authentication utilities
```

## Components Overview

### Authentication Pages

#### Login Page (`/auth/login`)

- Email and password fields with validation
- "Remember me" checkbox
- "Forgot password" link
- Social login buttons (UI ready)
- Responsive design with gradient background

#### Signup Page (`/auth/signup`)

- First name and last name fields
- Email and password fields with validation
- Password confirmation
- Terms and conditions checkbox
- Strong password requirements
- Social signup buttons (UI ready)

#### Forgot Password Page (`/auth/forgot-password`)

- Email input with validation
- Success state showing confirmation
- Link back to login page

### UI Components

#### SimpleAuthButtons

Used in the navbar to display login/signup links:

```tsx
// Desktop version
<SimpleAuthButtons />

// Mobile version
<SimpleAuthButtons mobile onLinkClick={() => setMenuOpen(false)} />
```

#### AuthStatus (Ready for implementation)

Complete user dropdown menu for authenticated users:

```tsx
<AuthStatus user={user} onLogout={handleLogout} />
```

## Form Validation

### Login Form Schema

```typescript
{
  email: string (valid email format)
  password: string (minimum 6 characters)
  rememberMe: boolean (optional)
}
```

### Signup Form Schema

```typescript
{
  firstName: string (minimum 2 characters)
  lastName: string (minimum 2 characters)
  email: string (valid email format)
  password: string (minimum 8 characters, must contain uppercase, lowercase, and number)
  confirmPassword: string (must match password)
  agreeToTerms: boolean (must be true)
}
```

## Authentication Hook

The `useAuth` hook provides authentication state management:

```tsx
const { user, isLoading, login, signup, logout, isAuthenticated } = useAuth();
```

## API Integration

The authentication service (`authService.ts`) provides methods for:

- `login(credentials)` - User login
- `signup(data)` - User registration
- `forgotPassword(email)` - Password reset
- `getCurrentUser()` - Get current user info
- `logout()` - User logout

## Styling

### Design System

- **Colors**: Indigo and cyan gradient theme
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadow effects
- **Animations**: Smooth transitions and hover effects

### Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly button sizes
- Optimized layout for all screen sizes

## Usage Examples

### Basic Navigation Integration

The authentication buttons are already integrated into the navbar:

```tsx
// In Navbar.tsx
import { SimpleAuthButtons } from "@/components/auth/SimpleAuthButtons"

// Desktop
<SimpleAuthButtons />

// Mobile
<SimpleAuthButtons mobile onLinkClick={() => setMenuOpen(false)} />
```

### Future Authentication State Management

When implementing backend authentication:

```tsx
// Wrap your app with AuthProvider
<AuthProvider>
  <App />
</AuthProvider>;

// Use in components
const { user, login, logout } = useAuth();

if (user) {
  return <AuthStatus user={user} onLogout={logout} />;
} else {
  return <SimpleAuthButtons />;
}
```

## Customization

### Colors

To change the color scheme, update the gradient classes in the components:

- `from-indigo-600 to-cyan-600` - Primary gradient
- `bg-indigo-600` - Primary background
- `text-indigo-600` - Primary text

### Validation Rules

Modify the Zod schemas in each page component to adjust validation rules.

### Social Providers

The social login buttons are ready for integration. Add your OAuth configuration:

1. Set up OAuth providers (Google, Facebook)
2. Add click handlers to the social buttons
3. Implement OAuth flow in `authService.ts`

## Next Steps

1. **Backend Integration** - Connect to your authentication API
2. **Social Auth** - Implement OAuth providers
3. **Email Verification** - Add email verification flow
4. **Password Reset** - Complete password reset functionality
5. **Protected Routes** - Add route protection middleware
6. **User Dashboard** - Create user profile and settings pages

## Dependencies

The authentication system uses these key dependencies:

- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons
- `tailwindcss` - Styling

All components are built with TypeScript for type safety and better developer experience.
