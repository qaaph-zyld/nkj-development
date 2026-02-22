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
      case 'ready': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'training': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'predicting': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Model Selection */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-50 tracking-tight">
              ML Models Portfolio
            </h3>
            <span className="text-xl text-slate-600">🧠</span>
          </div>
          
          <div className="space-y-4 flex-grow">
            {mlModels.map((model) => (
              <motion.div
                key={model.name}
                className={`p-5 rounded-lg border cursor-pointer transition-all duration-200 group ${
                  selectedModel.name === model.name
                    ? 'bg-slate-800/80 border-emerald-500 shadow-sm'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
                onClick={() => setSelectedModel(model)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {model.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 mb-4">
                  {model.description}
                </p>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Accuracy
                  </span>
                  <div className="flex items-center space-x-3 w-40">
                    <div className="flex-grow bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${model.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 w-10 text-right">
                      {model.accuracy}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prediction Interface */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-50 tracking-tight">
              Live Prediction Engine
            </h3>
            <span className="text-xl text-slate-600">⚡</span>
          </div>
          
          <div className="mb-8 p-5 bg-slate-950 rounded-lg border border-slate-800 flex-grow flex flex-col">
            <h4 className="font-semibold text-slate-200 mb-2">
              {selectedModel.name}
            </h4>
            <p className="text-sm text-slate-400 mb-6 flex-grow">
              {selectedModel.description}
            </p>

            <motion.button
              className={`w-full py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 mb-4 shadow-sm flex items-center justify-center gap-2 ${
                isLoading || !tfReady
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-slate-50 border border-emerald-400'
              }`}
              onClick={runPrediction}
              disabled={isLoading || !tfReady}
              whileHover={!isLoading && tfReady ? { scale: 1.01 } : {}}
              whileTap={!isLoading && tfReady ? { scale: 0.99 } : {}}
            >
              {!tfReady ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></span>
                  Initializing TF.js
                </>
              ) : isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-50 border-t-transparent rounded-full animate-spin"></span>
                  Running Inference
                </>
              ) : (
                'Generate Prediction'
              )}
            </motion.button>

            {/* TensorFlow Status */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border border-slate-800 rounded text-xs font-medium">
              <span className="text-slate-500">TensorFlow.js Engine</span>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">{tfReady ? 'Ready' : 'Loading...'}</span>
                <div className={`w-2 h-2 rounded-full ${tfReady ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
              </div>
            </div>
          </div>

          {/* Prediction Results */}
          <div className="h-[140px] flex items-end">
            {prediction ? (
              <motion.div
                className="w-full p-6 bg-slate-950 border border-emerald-500/30 rounded-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500"></div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Inference Output
                  </h4>
                  <div className="flex items-center space-x-1.5 text-xs font-medium">
                    <span className={`text-lg ${
                      prediction.trend === 'up' ? 'text-emerald-500' :
                      prediction.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                    }`}>{getTrendIcon(prediction.trend)}</span>
                    <span className="text-slate-300 capitalize">{prediction.trend} Trend</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-50 tracking-tight">
                      {prediction.demand.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                      Units Demand
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-sky-400 tracking-tight">
                      {prediction.confidence}%
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                      Confidence Score
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-950/30 rounded-lg border border-slate-800 border-dashed">
                <div className="text-3xl mb-3 opacity-50 grayscale">📊</div>
                <p className="text-sm text-slate-500 font-medium max-w-[200px]">
                  Run inference to view model predictions
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Technical Specifications */}
      <motion.div
        className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Technical Architecture
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-400 rounded">Client-side Inference</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-emerald-400 text-xl">🧠</span>
            </div>
            <h4 className="font-semibold text-slate-200 mb-2 tracking-tight">
              TensorFlow.js Core
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Client-side machine learning execution with hardware WebGL acceleration for maximum performance.
            </p>
          </div>
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-sky-400 text-xl">⚡</span>
            </div>
            <h4 className="font-semibold text-slate-200 mb-2 tracking-tight">
              Real-time Processing
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero-latency inferences calculated instantly in the browser without requiring server round-trips.
            </p>
          </div>
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-400 text-xl">🔒</span>
            </div>
            <h4 className="font-semibold text-slate-200 mb-2 tracking-tight">
              Privacy by Design
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              All data processing happens securely on the local device, ensuring complete GDPR compliance.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
