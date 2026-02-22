import { BookOpen, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function GuideSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <BookOpen className="text-blue-600 mr-3" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Quick Guide</h2>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use This Tool</h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">1.</span>
                <span>Train multiple models in Python using scikit-learn</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">2.</span>
                <span>Calculate evaluation metrics for each model</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">3.</span>
                <span>Enter the results in the form above</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">4.</span>
                <span>Compare models using the table and charts</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">5.</span>
                <span>Review the best model recommendation</span>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding Metrics</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <strong>Accuracy:</strong> Percentage of correct predictions. Higher is better.
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <strong>Precision:</strong> Of all positive predictions, how many were correct? Important when false positives are costly.
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <strong>Recall:</strong> Of all actual positives, how many did we find? Important when false negatives are costly.
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <strong>F1 Score:</strong> Balanced measure combining precision and recall. Good overall metric.
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Detecting Overfitting</h3>
            <p className="text-gray-700 text-sm">
              Overfitting occurs when a model performs much better on training data than test data.
              If training accuracy is more than 5% higher than test accuracy, the model may be overfitting.
              Solutions include: using more training data, reducing model complexity, or applying regularization.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Example Python Code</h4>
            <pre className="text-xs text-blue-800 overflow-x-auto">
{`from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# After training and making predictions
train_acc = accuracy_score(y_train, y_train_pred)
test_acc = accuracy_score(y_test, y_test_pred)
precision = precision_score(y_test, y_test_pred)
recall = recall_score(y_test, y_test_pred)
f1 = f1_score(y_test, y_test_pred)`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
