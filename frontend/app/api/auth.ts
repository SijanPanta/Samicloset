import api from '@/lib/api';

export async function login(email: string, password: string) {
  const response = await api.post('/users/login', { email, password });
  return response.data;
}

export async function getMe() {
  const response = await api.get('/users/me');
  return response.data;
}

export async function logout() {
  await api.post('/users/logout');
}
