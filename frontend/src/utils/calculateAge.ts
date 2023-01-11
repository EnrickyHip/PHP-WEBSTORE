export function calculateAge(birthday: Date): number {
  const timeDiff = Math.abs(Date.now() - birthday.getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
}
