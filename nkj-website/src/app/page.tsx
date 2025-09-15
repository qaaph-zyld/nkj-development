import Hero from '@/components/ui/Hero';
import StatisticsDisplay from '@/components/ui/StatisticsDisplay';
import SolutionNavigator from '@/components/ui/SolutionNavigator';
import MLShowcase from '@/components/ai/MLShowcase';
import AdvancedDashboard from '@/components/dashboard/AdvancedDashboard';
import APIManagement from '@/components/api/APIManagement';
import ProductionPlanning from '@/components/automotive/ProductionPlanning';
import QualityControl from '@/components/automotive/QualityControl';
import SupplierManagement from '@/components/automotive/SupplierManagement';
import ISOCompliance from '@/components/automotive/ISOCompliance';
import AutomotiveKPIs from '@/components/automotive/AutomotiveKPIs';
import FacilityVisualization from '@/components/visualization/FacilityVisualization';
import WorkflowAnimator from '@/components/visualization/WorkflowAnimator';
import PerformanceOptimizer from '@/components/visualization/PerformanceOptimizer';
import GDPRCompliance from '@/components/compliance/GDPRCompliance';
import DataPrivacyControls from '@/components/compliance/DataPrivacyControls';
import SecurityDashboard from '@/components/compliance/SecurityDashboard';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Network Animation Background */}
      <div className="network-bg"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <StatisticsDisplay />
        <SolutionNavigator />
        <MLShowcase />
        <AdvancedDashboard />
        <APIManagement />
        <ProductionPlanning />
        <QualityControl />
        <SupplierManagement />
        <ISOCompliance />
        <AutomotiveKPIs />
        <FacilityVisualization />
        <WorkflowAnimator />
        <PerformanceOptimizer />
        <GDPRCompliance />
        <DataPrivacyControls />
        <SecurityDashboard />
      </div>
    </main>
  );
}
