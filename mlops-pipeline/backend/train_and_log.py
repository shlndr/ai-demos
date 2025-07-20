import mlflow
import mlflow.sklearn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# Sample data
X = [
    'Win a free iPhone now',
    'Congratulations, you have won a lottery',
    'Call this number to claim your prize',
    'Meeting at 10am tomorrow',
    'Lunch with John at noon',
    'Project deadline is next week',
]
y = ['spam', 'spam', 'spam', 'ham', 'ham', 'ham']

# Train model
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(X, y)

# Log to MLflow
with mlflow.start_run():
    mlflow.sklearn.log_model(model, "model")
    mlflow.log_param("model_type", "MultinomialNB")
    mlflow.log_metric("train_accuracy", model.score(X, y))

# Save model
joblib.dump(model, 'model.joblib')
print('Model trained and saved as model.joblib') 