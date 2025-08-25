# Toast Notification System

This document explains how to use the toast notification system in the application.

## Basic Usage

The toast notification system provides a simple way to display feedback to the user. There are four types of toast notifications:

1. **Success** - Green color, used to show successful operations
2. **Error** - Red color, used to show errors
3. **Warning** - Yellow color, used to show warnings
4. **Info** - Blue color, used to show informational messages

## Using Toast Notifications

### Direct Usage with useToastNotifications (In React Components)

```tsx
import { useToastNotifications } from "@/hooks/useToast";

function MyComponent() {
  const toast = useToastNotifications();

  // Show a success toast
  const handleSuccess = () => {
    toast.success("Title", "Optional description");
  };

  // Show an error toast
  const handleError = () => {
    toast.error("Error Title", "Optional error description");
  };

  // Show a warning toast
  const handleWarning = () => {
    toast.warning("Warning Title", "Optional warning description");
  };

  // Show an info toast
  const handleInfo = () => {
    toast.info("Info Title", "Optional info description");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={handleInfo}>Show Info</button>
    </div>
  );
}
```

### Using Standardized Toast Messages (In React Components)

For consistency across the application, we provide standardized toast messages that can be used in different parts of the application.

```tsx
import { useToastMessages } from "@/lib/toastMessages";

function MyComponent() {
  const toastMessages = useToastMessages();

  // Authentication related toasts
  const handleLogin = () => {
    toastMessages.auth.loginSuccess("John Doe");
  };

  const handleSignup = () => {
    toastMessages.auth.signupSuccess("Jane Doe");
  };

  // Form related toasts
  const handleFormSubmit = () => {
    toastMessages.form.saveSuccess("profile");
  };

  const handleFormError = () => {
    toastMessages.form.saveError("profile", "Network error");
  };

  // API related toasts
  const handleApiError = () => {
    toastMessages.api.loadingError("user data");
  };

  return (
    <div>
      <button onClick={handleLogin}>Show Login Success</button>
      <button onClick={handleSignup}>Show Signup Success</button>
      <button onClick={handleFormSubmit}>Show Form Submit Success</button>
      <button onClick={handleFormError}>Show Form Error</button>
      <button onClick={handleApiError}>Show API Error</button>
    </div>
  );
}
```

### Using Toast Notifications in Non-Component Code

For utility functions, service files, or other non-component code, you can use the global toast functions:

```tsx
import { toast, toastMessages } from "@/lib/toast";

// In a service file or utility function
async function saveUserProfile(userData) {
  try {
    await api.updateUserProfile(userData);
    toastMessages.form.saveSuccess("profile");
    return true;
  } catch (error) {
    toastMessages.form.saveError("profile", error.message);
    return false;
  }
}

// Or use the basic toast functions directly
function showApiError(error) {
  toast.error("API Error", error.message);
}
```

## Available Toast Message Categories

### Authentication Messages

- `loginSuccess(name)` - Shown when a user successfully logs in
- `loginError(message?)` - Shown when login fails
- `logoutSuccess()` - Shown when a user logs out
- `signupSuccess(name)` - Shown when a user successfully signs up
- `signupError(message?)` - Shown when signup fails
- `passwordResetEmailSent(email)` - Shown when a password reset email is sent
- `passwordResetSuccess()` - Shown when a password is successfully reset

### Form Messages

- `saveSuccess(item)` - Shown when a form is successfully saved
- `saveError(item, message?)` - Shown when a form save fails
- `updateSuccess(item)` - Shown when an item is successfully updated
- `updateError(item, message?)` - Shown when an update fails
- `deleteSuccess(item)` - Shown when an item is successfully deleted
- `deleteError(item, message?)` - Shown when a delete operation fails
- `validationError(message)` - Shown when a form validation error occurs

### API Messages

- `loadingError(resource, message?)` - Shown when loading data fails
- `connectionError()` - Shown when there's a connection error
- `serverError(message?)` - Shown when there's a server error
- `timeout()` - Shown when a request times out

## Best Practices

1. Use toast notifications sparingly to avoid overwhelming the user
2. Use success toasts to confirm that an action was completed successfully
3. Use error toasts to inform the user about errors that need attention
4. Use warning toasts for potentially problematic situations
5. Use info toasts for general information that might be helpful
6. Keep toast messages concise and clear
7. Use the standardized toast messages for consistency across the application
