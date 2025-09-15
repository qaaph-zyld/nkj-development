'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';

interface PredictionResult {
  demand: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

interface MLModel {
  name: string;
  description: string;
  accuracy: number;
  status: 'training' | 'ready' | 'predicting';
}

const mlModels: MLModel[] = [
  {
    name: 'Demand Forecasting',
    description: 'Predicts automotive parts demand using historical data and market trends',
    accuracy: 94.7,
    status: 'ready'
  },
  {
    name: 'Quality Prediction',
    description: 'Identifies potential quality issues before they occur in production',
    accuracy: 98.2,
    status: 'ready'
  },
  {
    name: 'Supply Chain Risk',
    description: 'Assesses supplier reliability and delivery risk factors',
    accuracy: 91.5,
    status: 'training'
  },
  {
    name: 'Inventory Optimization',
    description: 'Optimizes stock levels to minimize costs while ensuring availability',
    accuracy: 96.3,
    status: 'ready'
  }
];

export default function MLShowcase() {
  const [selectedModel, setSelectedModel] = useState(mlModels[0]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tfReady, setTfReady] = useState(false);

  useEffect(() => {
    // Initialize TensorFlow.js
    tf.ready().then(() => {
      setTfReady(true);
    });
  }, []);

  const runPrediction = async () => {
    if (!tfReady) return;
    
    setIsLoading(true);
    
    // Simulate ML prediction with TensorFlow.js
    try {
      // Create a simple model for demonstration
      const model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [4], units: 10, activation: 'relu' }),
          tf.layers.dense({ units: 1, activation: 'sigmoid' })
        ]
      });

      // Generate sample input data (automotive metrics)
      const inputData = tf.randomNormal([1, 4]);
      const prediction = model.predict(inputData) as tf.Tensor;
      const predictionValue = await prediction.data();
      
      // Simulate realistic automotive demand prediction
      const demandValue = Math.floor(predictionValue[0] * 5000 + 2000);
      const confidenceValue = Math.floor(Math.random() * 20 + 80);
      const trends = ['up', 'down', 'stable'] as const;
      const trendValue = trends[Math.floor(Math.random() * trends.length)];

      setTimeout(() => {
        setPrediction({
          demand: demandValue,
          confidence: confidenceValue,
          trend: trendValue
        });
        setIsLoading(false);
      }, 2000);

      // Clean up tensors
      inputData.dispose();
      prediction.dispose();
      model.dispose();
    } catch (error) {
      console.error('Prediction error:', error);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-automotive-success';
      case 'training': return 'bg-automotive-warning';
      case 'predicting': return 'bg-automotive-electric';
      default: return 'bg-automotive-steel';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            AI/ML Integration Framework
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Advanced machine learning models powered by TensorFlow.js for real-time automotive predictions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Selection */}
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-automotive-carbon mb-6">
              ML Models Portfolio
            </h3>
            
            <div className="space-y-4">
              {mlModels.map((model) => (
                <motion.div
                  key={model.name}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedModel.name === model.name
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-automotive-chrome hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedModel(model)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-automotive-carbon">
                      {model.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(model.status)}`}></div>
                      <span className="text-sm text-automotive-steel capitalize">
                        {model.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-automotive-steel mb-3">
                    {model.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-automotive-carbon">
                      Accuracy: {model.accuracy}%
                    </span>
                    <div className="w-24 bg-automotive-chrome rounded-full h-2">
                      <div
                        className="bg-automotive-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${model.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Prediction Interface */}
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-automotive-carbon mb-6">
              Live Prediction Engine
            </h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Selected Model: {selectedModel.name}
              </h4>
              <p className="text-sm text-automotive-steel">
                {selectedModel.description}
              </p>
            </div>

            <motion.button
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                isLoading || !tfReady
                  ? 'bg-automotive-steel text-white cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
              }`}
              onClick={runPrediction}
              disabled={isLoading || !tfReady}
              whileHover={!isLoading && tfReady ? { scale: 1.02 } : {}}
              whileTap={!isLoading && tfReady ? { scale: 0.98 } : {}}
            >
              {!tfReady ? 'Initializing TensorFlow.js...' : 
               isLoading ? 'Running Prediction...' : 
               'Generate Prediction'}
            </motion.button>

            {/* TensorFlow Status */}
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${tfReady ? 'bg-automotive-success' : 'bg-automotive-warning'}`}></div>
                <span className="text-sm text-automotive-steel">
                  TensorFlow.js: {tfReady ? 'Ready' : 'Loading...'}
                </span>
              </div>
            </div>

            {/* Prediction Results */}
            {prediction && (
              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="font-semibold text-automotive-carbon mb-4">
                  Prediction Results
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {prediction.demand.toLocaleString()}
                    </div>
                    <div className="text-sm text-automotive-steel">
                      Units Demand
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-automotive-success">
                      {prediction.confidence}%
                    </div>
                    <div className="text-sm text-automotive-steel">
                      Confidence
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-2xl">{getTrendIcon(prediction.trend)}</span>
                  <span className="text-sm font-medium text-automotive-carbon capitalize">
                    {prediction.trend} Trend Detected
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          className="mt-12 bg-white rounded-lg shadow-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-automotive-carbon mb-6">
            Technical Architecture
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                TensorFlow.js
              </h4>
              <p className="text-sm text-automotive-steel">
                Client-side machine learning with WebGL acceleration
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Real-time Processing
              </h4>
              <p className="text-sm text-automotive-steel">
                Instant predictions without server round-trips
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Privacy First
              </h4>
              <p className="text-sm text-automotive-steel">
                All processing happens locally in the browser
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
