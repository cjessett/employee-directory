export default async function getEmployees() {
  const res = await fetch('/api/employees');
  return res.json();
}
