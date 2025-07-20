import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

np.random.seed(42)
X = np.random.rand(100, 1) * 10000
noise = np.random.randn(100, 1) * 1000
sales = 5000 + 2.5 * X + noise

model = LinearRegression()
model.fit(X, sales.ravel())

joblib.dump(model, 'model.joblib')
print('Model trained and saved as model.joblib') 