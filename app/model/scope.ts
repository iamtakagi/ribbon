export const Scope = {
  Private: "Private",
  Protected: "Protected",
  Public: "Public",
} as const;
export const Scopes = [Scope.Private, Scope.Protected, Scope.Public] as const;
export type Scope = (typeof Scope)[keyof typeof Scope];
