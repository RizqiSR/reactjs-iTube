/* eslint-disable react/prop-types */
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// cva([class you add to every single button you add], {variants})
const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function Button({ variant, size, className, children }) {
  return (
    <button className={twMerge(buttonStyles({ variant, size }), className)}>
      {children}
    </button>
  );
}