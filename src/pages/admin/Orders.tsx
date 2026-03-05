import React from "react";
import { useCafe } from "../../context/CafeContext";
import { Clock, CheckCircle2, XCircle, ChefHat } from "lucide-react";
import { format, isValid } from "date-fns";

export const Orders: React.FC = () => {
  const { orders, updateOrderStatus } = useCafe();

  // Güvenli tarih formatlama
  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    return isValid(date) ? format(date, "dd.MM.yyyy HH:mm") : "-";
  };

  // Sort: Hazırlanıyor üstte, sonra tarihe göre (yeniden eskiye)
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === "hazırlanıyor" && b.status !== "hazırlanıyor") return -1;
    if (a.status !== "hazırlanıyor" && b.status === "hazırlanıyor") return 1;

    return (
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Sipariş Takibi</h1>
        <div className="text-sm text-gray-500">
          Toplam {orders.length} sipariş
        </div>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <ChefHat size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Henüz hiç sipariş yok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden flex flex-col ${
                order.status === "hazırlanıyor"
                  ? "border-[#335AA6] shadow-md"
                  : "border-gray-100 opacity-80"
              }`}>
              {/* Header */}
              <div
                className={`p-4 flex justify-between items-center ${
                  order.status === "hazırlanıyor"
                    ? "bg-[#335AA6]/10"
                    : "bg-gray-50"
                }`}>
                <div>
                  <h3 className="font-bold text-lg text-[#021E73]">
                    {order.tableId}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === "hazırlanıyor"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "tamamlandı"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                  }`}>
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="p-4 flex-1">
                <ul className="space-y-3">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-start text-sm">
                      <div>
                        <span className="font-bold text-gray-800">
                          {item.quantity}x
                        </span>{" "}
                        {item.product?.name || "Ürün bilgisi yok"}
                        {item.selectedExtras?.length > 0 && (
                          <p className="text-xs text-gray-500 pl-4">
                            +{" "}
                            {item.selectedExtras?.map((e) => e.name).join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="font-medium text-gray-600">
                        {item.totalPrice} ₺
                      </span>
                    </li>
                  ))}
                </ul>

                {order.note && (
                  <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-100">
                    <strong>Not:</strong> {order.note}
                  </div>
                )}
              </div>

              {/* Footer / Actions */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-sm">Toplam Tutar</span>
                  <span className="text-xl font-bold text-[#021E73]">
                    {order.totalAmount} ₺
                  </span>
                </div>

                {order.status === "hazırlanıyor" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateOrderStatus(order.id, "tamamlandı")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                      <CheckCircle2 size={16} />
                      Tamamla
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "iptal")}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                      <XCircle size={16} />
                      İptal
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
