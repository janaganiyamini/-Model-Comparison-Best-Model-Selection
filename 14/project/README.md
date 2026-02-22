# Model Comparison Tool

A web application for comparing machine learning model performance and selecting the best model.

## Features

- Add multiple model evaluation results
- Compare models side-by-side in a detailed table
- Visualize performance metrics with interactive charts
- Automatic best model recommendation
- Overfitting detection
- Built-in guide with explanations

## How to Use

1. Train your machine learning models using Python and scikit-learn
2. Calculate evaluation metrics (accuracy, precision, recall, F1 score)
3. Enter the results in the form
4. View comparisons and get recommendations

## Metrics Explained

- **Accuracy**: Overall percentage of correct predictions
- **Precision**: Of all positive predictions, how many were correct
- **Recall**: Of all actual positives, how many were found
- **F1 Score**: Balanced measure combining precision and recall

## Overfitting Detection

The tool automatically detects overfitting by comparing training and test accuracy. If training accuracy is more than 5% higher than test accuracy, the model may be overfitting.

## Example Python Code

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Calculate metrics
train_acc = accuracy_score(y_train, y_train_pred)
test_acc = accuracy_score(y_test, y_test_pred)
precision = precision_score(y_test, y_test_pred)
recall = recall_score(y_test, y_test_pred)
f1 = f1_score(y_test, y_test_pred)

# Enter these values in the web tool
print(f"Training Accuracy: {train_acc:.4f}")
print(f"Testing Accuracy: {test_acc:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1 Score: {f1:.4f}")
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- React + TypeScript
- Tailwind CSS
- Supabase (Database)
- Vite
