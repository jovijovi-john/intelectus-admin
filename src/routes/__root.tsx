import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

const RootLayout = () => (
  <>
    <div className="">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/dashboard" className="[&.active]:font-bold">
        Dashboard
      </Link>
      <Link to="/sign-in" className="[&.active]:font-bold">
        Sign-in
      </Link>
      <Link to="/sign-up" className="[&.active]:font-bold">
        Sign-up
      </Link>
      <Link to="/questions" className="[&.active]:font-bold">
        Questions
      </Link>
      <Link to="/quizzes" className="[&.active]:font-bold">
        Quizzes
      </Link>
      <Link to="/users" className="[&.active]:font-bold">
        Users
      </Link>
      <Link to="/settings" className="[&.active]:font-bold">
        Settings
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
