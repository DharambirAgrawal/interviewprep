# Toast Notification System Documentation

## Overview

The toast notification system provides a modern, user-friendly way to display feedback messages to users. It features distinct styles for different notification types (success, error, warning, info) and appears in the bottom-right corner of the screen for optimal visibility.

## Features

- **Modern Design**: Clean UI with distinct color schemes and icons
- **Multiple Toast Types**: Success, Error, Warning, and Info variants
- **Optimal Positioning**: Bottom-right corner placement
- **Auto-Dismiss**: Toasts automatically close after 4 seconds
- **Toast Limit**: Maximum of 3 toasts displayed simultaneously to prevent UI clutter
- **Responsive Design**: Works well on all screen sizes
- **Accessible**: Built with accessibility in mind using Radix UI primitives
- **Type-Safe**: Fully typed with TypeScript

## Usage

### Basic Usage

```tsx
import { useToastNotifications } from "@/hooks/useToast";

function MyComponent() {
  const toast = useToastNotifications();

  const handleAction = () => {
    // Do something...
    toast.success("Success", "Your action was completed successfully!");
  };

  return <button onClick={handleAction}>Click Me</button>;
}
```

### Available Toast Types

```tsx
// Success toast
toast.success("Title", "Optional description message");

// Error toast
toast.error("Error", "Something went wrong!");

// Warning toast
toast.warning("Warning", "Please be aware of this notice");

// Info toast
toast.info("Information", "Here's something you should know");
```

### Using Standardized Messages

For consistency across the application, use the standardized toast messages:

```tsx
import { toastMessages } from "@/lib/toastMessages";
import { useToastNotifications } from "@/hooks/useToast";

function MyComponent() {
  const toast = useToastNotifications();

  const handleLogin = async () => {
    try {
      await loginUser(credentials);
      toast.success(...toastMessages.auth.loginSuccess);
    } catch (error) {
      toast.error(...toastMessages.auth.loginError);
    }
  };
}
```

## Component Structure

### 1. Toast Components

- `src/components/ui/toast.tsx`: Base toast UI components using Radix UI primitives
- `src/components/ui/toaster.tsx`: Toast container that manages multiple toasts

### 2. Toast Hook

- `src/hooks/useToast.tsx`: Context provider and hook for managing toast state

### 3. Toast Utilities

- `src/lib/toastMessages.ts`: Standardized toast messages
- `src/lib/toast.ts`: Toast utility functions

## Integration Examples

### Authentication Flow

```tsx
// In auth hooks/components
import { useToastNotifications } from "@/hooks/useToast";
import { toastMessages } from "@/lib/toastMessages";

const { toast } = useToastNotifications();

const handleSignup = async (data) => {
  try {
    await signupUser(data);
    toast.success(...toastMessages.auth.signupSuccess);
  } catch (error) {
    toast.error(...toastMessages.auth.signupError);
  }
};
```

### Form Submission

```tsx
// In form components
import { useToastNotifications } from "@/hooks/useToast";

const { toast } = useToastNotifications();

const onSubmit = async (data) => {
  try {
    await submitData(data);
    toast.success("Form Submitted", "Your data has been successfully saved.");
  } catch (error) {
    toast.error(
      "Submission Failed",
      "There was an error submitting your form."
    );
  }
};
```

## Demo

A demo page is available at `/toast-demo` showcasing all toast variants and features.

## Technical Implementation

The toast system is built on Radix UI's Toast primitive, which provides accessible toast notifications with keyboard navigation support. The system is customized with Tailwind CSS for styling and integrated with React's Context API for state management.

## Customization

To modify toast appearance or behavior:

1. **Styling**: Edit `src/components/ui/toast.tsx` for visual changes
2. **Duration**: Modify `TOAST_DURATION` in `src/hooks/useToast.tsx`
3. **Position**: Update `viewportPositionClassName` in `src/components/ui/toast.tsx`
4. **Toast Limit**: Change `TOAST_LIMIT` in `src/hooks/useToast.tsx`
