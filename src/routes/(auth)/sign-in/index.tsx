import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: SignInRedirect,
});

function SignInRedirect() {
  return null;
}
