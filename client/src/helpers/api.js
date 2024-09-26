import { useUserStore } from '@/store'

const url = import.meta.env.VITE_IS_DEV === 'true'
  ? 'http://localhost:3000'
  : 'https://phronesis-sun-dubai.onrender.com';

async function api({ method, resource, body }) {

  const response = await fetch(`${url}/${resource}`, {
    method,
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      ...(useUserStore().token && { Authorization: `Bearer ${useUserStore().token}` })
    }
  })
  const json = await response.json()
  return json
}

export default api
