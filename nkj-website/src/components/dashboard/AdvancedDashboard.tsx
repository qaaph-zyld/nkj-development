'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface MetricData {
  timestamp: Date;
  value: number;
  category: string;
}

interface DashboardWidget {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'gauge' | 'heatmap';
  data: MetricData[];
  color: string;
  unit: string;
}

const generateTimeSeriesData = (days: number, baseValue: number, volatility: number): MetricData[] => {
  const data: MetricData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    const trendFactor = 1 + (days - i) * 0.001; // Slight upward trend
    const value = baseValue * randomFactor * trendFactor;
    
    data.push({
      timestamp,
      value: Math.round(value * 100) / 100,
      category: 'automotive'
    });
  }
  
  return data;
};

const dashboardWidgets: DashboardWidget[] = [
  {
    id: 'production-efficiency',
    title: 'Production Efficiency Trend',
    type: 'line',
    data: generateTimeSeriesData(30, 94, 0.05),
    color: '#0ea5e9',
    unit: '%'
  },
  {
    id: 'quality-metrics',
    title: 'Quality Score Distribution',
    type: 'bar',
    data: generateTimeSeriesData(7, 98, 0.02),
    color: '#10b981',
    unit: '%'
  },
  {
    id: 'supply-chain-health',
    title: 'Supply Chain Health',
    type: 'gauge',
    data: [{ timestamp: new Date(), value: 87.5, category: 'health' }],
    color: '#f59e0b',
    unit: '/100'
  },
  {
    id: 'delivery-performance',
    title: 'Delivery Performance Heatmap',
    type: 'heatmap',
    data: generateTimeSeriesData(14, 96, 0.08),
    color: '#8b5cf6',
    unit: '%'
  }
];

const LineChart = ({ data, color, width = 400, height = 200 }: { 
  data: MetricData[], 
  color: string, 
  width?: number, 
  height?: number 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value) as [number, number])
      .nice()
      .range([innerHeight, 0]);

    const line = d3.line<MetricData>()
      .x(d => xScale(d.timestamp))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", `gradient-${color.replace('#', '')}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", height)
      .attr("x2", 0).attr("y2", 0);

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0.1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0.8);

    // Add area
    const area = d3.area<MetricData>()
      .x(d => xScale(d.timestamp))
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", `url(#gradient-${color.replace('#', '')})`)
      .attr("d", area);

    // Add line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dots
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.timestamp))
      .attr("cy", d => yScale(d.value))
      .attr("r", 3)
      .attr("fill", color);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%d") as (d: Date | d3.NumberValue) => string));

    g.append("g")
      .call(d3.axisLeft(yScale));

  }, [data, color, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

const GaugeChart = ({ value, color, width = 200, height = 200 }: {
  value: number,
  color: string,
  width?: number,
  height?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;

    const g = svg.append("g")
      .attr("transform", `translate(${centerX},${centerY})`);

    // Background arc
    const backgroundArc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    interface ArcData {
      startAngle: number;
      endAngle: number;
      innerRadius: number;
      outerRadius: number;
    }

    const backgroundData: ArcData = { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: radius - 20, outerRadius: radius };
    const backgroundPath = backgroundArc(backgroundData);
    g.append("path")
      .attr("d", backgroundPath)
      .attr("fill", "#e5e7eb");

    // Value arc
    const valueArc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(-Math.PI / 2 + (Math.PI * value / 100));

    const valueData: ArcData = { startAngle: -Math.PI / 2, endAngle: -Math.PI / 2 + (Math.PI * value / 100), innerRadius: radius - 20, outerRadius: radius };
    const valuePath = valueArc(valueData);
    g.append("path")
      .attr("d", valuePath)
      .attr("fill", color);

    // Center text
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .attr("fill", color)
      .text(`${value.toFixed(1)}`);

  }, [value, color, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

const HeatmapChart = ({ data, color, width = 400, height = 200 }: {
  data: MetricData[],
  color: string,
  width?: number,
  height?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const cellWidth = innerWidth / data.length;
    const cellHeight = innerHeight / 7; // 7 days of week

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain(d3.extent(data, d => d.value) as [number, number]);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create heatmap cells
    data.forEach((d, i) => {
      const dayOfWeek = d.timestamp.getDay();
      
      g.append("rect")
        .attr("x", i * cellWidth)
        .attr("y", dayOfWeek * cellHeight)
        .attr("width", cellWidth - 1)
        .attr("height", cellHeight - 1)
        .attr("fill", colorScale(d.value))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

      // Add value text
      if (cellWidth > 30) {
        g.append("text")
          .attr("x", i * cellWidth + cellWidth / 2)
          .attr("y", dayOfWeek * cellHeight + cellHeight / 2)
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .attr("font-size", "10px")
          .attr("fill", d.value > 95 ? "#fff" : "#000")
          .text(d.value.toFixed(0));
      }
    });

  }, [data, color, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default function AdvancedDashboard() {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [isRealTime, setIsRealTime] = useState(true);

  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      // Simulate real-time data updates
      dashboardWidgets.forEach(widget => {
        if (widget.type === 'gauge') {
          widget.data[0].value = Math.random() * 100;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-automotive-carbon mb-4">
            Advanced Analytics Dashboard
          </h2>
          <p className="text-lg text-automotive-steel max-w-3xl mx-auto">
            Real-time data visualization powered by D3.js for comprehensive automotive insights
          </p>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isRealTime
                  ? 'bg-automotive-success text-white'
                  : 'bg-automotive-chrome text-automotive-carbon'
              }`}
            >
              {isRealTime ? '🟢 Real-time Active' : '⏸️ Real-time Paused'}
            </button>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {dashboardWidgets.map((widget, index) => (
            <motion.div
              key={widget.id}
              className={`nkj-card p-6 border-2 transition-all duration-300 ${
                selectedWidget === widget.id
                  ? 'border-primary-500 shadow-xl'
                  : 'border-automotive-chrome hover:border-primary-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedWidget(selectedWidget === widget.id ? null : widget.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {widget.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: widget.color }}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {widget.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                {widget.type === 'line' && (
                  <LineChart 
                    data={widget.data} 
                    color={widget.color}
                    width={350}
                    height={200}
                  />
                )}
                
                {widget.type === 'bar' && (
                  <LineChart 
                    data={widget.data} 
                    color={widget.color}
                    width={350}
                    height={200}
                  />
                )}
                
                {widget.type === 'gauge' && (
                  <GaugeChart 
                    value={widget.data[0]?.value || 0}
                    color={widget.color}
                    width={200}
                    height={200}
                  />
                )}
                
                {widget.type === 'heatmap' && (
                  <HeatmapChart 
                    data={widget.data}
                    color={widget.color}
                    width={350}
                    height={150}
                  />
                )}
              </div>

              {/* Widget Stats */}
              <div className="mt-4 pt-4 border-t border-automotive-chrome">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-automotive-steel">
                    Current Value:
                  </span>
                  <span className="font-semibold text-automotive-carbon">
                    {widget.data[widget.data.length - 1]?.value.toFixed(1)}{widget.unit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-automotive-steel">
                    Data Points:
                  </span>
                  <span className="font-semibold text-automotive-carbon">
                    {widget.data.length}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Info */}
        <motion.div
          className="mt-12 nkj-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            D3.js Visualization Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="font-semibold text-white mb-2">
                Interactive Charts
              </h4>
              <p className="text-sm text-gray-300">
                Click and hover interactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔄</span>
              </div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Real-time Updates
              </h4>
              <p className="text-sm text-automotive-steel">
                Live data streaming
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎨</span>
              </div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Custom Styling
              </h4>
              <p className="text-sm text-automotive-steel">
                Automotive brand colors
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📱</span>
              </div>
              <h4 className="font-semibold text-automotive-carbon mb-2">
                Responsive Design
              </h4>
              <p className="text-sm text-automotive-steel">
                Mobile-optimized views
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
