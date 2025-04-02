import { Skip } from '../types/skip';

interface SkipCardProps {
  skip: Skip;
  onSelect: (skip: Skip) => void;
}

export const SkipCard = ({ skip, onSelect }: SkipCardProps) => {
  const isDisabled = !skip.allowed_on_road || !skip.allows_heavy_waste;
  const priceWithVat = skip.price_before_vat * (1 + skip.vat / 100);

  return (
    <div className={`group relative rounded-lg border-2 p-4 md:p-6 transition-all
      ${isDisabled ? 'border-[#2A2A2A] opacity-50 bg-[#1C1C1C] text-white cursor-not-allowed' 
        : 'border-[#2A2A2A] hover:border-[#0037C1]/50 bg-[#1C1C1C] text-white cursor-pointer'}`}>
      <div className="relative">
        <img
          src="assets/books.jpg"
          alt={`${skip.size} Yard Skip`}
          className="w-full h-36 md:h-48 object-cover rounded-md mb-4"
        />
        <div className="absolute top-3 right-2 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
          {skip.size} Yards
        </div>
        {isDisabled && (
          <div className="absolute bottom-3 left-2 z-20 space-y-2">
            {!skip.allowed_on_road && (
              <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-alert-triangle w-4 h-4 text-yellow-500 shrink-0"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span className="text-xs font-medium text-yellow-500">Private Property Only</span>
              </div>
            )}
            {!skip.allows_heavy_waste && (
              <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-alert-triangle w-4 h-4 text-red-500 shrink-0"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span className="text-xs font-medium text-red-500">Not Suitable for Heavy Waste</span>
              </div>
            )}
          </div>
        )}
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{skip.size} Yard Skip</h3>
      <p className="text-sm text-gray-400 mb-4 md:mb-6">{skip.hire_period_days} day hire period</p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xl md:text-2xl font-bold text-[#0037C1]">£{priceWithVat.toFixed(2)}</span>
          <span className="text-sm text-gray-400 ml-2">per week</span>
        </div>
      </div>
      <button
        onClick={() => onSelect(skip)}
        disabled={isDisabled}
        className={`w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2
          bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] hover:border-[#0037C1]
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span>Select This Skip</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right w-4 h-4"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
}; 