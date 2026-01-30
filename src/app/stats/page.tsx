"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Monitor, Smartphone, Tablet } from "lucide-react";

type TrafficSource = {
  name: string;
  visits: number;
  color: string;
};

type DateRange = "today" | "yesterday" | "last7days" | "last30days" | "thisMonth" | "lastMonth";

const dateRangeLabels: Record<DateRange, string> = {
  today: "Aujourd'hui",
  yesterday: "Hier",
  last7days: "7 derniers jours",
  last30days: "30 derniers jours",
  thisMonth: "Ce mois-ci",
  lastMonth: "Mois dernier",
};

export default function StatsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("today");
  const [showDateMenu, setShowDateMenu] = useState(false);
  
  const topProducts: Array<{ name: string; views: number; orders: number; sales: string }> = [];
  
  const salesData = useMemo(() => [
    { time: "00h", orders: 0, sales: 0 },
    { time: "02h", orders: 0, sales: 0 },
    { time: "04h", orders: 0, sales: 0 },
    { time: "06h", orders: 0, sales: 0 },
    { time: "08h", orders: 0, sales: 0 },
    { time: "10h", orders: 0, sales: 0 },
    { time: "12h", orders: 0, sales: 0 },
    { time: "14h", orders: 0, sales: 0 },
    { time: "16h", orders: 0, sales: 0 },
    { time: "18h", orders: 0, sales: 0 },
    { time: "20h", orders: 0, sales: 0 },
    { time: "22h", orders: 0, sales: 0 },
  ], []);
  
  const trafficSources = useMemo(() => [
    { name: "Facebook", visits: 0, color: "#3b82f6" },
    { name: "Instagram", visits: 0, color: "#8b5cf6" },
    { name: "direct", visits: 0, color: "#10b981" },
  ], []);

  const totalTraffic = useMemo(() => {
    return trafficSources.reduce((sum, source) => sum + source.visits, 0);
  }, [trafficSources]);

  const pieChartPaths = useMemo(() => {
    if (totalTraffic === 0) return [];
    
    let currentAngle = 0;
    return trafficSources.map((source) => {
      const percentage = source.visits / totalTraffic;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      currentAngle = endAngle;
      
      // Convert angles to radians
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      
      // Calculate path points
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      return {
        path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
        color: source.color,
        percentage: Math.round(percentage * 100),
      };
    });
  }, [trafficSources, totalTraffic]);

  // Calculate max value for chart scaling
  const maxSales = useMemo(() => {
    return Math.max(...salesData.map(d => d.sales), 1);
  }, [salesData]);

  // Generate chart points based on sales data
  const chartPoints = useMemo(() => {
    const width = 600;
    const height = 200;
    const padding = 20;
    const segmentWidth = (width - padding * 2) / (salesData.length - 1);
    
    return salesData.map((data, index) => {
      const x = padding + (index * segmentWidth);
      const y = height - padding - ((data.sales / maxSales) * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
  }, [salesData, maxSales]);
  
  const totalOrders = useMemo(() => {
    return salesData.reduce((sum, data) => sum + data.orders, 0);
  }, [salesData]);

  const totalSalesAmount = useMemo(() => {
    return salesData.reduce((sum, data) => sum + data.sales, 0);
  }, [salesData]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-base">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-6xl font-bold text-slate-900">Statistiques</h1>
          <div className="relative">
            <button
              onClick={() => setShowDateMenu(!showDateMenu)}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-lg text-base font-semibold text-slate-700 hover:border-[#1e40af] shadow-sm transition-colors"
            >
              <span>{dateRangeLabels[dateRange]}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showDateMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-10">
                {(Object.keys(dateRangeLabels) as DateRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRange(range);
                      setShowDateMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                      dateRange === range
                        ? "bg-[#1e3a8a] text-white font-bold"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    {dateRangeLabels[range]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <p className="text-base font-semibold uppercase tracking-wide text-slate-500 mb-2">Valeur maximale de la commande</p>
            <p className="text-4xl font-bold text-[#1e3a8a]">0 TND</p>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <p className="text-base font-semibold uppercase tracking-wide text-slate-500 mb-2">Valeur moyenne de la commande</p>
            <p className="text-4xl font-bold text-[#1e3a8a]">0 TND</p>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <p className="text-base font-semibold uppercase tracking-wide text-slate-500 mb-2">Valeur minimum de la commande</p>
            <p className="text-4xl font-bold text-[#1e3a8a]">0 TND</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#1e3a8a]"></div>
                  <p className="text-base font-semibold uppercase tracking-wide text-slate-500">Commandes</p>
                </div>
                <p className="text-4xl font-bold text-slate-900">{totalOrders}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#1e40af]"></div>
                  <p className="text-base font-semibold uppercase tracking-wide text-slate-500">Ventes</p>
                </div>
                <p className="text-4xl font-bold text-slate-900">{totalSalesAmount} TND</p>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-56 relative">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="20" x2="600" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="70" x2="600" y2="70" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="170" x2="600" y2="170" stroke="#e2e8f0" strokeWidth="1" />
                
                {/* Sales line */}
                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {salesData.map((data, index) => {
                  const width = 600;
                  const height = 200;
                  const padding = 20;
                  const segmentWidth = (width - padding * 2) / (salesData.length - 1);
                  const x = padding + (index * segmentWidth);
                  const y = height - padding - ((data.sales / maxSales) * (height - padding * 2));
                  
                  return (
                    <g key={index}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="4" 
                        fill="#1e40af"
                        className="hover:r-6 transition-all cursor-pointer"
                      />
                      <title>{`${data.time}: ${data.orders} commandes, ${data.sales} TND`}</title>
                    </g>
                  );
                })}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-500 px-2">
                {salesData.map((data, index) => (
                  <span key={index}>{data.time}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Trafic</h2>
            
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-lg p-4 text-white">
                <p className="text-base font-semibold uppercase tracking-wide opacity-90 mb-1">Visiteurs</p>
                <p className="text-4xl font-bold">0</p>
              </div>
              <div className="bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-lg p-4 text-white">
                <p className="text-base font-semibold uppercase tracking-wide opacity-90 mb-1">Pages vues</p>
                <p className="text-4xl font-bold">0</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold text-slate-700 mb-4">Source de trafic</p>
              <div className="flex flex-wrap items-center gap-3 mb-6 text-base">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-full border border-slate-200">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
                    <span className="font-medium text-slate-700">{source.name}</span>
                    <span className="font-bold text-[#1e3a8a]">({source.visits})</span>
                  </div>
                ))}
              </div>
              
              <div className="w-52 h-52 mx-auto relative">
                {totalTraffic === 0 ? (
                  <div className="flex items-center justify-center h-full bg-slate-50 rounded-full border-4 border-slate-200">
                    <p className="text-sm font-semibold text-slate-400">Aucune donnée</p>
                  </div>
                ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {pieChartPaths.map((segment, index) => (
                      <path
                        key={index}
                        d={segment.path}
                        fill={segment.color}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                        // title removed, not valid on SVGPathElement
                      />
                    ))}
                  </svg>
                )}
              </div>
            </div>

            <div>
              <p className="text-base font-semibold text-slate-700 mb-4">Visites de la boutique en ligne par type d&apos;appareil</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center hover:border-[#1e40af] transition-colors">
                  <Monitor className="w-8 h-8 mx-auto mb-2 text-[#1e3a8a]" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Ordinateur de bureau</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1">0</p>
                  <p className="text-sm font-semibold text-slate-500">0%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center hover:border-[#1e40af] transition-colors">
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-[#1e3a8a]" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Téléphone mobile</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1">0</p>
                  <p className="text-sm font-semibold text-slate-500">0%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center hover:border-[#1e40af] transition-colors">
                  <Tablet className="w-8 h-8 mx-auto mb-2 text-[#1e3a8a]" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Tablette</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1">0</p>
                  <p className="text-sm font-semibold text-slate-500">0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion & Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Rate */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Taux de conversion de la boutique</h2>
              <p className="text-6xl font-bold text-[#1e3a8a] mt-2">0 %</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4">Checkout funnel</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#1e40af] transition-colors">
                  <button className="flex items-center gap-2 text-lg font-semibold text-slate-700">
                    <ChevronDown className="w-4 h-4 text-[#1e3a8a]" />
                    <span>Normal checkout</span>
                  </button>
                  <span className="text-lg font-bold text-[#1e3a8a]">0 %</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#1e40af] transition-colors">
                  <button className="flex items-center gap-2 text-lg font-semibold text-slate-700">
                    <ChevronDown className="w-4 h-4 text-[#1e3a8a]" />
                    <span>One page checkout</span>
                  </button>
                  <span className="text-lg font-bold text-[#1e3a8a]">0 %</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#1e40af] transition-colors">
                  <button className="flex items-center gap-2 text-lg font-semibold text-slate-700">
                    <ChevronDown className="w-4 h-4 text-[#1e3a8a]" />
                    <span>Express Checkout</span>
                  </button>
                  <span className="text-lg font-bold text-[#1e3a8a]">0 %</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders by Page Type */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Commandes par type de page</h2>
            <div className="flex items-center gap-6">
              <div className="w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="#1e40af" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                  <div className="w-3 h-3 bg-[#1e40af] rounded-full"></div>
                  <span className="text-base font-semibold text-slate-700">Page Builder</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-5">Top produits</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 text-base font-bold uppercase tracking-wide text-slate-600">Produit</th>
                  <th className="text-left py-4 px-4 text-base font-bold uppercase tracking-wide text-slate-600">Vues</th>
                  <th className="text-left py-4 px-4 text-base font-bold uppercase tracking-wide text-slate-600">Commandes</th>
                  <th className="text-left py-4 px-4 text-base font-bold uppercase tracking-wide text-slate-600">Ventes</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <a href="#" className="text-lg font-semibold text-[#1e40af] hover:underline">
                        {product.name}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-lg font-semibold text-slate-900">{product.views}</td>
                    <td className="py-4 px-4 text-lg font-semibold text-slate-900">{product.orders}</td>
                    <td className="py-4 px-4 text-lg font-semibold text-slate-900">{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
