// src/components/ui/alert.jsx
import * as React from "react";

const alertVariants = {
  default: "bg-surface-light border-accent-500",
  error: "bg-surface-light border-red-500",
  warning: "bg-surface-light border-yellow-500",
  success: "bg-surface-light border-green-500",
};

const Alert = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 mb-4 transition-all
        ${alertVariants[variant]}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
Alert.displayName = "Alert";

const titleVariants = {
  default: "text-accent-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  success: "text-green-500",
};

const AlertTitle = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      className={`mb-2 text-lg font-medium leading-none tracking-tight
        ${titleVariants[variant]}
        ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`text-base leading-relaxed text-primary-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };