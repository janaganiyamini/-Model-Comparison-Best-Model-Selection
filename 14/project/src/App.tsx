import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { ModelResult } from './types/model';
import ModelForm from './components/ModelForm';
import ComparisonTable from './components/ComparisonTable';
import ComparisonChart from './components/ComparisonChart';
import BestModelSelector from './components/BestModelSelector';
import GuideSection from './components/GuideSection';
import { BarChart3, RefreshCw } from 'lucide-react';

function App() {
  const [models, setModels] = useState<ModelResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('model_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setModels(data || []);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddModel = async (modelData: Omit<ModelResult, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('model_results')
        .insert([modelData]);

      if (error) throw error;
      await fetchModels();
    } catch (error) {
      console.error('Error adding model:', error);
      alert('Failed to add model. Please try again.');
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this model?')) return;

    try {
      const { error } = await supabase
        .from('model_results')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchModels();
    } catch (error) {
      console.error('Error deleting model:', error);
      alert('Failed to delete model. Please try again.');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear all models? This cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('model_results')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;
      await fetchModels();
    } catch (error) {
      console.error('Error clearing models:', error);
      alert('Failed to clear models. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="text-blue-600 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">Model Comparison Tool</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Compare machine learning models and find the best performer
          </p>
        </header>

        <div className="space-y-6">
          <GuideSection />

          <div className="grid md:grid-cols-2 gap-6">
            <ModelForm onSubmit={handleAddModel} />

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Models</h2>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    {models.length} {models.length === 1 ? 'model' : 'models'} added
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchModels}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <RefreshCw size={16} />
                      Refresh
                    </button>
                    {models.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {models.length >= 2 && (
                <BestModelSelector models={models} />
              )}
            </div>
          </div>

          {models.length > 0 && (
            <>
              <ComparisonTable models={models} onDelete={handleDeleteModel} />
              <ComparisonChart models={models} />
            </>
          )}

          {models.length === 1 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-yellow-800">
                Add at least one more model to see comparisons and recommendations
              </p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Enter your model evaluation metrics to compare performance</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
