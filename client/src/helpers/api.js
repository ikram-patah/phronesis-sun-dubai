import { useUserStore } from "@/store"

async function api({ method, resource, body }) {
  const response = await fetch(`http://localhost:3000/${resource}`, {
    method,
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      ...(useUserStore().token && { 'Authorization': `Bearer ${useUserStore().token}`}),
    }
  })
  const json = await response.json()
  return json
}

export default api
