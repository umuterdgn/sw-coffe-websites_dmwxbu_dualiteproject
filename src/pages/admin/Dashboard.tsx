import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { TrendingUp, ShoppingBag, CreditCard, Users, Coffee } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { stats, orders } = useCafe();

  // Backend'den gelen verileri kullan
  const chartData = stats.topViewed?.map((item: any) => ({
    name: item.productName,
    views: item.views
  })) || [];

  const hourlyChartData = stats.hourlyStats?.map((item: any) => ({
    hour: `${item._id}:00`,
    orders: item.count
  })) || [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Genel Bakış</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Toplam Ciro</h3>
            <p className="text-2xl font-bold text-[#021E73] mt-1">{stats.revenue || 0} ₺</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Tamamlanan Sipariş</h3>
            <p className="text-2xl font-bold text-[#021E73] mt-1">{stats.completedOrders || 0}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Ürün Sayısı</h3>
            <p className="text-2xl font-bold text-[#021E73] mt-1">{stats.totalProducts || 0}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <Coffee size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Toplam Sipariş</h3>
            <p className="text-2xl font-bold text-[#021E73] mt-1">{stats.totalOrders || 0}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">En Çok Görüntülenen Ürünler</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="views" fill="#021E73" radius={[0, 4, 4, 0]} name="Görüntülenme" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Saatlik Sipariş Yoğunluğu</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{fontSize: 10}} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#335AA6" radius={[4, 4, 0, 0]} name="Sipariş Sayısı" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Son Siparişler</h3>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                      <tr>
                          <th className="p-3">Masa</th>
                          <th className="p-3">Tutar</th>
                          <th className="p-3">Durum</th>
                          <th className="p-3">Zaman</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {orders.slice(0, 5).map(order => (
                          <tr key={order.id}>
                              <td className="p-3 font-medium text-gray-800">Masa {order.tableNumber}</td>
                              <td className="p-3 font-bold text-[#021E73]">{order.totalAmount} ₺</td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    order.status === 'hazırlanıyor' ? 'bg-yellow-100 text-yellow-700' :
                                    order.status === 'tamamlandı' ? 'bg-green-100 text-green-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {order.status}
                                </span>
                              </td>
                              <td className="p-3 text-gray-500">
                                  {format(new Date(order.timestamp || order.createdAt || Date.now()), 'dd MMM HH:mm', { locale: tr })}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};
