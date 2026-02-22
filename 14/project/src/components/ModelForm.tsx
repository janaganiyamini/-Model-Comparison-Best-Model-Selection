import { useState } from 'react';
import { ModelResult } from '../types/model';

interface ModelFormProps {
  onSubmit: (model: Omit<ModelResult, 'id' | 'created_at'>) => void;
}

export default function ModelForm({ onSubmit }: ModelFormProps) {
  const [formData, setFormData] = useState({
    model_name: '',
    accuracy_train: '',
    accuracy_test: '',
    precision: '',
    recall: '',
    f1_score: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      model_name: formData.model_name,
      accuracy_train: parseFloat(formData.accuracy_train),
      accuracy_test: parseFloat(formData.accuracy_test),
      precision: parseFloat(formData.precision),
      recall: parseFloat(formData.recall),
      f1_score: parseFloat(formData.f1_score),
    });

    setFormData({
      model_name: '',
      accuracy_train: '',
      accuracy_test: '',
      precision: '',
      recall: '',
      f1_score: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Model Results</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model Name
          </label>
          <select
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a model...</option>
            <option value="Logistic Regression">Logistic Regression</option>
            <option value="Decision Tree">Decision Tree</option>
            <option value="Random Forest">Random Forest</option>
            <option value="SVM">Support Vector Machine (SVM)</option>
            <option value="K-Nearest Neighbors">K-Nearest Neighbors</option>
            <option value="Naive Bayes">Naive Bayes</option>
            <option value="Gradient Boosting">Gradient Boosting</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Training Accuracy
            </label>
            <input
              type="number"
              name="accuracy_train"
              value={formData.accuracy_train}
              onChange={handleChange}
              step="0.0001"
              min="0"
              max="1"
              required
              placeholder="0.85"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Testing Accuracy
            </label>
            <input
              type="number"
              name="accuracy_test"
              value={formData.accuracy_test}
              onChange={handleChange}
              step="0.0001"
              min="0"
              max="1"
              required
              placeholder="0.82"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precision
            </label>
            <input
              type="number"
              name="precision"
              value={formData.precision}
              onChange={handleChange}
              step="0.0001"
              min="0"
              max="1"
              required
              placeholder="0.80"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recall
            </label>
            <input
              type="number"
              name="recall"
              value={formData.recall}
              onChange={handleChange}
              step="0.0001"
              min="0"
              max="1"
              required
              placeholder="0.78"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              F1 Score
            </label>
            <input
              type="number"
              name="f1_score"
              value={formData.f1_score}
              onChange={handleChange}
              step="0.0001"
              min="0"
              max="1"
              required
              placeholder="0.79"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add Model
        </button>
      </div>
    </form>
  );
}
