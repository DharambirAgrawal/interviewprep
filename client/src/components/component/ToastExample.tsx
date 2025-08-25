"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToastNotifications } from "@/hooks/useToast";

export default function ToastExample() {
  const toast = useToastNotifications();

  return (
    <Card className="w-full max-w-md mx-auto my-8 shadow-lg border-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-gray-900 dark:text-white">
          Toast Notification Examples
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-400">
          Click the buttons below to see the new toast designs
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button
          onClick={() =>
            toast.success(
              "Success Notification",
              "Your action was completed successfully with the new modern toast design."
            )
          }
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none font-medium py-5"
        >
          Show Success Toast
        </Button>

        <Button
          onClick={() =>
            toast.error(
              "Error Notification",
              "Something went wrong with your request. Please try again later."
            )
          }
          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-none font-medium py-5"
        >
          Show Error Toast
        </Button>

        <Button
          onClick={() =>
            toast.warning(
              "Warning Notification",
              "Please be aware of this important notice that requires your attention."
            )
          }
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none font-medium py-5"
        >
          Show Warning Toast
        </Button>

        <Button
          onClick={() =>
            toast.info(
              "Info Notification",
              "Here's some useful information you might want to know about."
            )
          }
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-none font-medium py-5"
        >
          Show Info Toast
        </Button>

        <Button
          onClick={() => {
            toast.success(
              "Multiple Toasts",
              "This shows how multiple toasts stack"
            );
            setTimeout(() => {
              toast.info("Another Notification", "Toasts will appear in order");
            }, 1000);
            setTimeout(() => {
              toast.warning("And One More", "Notice how they stack nicely");
            }, 2000);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-none font-medium py-5 mt-2"
        >
          Show Multiple Toasts
        </Button>
      </CardContent>
    </Card>
  );
}
