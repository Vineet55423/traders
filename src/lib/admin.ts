export const ADMIN_EMAILS = [
  "admin@t4traders.com"
];

export const isAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
