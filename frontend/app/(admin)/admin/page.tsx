"use client";
import { useLayoutEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listProducts } from '@/app/api/product';
import { uploadImage, createProduct, updateProduct, deleteProduct } from '@/app/api/admin';

interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  color?: string;
  featured?: boolean;
  isNewArrival?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type FormData = {
  name: string;
  price: string;
  description: string;
  category: string;
  color: string;
  featured: boolean;
  isNewArrival: boolean;
  image: string;
};

const emptyForm: FormData = {
  name: '',
  price: '',
  description: '',
  category: '',
  color: '',
  featured: false,
  isNewArrival: false,
  image: '',
};

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (!isLoading && user?.role !== 'admin') router.replace('/');
  }, [isLoading, user, router]);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
    enabled: !!user && user.role === 'admin',
  });

  const createMutation = useMutation({
    mutationFn: (data: Parameters<typeof createProduct>[0]) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateProduct>[1] }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeletingId(null);
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setUploading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const openEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description || '',
      category: product.category || '',
      color: product.color || '',
      featured: product.featured || false,
      isNewArrival: product.isNewArrival || false,
      image: product.image || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description || undefined,
      category: form.category || undefined,
      color: form.color || undefined,
      featured: form.featured,
      isNewArrival: form.isNewArrival,
      image: form.image || null,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  if (isLoading) return <div className="p-8 text-on-surface font-body-md">...</div>;
  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-outline/20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 flex items-center justify-between">
          <div>
            <h1 className="font-headline-md text-headline-md">Admin Dashboard</h1>
            <p className="text-on-surface-variant font-body-md text-sm mt-1">Manage your products</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Product
          </button>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        {productsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4">inventory_2</span>
            <p className="font-body-md">No products yet.</p>
            <p className="text-sm mt-1">Click &quot;Add Product&quot; to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full font-body-md text-sm">
              <thead>
                <tr className="border-b border-outline/20 text-left text-on-surface-variant uppercase tracking-wider text-xs">
                  <th className="pb-3 pr-4 font-label-caps">Image</th>
                  <th className="pb-3 pr-4 font-label-caps">Name</th>
                  <th className="pb-3 pr-4 font-label-caps">Price</th>
                  <th className="pb-3 pr-4 font-label-caps hidden md:table-cell">Category</th>
                  <th className="pb-3 pr-4 font-label-caps hidden lg:table-cell">Color</th>
                  <th className="pb-3 pr-4 font-label-caps hidden lg:table-cell">Featured</th>
                  <th className="pb-3 pr-4 font-label-caps hidden lg:table-cell">New</th>
                  <th className="pb-3 font-label-caps">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product.id} className="border-b border-outline/10 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 pr-4">
                      <div className="w-12 h-14 bg-surface-variant rounded overflow-hidden flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) {
                                const icon = document.createElement('span');
                                icon.className = 'material-symbols-outlined text-outline text-xl';
                                icon.textContent = 'image';
                                parent.appendChild(icon);
                              }
                            }}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-outline text-xl">image</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-medium max-w-[200px] truncate">{product.name}</td>
                    <td className="py-3 pr-4">${product.price}</td>
                    <td className="py-3 pr-4 hidden md:table-cell text-on-surface-variant">{product.category || '—'}</td>
                    <td className="py-3 pr-4 hidden lg:table-cell text-on-surface-variant">{product.color || '—'}</td>
                    <td className="py-3 pr-4 hidden lg:table-cell">
                      {product.featured ? <span className="text-green-600 material-symbols-outlined text-lg">check_circle</span> : '—'}
                    </td>
                    <td className="py-3 pr-4 hidden lg:table-cell">
                      {product.isNewArrival ? <span className="text-green-600 material-symbols-outlined text-lg">check_circle</span> : '—'}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-1.5 hover:bg-surface-variant rounded transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg text-on-surface">edit</span>
                        </button>
                        <button
                          onClick={() => setDeletingId(product.id)}
                          className="p-1.5 hover:bg-error/10 rounded transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-lg text-error">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-surface rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-outline/20">
              <h2 className="font-headline-sm text-headline-sm">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={resetForm} className="p-1 hover:bg-surface-variant rounded">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-1.5">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-outline/30 bg-surface-container-lowest px-3 py-2.5 font-body-md text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-1.5">Price *</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  className="w-full border border-outline/30 bg-surface-container-lowest px-3 py-2.5 font-body-md text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-outline/30 bg-surface-container-lowest px-3 py-2.5 font-body-md text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-1.5">Category</label>
                  <input
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full border border-outline/30 bg-surface-container-lowest px-3 py-2.5 font-body-md text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Dresses"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-1.5">Color</label>
                  <input
                    value={form.color}
                    onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                    className="w-full border border-outline/30 bg-surface-container-lowest px-3 py-2.5 font-body-md text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Black"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-1.5">Image</label>
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="flex-1 text-sm file:mr-3 file:py-2 file:px-4 file:border-0 file:font-label-caps file:text-label-caps file:uppercase file:tracking-widest file:bg-primary file:text-on-primary file:cursor-pointer hover:file:opacity-85 transition-opacity text-on-surface-variant"
                  />
                  {uploading && (
                    <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full flex-shrink-0" />
                  )}
                </div>
                {form.image && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={form.image} alt="Preview" className="w-16 h-20 object-cover rounded border border-outline/20" />
                    <span className="text-xs text-on-surface-variant truncate max-w-[200px]">{form.image}</span>
                    <button
                      type="button"
                      onClick={() => setForm(p => ({ ...p, image: '' }))}
                      className="ml-auto text-error text-xs font-label-caps uppercase tracking-widest hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="font-body-md text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isNewArrival}
                    onChange={e => setForm(p => ({ ...p, isNewArrival: e.target.checked }))}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="font-body-md text-sm">New Arrival</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline/20">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest bg-primary text-on-primary hover:opacity-85 transition-opacity disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-surface rounded-lg w-full max-w-sm shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-error text-2xl">warning</span>
              <h3 className="font-headline-sm text-headline-sm">Delete Product</h3>
            </div>
            <p className="font-body-md text-on-surface-variant mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(deletingId)}
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest bg-error text-on-error hover:opacity-85 transition-opacity disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
