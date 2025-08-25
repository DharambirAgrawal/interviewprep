# Toast Notification System - Developer Guide

This guide provides practical examples and best practices for using the toast notification system in your components.

## Quick Start Guide

### Step 1: Import the Hook

```tsx
import { useToastNotifications } from "@/hooks/useToast";
```

### Step 2: Use the Hook in Your Component

```tsx
export default function YourComponent() {
  const toast = useToastNotifications();

  // Now you can use toast.success(), toast.error(), etc.
}
```

### Step 3: Trigger Toast Notifications

```tsx
// Success notification
toast.success("Success", "Operation completed successfully");

// Error notification
toast.error("Error", "Something went wrong");

// Warning notification
toast.warning("Warning", "This action may have consequences");

// Info notification
toast.info("Info", "Here's something you should know");
```

## Common Use Cases

### 1. Form Submission Feedback

```tsx
import { useForm } from "react-hook-form";
import { useToastNotifications } from "@/hooks/useToast";

export function ContactForm() {
  const form = useForm();
  const toast = useToastNotifications();

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      form.reset();
      toast.success("Message Sent", "Your message has been sent successfully!");
    } catch (error) {
      toast.error(
        "Submission Failed",
        "There was a problem sending your message. Please try again."
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
  );
}
```

### 2. API Request Feedback

```tsx
import { useState } from "react";
import { useToastNotifications } from "@/hooks/useToast";

export function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToastNotifications();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setData(result);
      toast.success(
        "Data Loaded",
        "The latest data has been successfully retrieved"
      );
    } catch (error) {
      toast.error(
        "Failed to Load",
        "Could not load the requested data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
    </div>
  );
}
```

### 3. Authentication Feedback

```tsx
import { useAuth } from "@/hooks/useAuth";
import { useToastNotifications } from "@/hooks/useToast";
import { toastMessages } from "@/lib/toastMessages";

export function LogoutButton() {
  const { logout } = useAuth();
  const toast = useToastNotifications();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(...toastMessages.auth.logoutSuccess);
    } catch (error) {
      toast.error(...toastMessages.auth.logoutError);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### 4. Feature Toggles and Permissions

```tsx
import { useToastNotifications } from "@/hooks/useToast";

export function PremiumFeatureButton() {
  const toast = useToastNotifications();
  const userHasAccess = checkUserPermissions();

  const handleClick = () => {
    if (userHasAccess) {
      // Access the premium feature
      accessPremiumFeature();
    } else {
      toast.info(
        "Premium Feature",
        "This feature is only available to premium subscribers. Upgrade your plan to access it."
      );
    }
  };

  return <button onClick={handleClick}>Access Premium Feature</button>;
}
```

### 5. Action Confirmations

```tsx
import { useToastNotifications } from "@/hooks/useToast";

export function DeleteItemButton({ itemId, itemName }) {
  const toast = useToastNotifications();

  const handleDelete = async () => {
    try {
      await deleteItem(itemId);
      toast.success(
        "Item Deleted",
        `"${itemName}" has been successfully deleted.`
      );
    } catch (error) {
      toast.error(
        "Deletion Failed",
        `Failed to delete "${itemName}". Please try again.`
      );
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Best Practices

1. **Use Standardized Messages**

   - Import from `@/lib/toastMessages` for consistent messaging across the app

2. **Be Concise**

   - Keep titles short (1-3 words)
   - Keep descriptions clear and under 100 characters

3. **Choose the Right Toast Type**

   - `success`: For successful operations
   - `error`: For errors and failures
   - `warning`: For potential issues or important notices
   - `info`: For neutral information

4. **Avoid Toast Overload**

   - Don't show toasts for every minor action
   - Group related actions into a single toast when possible

5. **Provide Actionable Information**

   - When showing an error, suggest what the user can do next
   - For warnings, explain why the warning is being shown

6. **Handle Async Operations Properly**

   - Always use try/catch blocks with async operations
   - Show loading states when appropriate before the toast appears

7. **Test Toast Notifications**
   - Include toast notifications in your component tests
   - Verify that the correct toast is shown for each scenario
