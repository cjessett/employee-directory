export async function getEmployees() {
  const res = await fetch('/api/employees');
  return res.json();
}

export async function getEmployee(id) {
  const res = await fetch(`/api/employees/${id}`);
  return res.json();
}