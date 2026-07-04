import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Role = "VISITOR" | "TENANT" | "OWNER" | "MANAGER" | "ADMIN";

/**
 * Get the current authenticated session or redirect to login.
 * Use in Server Components and Route Handlers.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session;
}

/**
 * Require a specific role. Redirects if user doesn't have it.
 */
export async function requireRole(...roles: Role[]) {
  const session = await requireAuth();
  if (!roles.includes(session.user.role as Role)) {
    redirect("/login");
  }
  return session;
}

/**
 * Verify the current user owns the requested resource.
 * Throws 403 if userId doesn't match session.
 */
export async function requireOwnership(resourceUserId: string) {
  const session = await requireAuth();
  if (session.user.id !== resourceUserId && session.user.role !== "ADMIN") {
    redirect("/login");
  }
  return session;
}
