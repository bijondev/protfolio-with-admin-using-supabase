import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Admin Login",
};

type Props = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  return <LoginForm redirectTo={params.redirect || "/admin"} />;
}
