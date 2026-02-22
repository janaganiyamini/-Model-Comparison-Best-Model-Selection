import { Award } from 'lucide-react';
import { ModelResult } from '../types/model';

interface BestModelSelectorProps {
  models: ModelResult[];
}

export default function BestModelSelector({ models }: BestModelSelectorProps) {
  if (models.length === 0) {
    return null;
  }

  const findBestModel = () => {
    let bestModel = models[0];
    let reasoning = '';

    const testAccuracies = models.map(m => m.accuracy_test);
    const maxTestAccuracy = Math.max(...testAccuracies);

    const topModels = models.filter(m => m.accuracy_test === maxTestAccuracy);

    if (topModels.length === 1) {
      bestModel = topModels[0];
      reasoning = `This model has the highest test accuracy (${(maxTestAccuracy * 100).toFixed(2)}%) among all models.`;
    } else {
      const bestF1Model = topModels.reduce((prev, current) =>
        current.f1_score > prev.f1_score ? current : prev
      );
      bestModel = bestF1Model;
      reasoning = `Multiple models have the same test accuracy. This model was selected because it has the best F1 score (${(bestF1Model.f1_score * 100).toFixed(2)}%).`;
    }

    const overfitDiff = bestModel.accuracy_train - bestModel.accuracy_test;
    if (overfitDiff > 0.05) {
      reasoning += ` Note: This model shows signs of overfitting (training accuracy is ${(overfitDiff * 100).toFixed(2)}% higher than test accuracy). Consider regularization techniques.`;
    } else {
      reasoning += ` The model generalizes well with minimal overfitting.`;
    }

    return { bestModel, reasoning };
  };

  const { bestModel, reasoning } = findBestModel();

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border-2 border-green-200">
      <div className="flex items-center mb-4">
        <Award className="text-green-600 mr-3" size={32} />
        <h2 className="text-2xl font-bold text-gray-800">Best Model Recommendation</h2>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            {bestModel.model_name}
          </h3>
          <p className="text-gray-700 leading-relaxed">{reasoning}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Test Accuracy</p>
            <p className="text-lg font-bold text-gray-800">
              {(bestModel.accuracy_test * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Precision</p>
            <p className="text-lg font-bold text-gray-800">
              {(bestModel.precision * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Recall</p>
            <p className="text-lg font-bold text-gray-800">
              {(bestModel.recall * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">F1 Score</p>
            <p className="text-lg font-bold text-gray-800">
              {(bestModel.f1_score * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Overfitting</p>
            <p className="text-lg font-bold text-gray-800">
              {((bestModel.accuracy_train - bestModel.accuracy_test) * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Metrics Explained:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Accuracy:</strong> Overall correctness of predictions</li>
            <li><strong>Precision:</strong> How many selected items are relevant</li>
            <li><strong>Recall:</strong> How many relevant items are selected</li>
            <li><strong>F1 Score:</strong> Balance between precision and recall</li>
            <li><strong>Overfitting:</strong> Difference between training and test performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
