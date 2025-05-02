import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = {
  textarea?: boolean;
  maxLength?: number;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, type, textarea = false, maxLength, ...props }, ref) => {
  const commonClassName = cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:ring-ring/50 focus-visible:ring-[2px]",
    "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500 aria-invalid:focus-visible:border-red-500 aria-invalid:ring-red-500",
    className
  );

  if (textarea) {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        maxLength={maxLength}
        className={cn(commonClassName, "h-24 resize-none")}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      type={type}
      data-slot="input"
      className={commonClassName}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
});

Input.displayName = "Input";

export { Input };
