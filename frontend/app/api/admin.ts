import api from "../../lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return API_URL + response.data.url;
};

export const createProduct = async (data: {
  name: string;
  price: number;
  description?: string;
  category?: string;
  image?: string | null;
  color?: string;
  featured?: boolean;
  isNewArrival?: boolean;
}) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string | null;
  color?: string;
  featured?: boolean;
  isNewArrival?: boolean;
}) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
