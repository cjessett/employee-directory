export async function getEmployees(page = 1) {
  const res = await fetch(`/api/employees?page=${page}`);
  return res.json();
}

export async function getEmployee(id) {
  const res = await fetch(`/api/employees/${id}`);
  return res.json();
}