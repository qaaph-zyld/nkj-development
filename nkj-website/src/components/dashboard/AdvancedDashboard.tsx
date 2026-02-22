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
    color: '#34d399', // Emerald 400
    unit: '%'
  },
  {
    id: 'quality-metrics',
    title: 'Quality Score Distribution',
    type: 'bar',
    data: generateTimeSeriesData(7, 98, 0.02),
    color: '#10b981', // Emerald 500
    unit: '%'
  },
  {
    id: 'supply-chain-health',
    title: 'Supply Chain Health',
    type: 'gauge',
    data: [{ timestamp: new Date(), value: 87.5, category: 'health' }],
    color: '#38bdf8', // Sky 400
    unit: '/100'
  },
  {
    id: 'delivery-performance',
    title: 'Delivery Performance Heatmap',
    type: 'heatmap',
    data: generateTimeSeriesData(14, 96, 0.08),
    color: '#818cf8', // Indigo 400
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
    <section className="py-20 bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 tracking-tight">
            Advanced Analytics Dashboard
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Real-time data visualization powered by D3.js for comprehensive automotive insights
          </p>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 ${
                isRealTime
                  ? 'bg-emerald-500 text-slate-50 border border-emerald-400'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              {isRealTime ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-50 animate-pulse"></span>
                  Real-time Active
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  Real-time Paused
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardWidgets.map((widget, index) => (
            <motion.div
              key={widget.id}
              className={`bg-slate-900 rounded-xl p-8 transition-all duration-300 shadow-sm cursor-pointer ${
                selectedWidget === widget.id
                  ? 'border-2 border-emerald-500 shadow-md scale-[1.01]'
                  : 'border border-slate-800 hover:border-slate-700 hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedWidget(selectedWidget === widget.id ? null : widget.id)}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-slate-50 tracking-tight">
                  {widget.title}
                </h3>
                <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: widget.color }}
                  ></div>
                  <span className="text-xs font-medium text-slate-400 tracking-wider">
                    {widget.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex justify-center mb-6">
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
              <div className="mt-auto pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-500">
                    Current Value
                  </span>
                  <span className="text-lg font-bold text-slate-50">
                    {widget.data[widget.data.length - 1]?.value.toFixed(1)}{widget.unit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">
                    Data Points
                  </span>
                  <span className="text-sm font-medium text-slate-300">
                    {widget.data.length}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Info */}
        <motion.div
          className="mt-12 bg-slate-900 border border-slate-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-8">
            D3.js Visualization Features
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-400">📊</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-50 mb-1">
                Interactive Charts
              </h4>
              <p className="text-xs text-slate-400">
                Click and hover interactions
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-400">🔄</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-50 mb-1">
                Real-time Updates
              </h4>
              <p className="text-xs text-slate-400">
                Live data streaming
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-400">🎨</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-50 mb-1">
                Custom Styling
              </h4>
              <p className="text-xs text-slate-400">
                Automotive brand colors
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-400">📱</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-50 mb-1">
                Responsive Design
              </h4>
              <p className="text-xs text-slate-400">
                Mobile-optimized views
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
