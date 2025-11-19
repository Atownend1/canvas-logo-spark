import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  href?: string;
  to?: string;
  label?: string;
}

/**
 * BackButton component - A reusable navigation button to return to the main landing page
 * 
 * Usage:
 * <BackButton href="https://your-main-site.lovable.app" label="Back to Home" />
 * 
 * Features:
 * - Glassmorphism design matching the AxionX brand
 * - Smooth hover animations
 * - Fixed positioning in top-left corner
 * - Mobile optimized with safe area insets
 * - Uses design system tokens for consistency
 */
export const BackButton = ({ href, to, label = "Back to Main Site" }: BackButtonProps) => {
  const className = "fixed top-4 left-4 z-50 group flex items-center gap-2 px-4 py-2.5 bg-accent/10 backdrop-blur-md border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 ease-out shadow-lg hover:shadow-accent/20 safe-top";
  
  const content = (
    <>
      <ArrowLeft 
        className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors duration-300" 
      />
      <span className="text-sm font-medium text-accent group-hover:text-accent-foreground transition-colors duration-300">
        {label}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={className} aria-label={label}>
      {content}
    </a>
  );
};
