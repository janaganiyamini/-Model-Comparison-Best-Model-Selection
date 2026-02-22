export interface ModelResult {
  id?: string;
  model_name: string;
  accuracy_train: number;
  accuracy_test: number;
  precision: number;
  recall: number;
  f1_score: number;
  created_at?: string;
}

export interface ComparisonData {
  models: ModelResult[];
  best_model: string;
  reasoning: string;
}
