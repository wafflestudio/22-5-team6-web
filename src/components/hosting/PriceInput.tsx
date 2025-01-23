import type { Price } from '@/types/room';

type PriceInputProps = {
  price: Price;
  onPriceChange: (price: Price) => void;
};

const calculateCharge = (perNight: string, cleaningFee: string) => {
  const subtotal = Number(perNight) + Number(cleaningFee);
  return Math.floor(subtotal * 0.1).toString();
};

export default function PriceInput({ price, onPriceChange }: PriceInputProps) {
  const handlePriceChange = (field: keyof Price, value: string) => {
    const newPrice = {
      ...price,
      [field]: value,
    };

    const charge = calculateCharge(
      field === 'perNight' ? value : price.perNight,
      field === 'cleaningFee' ? value : price.cleaningFee,
    );

    const total = (
      Number(field === 'perNight' ? value : price.perNight) +
      Number(field === 'cleaningFee' ? value : price.cleaningFee) +
      Number(charge)
    ).toString();

    onPriceChange({
      ...newPrice,
      charge,
      total,
    });
  };

  return (
    <div>
      {/* 1박 요금 */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 mb-1 block">1박 요금</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            ₩
          </span>
          <input
            type="number"
            value={price.perNight}
            onChange={(e) => {
              handlePriceChange('perNight', e.target.value);
            }}
            placeholder="1박 요금을 입력해주세요"
            min="0"
            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* 청소비 */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 mb-1 block">청소비</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            ₩
          </span>
          <input
            type="number"
            value={price.cleaningFee}
            onChange={(e) => {
              handlePriceChange('cleaningFee', e.target.value);
            }}
            placeholder="청소비를 입력해주세요"
            min="0"
            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* 서비스 수수료 및 총액 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
          <span>서비스 수수료</span>
          <span>₩ {Number(price.charge).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">총액</span>
          <span className="font-medium text-lg">
            ₩ {Number(price.total).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
