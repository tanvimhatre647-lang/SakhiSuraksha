// import * as React from "react";
// // import { Slot } from "@radix-ui/react-slot@1.1.2";
// import { Slot } from "@radix-ui/react-slot";

// // import { cva, type VariantProps } from "class-variance-authority@0.7.1";
// import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "./utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
//         outline:
//           "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
//         secondary:
//           // "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//           'bg-gray-200 text-gray-800 hover:bg-gray-300',
//         ghost:
//           "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2 has-[>svg]:px-3",
//         sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
//         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
//         icon: "size-9 rounded-md",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   },
// );

// type ButtonProps = React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean;
//   };

// export function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   ...props
// }: ButtonProps) {
//   const Comp = asChild ? Slot : "button";



// // React.ComponentProps<"button"> &
// //   VariantProps<typeof buttonVariants> & {
// //     asChild?: boolean;
// //   }) {
// //   const Comp = asChild ? Slot : "button";

//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     />
//   );
// }




// // import React from 'react';

// // Define standard sizes and variants for a Button
// type ButtonSize = 'sm' | 'md' | 'lg';
// // type ButtonVariant = 'default' | 'outline' | 'ghost';
// type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary';


// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   size?: ButtonSize;
//   variant?: ButtonVariant;
//   className?: string;
// }

// const sizeClasses: Record<ButtonSize, string> = {
//   sm: 'px-3 py-1 text-sm',
//   md: 'px-4 py-2 text-base',
//   lg: 'px-6 py-3 text-lg',
// };

// const variantClasses: Record<ButtonVariant, string> = {
//   default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
//   outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
//   ghost: 'text-gray-700 hover:bg-gray-100',
//   secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300', // ✅ add this
// };


// // बटनं रचयति (Creates the button)
// export const Button: React.FC<ButtonProps> = ({
//   size = 'md',
//   variant = 'default',
//   className = '',
//   children,
//   ...props
// }) => {
//   const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

//   const finalClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

//   return (
//     <button className={finalClasses} {...props}>
//       {children}
//     </button>
//   );
// };


// <Button size="sm" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">


// export { Button, buttonVariants };


// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils"; // Adjust path to your utils file
import { cn } from "../../lib/utils.js";

// Define variant styles using `cva`
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 text-black hover:bg-gray-100",
        ghost: "text-black hover:bg-gray-100",
        link: "text-blue-600 underline-offset-4 hover:underline",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6 text-base",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Props type for the Button component
export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

// Button component
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// Export variants if needed elsewhere
export { buttonVariants };
