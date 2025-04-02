import { useEffect, useState } from 'react';
import { Skip } from './types/skip';
import { SkipCard } from './components/SkipCard';
import { ProgressBar } from './components/ProgressBar';
import './App.css';

const steps = [
  {
    icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></>,
    label: 'Postcode',
    completed: true,
    disabled: false,
  },
  {
    icon: <><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></>,
    label: 'Waste Type',
    completed: true,
    disabled: false,
  },
  {
    icon: <><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></>,
    label: 'Select Skip',
    completed: false,
    disabled: false,
  },
  {
    icon: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></>,
    label: 'Permit Check',
    completed: false,
    disabled: true,
  },
  {
    icon: <><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></>,
    label: 'Choose Date',
    completed: false,
    disabled: true,
  },
  {
    icon: <><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></>,
    label: 'Payment',
    completed: false,
    disabled: true,
  },
];

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error('Failed to fetch skips');
        }
        const data = await response.json();
        setSkips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const handleSkipSelect = (skip: Skip) => {
    console.log('Selected skip:', skip);
    // Handle skip selection here
  };

  const handleStepClick = (index: number) => {
    console.log('Clicked step:', index);
    // Handle step navigation here
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProgressBar steps={steps} onStepClick={handleStepClick} />
        <div className="max-w-7xl mx-auto px-4 pb-32">
          <h2 className="text-2xl font-bold text-center mb-4">Choose Your Skip Size</h2>
          <p className="text-gray-400 text-center mb-8">Select the skip size that best suits your needs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skips.map((skip) => (
              <SkipCard key={skip.id} skip={skip} onSelect={handleSkipSelect} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
