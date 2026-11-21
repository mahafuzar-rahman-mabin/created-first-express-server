export type Trole = "admin" | "agent" | "user";

export const RoleAssign = {
  admin: "admin",
  agent: "agent",
  user: "user",
} as const;
