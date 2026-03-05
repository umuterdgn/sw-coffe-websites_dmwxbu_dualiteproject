import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { Product, CATEGORIES, Category, ExtraOption } from '../../types';
import { Edit2, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

export const Products: React.FC = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useCafe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Soğuk Kahveler',
    description: '',
    images: [''],
    allergens: [],
    extras: [],
    story: '',
  });

  // Helper for Extras Input
  const [extrasInput, setExtrasInput] = useState('');

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setExtrasInput(product.extras.map(e => `${e.name}:${e.price}`).join(', '));
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      category: 'Soğuk Kahveler',
      description: '',
      images: [''],
      allergens: [],
      extras: [],
      story: '',
    });
    setExtrasInput('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse extras
    const parsedExtras: ExtraOption[] = extrasInput.split(',').map(item => {
        const [name, price] = item.split(':');
        return {
            name: name?.trim() || '',
            price: Number(price) || 0
        };
    }).filter(e => e.name !== '');

    // Clean up images array (remove empty strings)
    const cleanedImages = formData.images?.map(i => i.trim()).filter(i => i !== '') || [];

    const finalData = { ...formData, extras: parsedExtras, images: cleanedImages };

    if (editingProduct) {
      updateProduct({ ...finalData, id: editingProduct.id } as Product);
    } else {
      addProduct(finalData as Omit<Product, 'id'>);
    }
    setIsModalOpen(false);
  };

  const handleArrayInput = (field: 'allergens' | 'images', value: string) => {
    setFormData(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim()) // Keep empty strings while typing to allow space
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ürün Yönetimi</h1>
        <button
          onClick={handleAddNew}
          className="bg-[#021E73] hover:bg-[#335AA6] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus size={20} />
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="p-4">Görsel</th>
                <th className="p-4">Ürün Adı</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4">Ekstralar</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-blue-50 text-[#021E73] rounded text-xs border border-blue-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-800">{product.price} ₺</td>
                  <td className="p-4 text-sm text-gray-500">
                      {product.extras.length} seçenek
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-[#021E73] flex items-center gap-2">
                        {editingProduct ? <Edit2 size={24}/> : <Plus size={24}/>}
                        {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="text-gray-400 hover:text-red-500"/>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
                    <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                    >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                    <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                    />
                </div>

                {/* Image Input & Preview Section */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <ImageIcon size={16} />
                        Görsel URL (Virgülle ayırın)
                    </label>
                    <input
                        type="text"
                        value={formData.images?.join(', ')}
                        onChange={(e) => handleArrayInput('images', e.target.value)}
                        placeholder="https://ornek.com/resim1.jpg, https://..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all mb-3"
                    />
                    
                    {/* Live Preview */}
                    {formData.images && formData.images.some(img => img.trim() !== '') && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {formData.images.map((img, idx) => (
                                img.trim() !== '' && (
                                    <div key={idx} className="relative group flex-shrink-0">
                                        <div className="w-24 h-24 rounded-lg border-2 border-white shadow-md overflow-hidden bg-gray-200">
                                            <img 
                                                src={img.trim()} 
                                                alt={`Önizleme ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100?text=Hata';
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-[#021E73] text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                                            {idx + 1}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alerjenler (Virgülle ayırın)</label>
                        <input
                        type="text"
                        value={formData.allergens?.join(', ')}
                        onChange={(e) => handleArrayInput('allergens', e.target.value)}
                        placeholder="Süt, Gluten..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ekstralar (Format: İsim:Fiyat)</label>
                        <input
                        type="text"
                        value={extrasInput}
                        onChange={(e) => setExtrasInput(e.target.value)}
                        placeholder="Şurup:20, Krema:15"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                        />
                        <p className="text-xs text-gray-400 mt-1">Örn: Vanilya:20, Çikolata Sos:15</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hikaye</label>
                    <textarea
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021E73] focus:border-[#021E73] outline-none transition-all"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                    <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                    İptal
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 bg-[#021E73] text-white rounded-lg hover:bg-[#335AA6] transition-colors font-medium shadow-md"
                    >
                    {editingProduct ? 'Güncelle' : 'Kaydet'}
                    </button>
                </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
