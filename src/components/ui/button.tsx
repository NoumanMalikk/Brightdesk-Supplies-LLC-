import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-blueprint-ink text-paper-cream hover:bg-workspace-blue",
  secondary: "bg-workspace-blue text-paper-cream hover:bg-blueprint-ink",
  ghost: "bg-transparent text-blueprint-ink hover:bg-birch-light/40",
  outline: "border border-border-stone bg-gallery-white text-blueprint-ink hover:border-workspace-blue",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  children,
  onClick,
}: {
  href: string;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200",
        variants[variant ?? "primary"],
        sizes[size ?? "md"],
        className,
      )}
    >
      {children}
    </Link>
  );
}
