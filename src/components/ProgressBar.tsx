import React from 'react';

interface Step {
  icon: React.ReactNode;
  label: string;
  completed: boolean;
  disabled: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  onStepClick: (index: number) => void;
}

export const ProgressBar = ({ steps, onStepClick }: ProgressBarProps) => {
  return (
    <div className="flex justify-center mb-8 overflow-x-auto">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <button
              onClick={() => onStepClick(index)}
              disabled={step.disabled}
              className={`flex items-center whitespace-nowrap transition-colors ${
                step.disabled
                  ? 'text-white/60 cursor-not-allowed opacity-50'
                  : 'text-[#0037C1] cursor-pointer hover:text-[#0037C1]'
              }`}
            >
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
                className="lucide w-6 h-6"
              >
                {step.icon}
              </svg>
              <span className="ml-2 text-white">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px ${step.completed ? 'bg-[#0037C1]' : 'bg-[#2A2A2A]'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 