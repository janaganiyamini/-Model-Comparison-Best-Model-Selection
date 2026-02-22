import { ModelResult } from '../types/model';

interface ComparisonChartProps {
  models: ModelResult[];
}

export default function ComparisonChart({ models }: ComparisonChartProps) {
  if (models.length === 0) {
    return null;
  }

  const maxValue = 1.0;
  const metrics = ['accuracy_test', 'precision', 'recall', 'f1_score'] as const;
  const metricLabels = {
    accuracy_test: 'Test Accuracy',
    precision: 'Precision',
    recall: 'Recall',
    f1_score: 'F1 Score',
  };

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Comparison</h2>

      <div className="space-y-8">
        {metrics.map((metric) => (
          <div key={metric}>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {metricLabels[metric]}
            </h3>
            <div className="space-y-2">
              {models.map((model, index) => {
                const value = model[metric] as number;
                const percentage = (value / maxValue) * 100;

                return (
                  <div key={model.id} className="flex items-center">
                    <div className="w-32 text-sm text-gray-700 truncate">
                      {model.model_name}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                        <div
                          className={`h-full ${colors[index % colors.length]} transition-all duration-500 flex items-center justify-end pr-2`}
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-xs font-medium text-white">
                            {(value * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
