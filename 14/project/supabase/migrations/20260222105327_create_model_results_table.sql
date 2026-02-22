/*
  # Create Model Results Table

  1. New Tables
    - `model_results`
      - `id` (uuid, primary key)
      - `model_name` (text) - Name of the ML model (e.g., Logistic Regression, Random Forest)
      - `accuracy_train` (numeric) - Training accuracy score (0-1)
      - `accuracy_test` (numeric) - Testing accuracy score (0-1)
      - `precision` (numeric) - Precision metric (0-1)
      - `recall` (numeric) - Recall metric (0-1)
      - `f1_score` (numeric) - F1 score metric (0-1)
      - `created_at` (timestamptz) - Timestamp of when the result was added
  
  2. Security
    - Enable RLS on `model_results` table
    - Add policy for anyone to read model results
    - Add policy for anyone to insert model results
    
  3. Notes
    - This table stores machine learning model evaluation metrics
    - Students can add their model results and compare performance
    - All metrics are stored as decimal values between 0 and 1
*/

CREATE TABLE IF NOT EXISTS model_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name text NOT NULL,
  accuracy_train numeric NOT NULL CHECK (accuracy_train >= 0 AND accuracy_train <= 1),
  accuracy_test numeric NOT NULL CHECK (accuracy_test >= 0 AND accuracy_test <= 1),
  precision numeric NOT NULL CHECK (precision >= 0 AND precision <= 1),
  recall numeric NOT NULL CHECK (recall >= 0 AND recall <= 1),
  f1_score numeric NOT NULL CHECK (f1_score >= 0 AND f1_score <= 1),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE model_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view model results"
  ON model_results
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add model results"
  ON model_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete model results"
  ON model_results
  FOR DELETE
  USING (true);
