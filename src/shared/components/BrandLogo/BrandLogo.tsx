import { Link } from "@tanstack/react-router";

export function BrandLogo() {
  return (
    <Link
      to="/dashboard"
      className="text-2xl font-semibold text-secondary outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Intelectus — ir para o painel"
    >
      Intelectus
    </Link>
  );
}
