import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
          <Shield className="h-6 w-6 text-primary" />
          ShieldHer
        </a>
        <a
          href="#analyzer"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Scan Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
