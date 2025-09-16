import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/layout/Section';
import ServiceGrid from '@/components/layout/ServiceGrid';
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
  const coreServices = [
    {
      icon: <span className="text-2xl">🧠</span>,
      title: 'Data Analytics & AI',
      description: 'Advanced machine learning models and predictive analytics for automotive intelligence.',
      features: ['TensorFlow.js Integration', 'Real-time Predictions', 'Custom ML Models']
    },
    {
      icon: <span className="text-2xl">🚗</span>,
      title: 'Automotive Solutions',
      description: 'Comprehensive automotive industry solutions for production, quality, and supply chain.',
      features: ['Production Planning', 'Quality Control', 'Supply Chain Management']
    },
    {
      icon: <span className="text-2xl">🔒</span>,
      title: 'Compliance & Security',
      description: 'GDPR compliance, data privacy controls, and comprehensive security monitoring.',
      features: ['GDPR Compliance', 'Data Privacy', 'Security Dashboard']
    },
    {
      icon: <span className="text-2xl">🔗</span>,
      title: 'API Integration',
      description: 'Seamless API management and integration services for enterprise systems.',
      features: ['REST APIs', 'GraphQL', 'WebSocket Support']
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <Section id="hero" variant="hero" background="network">
        <Hero />
        <StatisticsDisplay />
      </Section>

      {/* Core Services Overview */}
      <Section 
        id="services" 
        title="Core Services Overview" 
        subtitle="Comprehensive solutions designed for the automotive industry's digital transformation needs"
      >
        <ServiceGrid services={coreServices} columns={4} />
      </Section>

      {/* Technology Showcase */}
      <Section 
        id="technology" 
        title="AI/ML Technology Showcase" 
        subtitle="Advanced machine learning capabilities powered by TensorFlow.js for real-time automotive predictions"
        background="gradient"
        variant="showcase"
      >
        <MLShowcase />
      </Section>

      {/* Solutions Deep Dive */}
      <Section 
        id="solutions" 
        title="Solutions Deep Dive" 
        subtitle="Explore our comprehensive automotive solutions with interactive demonstrations"
      >
        <SolutionNavigator />
      </Section>

      {/* Dashboard Preview */}
      <Section 
        id="dashboard" 
        title="Advanced Dashboard Preview" 
        subtitle="Real-time data visualization and KPI monitoring for automotive operations"
        background="gradient"
        variant="showcase"
      >
        <AdvancedDashboard />
        <div className="mt-12">
          <AutomotiveKPIs />
        </div>
      </Section>

      {/* Industry Applications */}
      <Section 
        id="applications" 
        title="Industry Applications" 
        subtitle="Specialized solutions for automotive production, quality control, and supply chain management"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProductionPlanning />
          <QualityControl />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SupplierManagement />
          <ISOCompliance />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FacilityVisualization />
          <WorkflowAnimator />
          <PerformanceOptimizer />
        </div>
      </Section>

      {/* API Management */}
      <Section 
        id="integration" 
        title="API Management & Integration" 
        subtitle="Seamless integration capabilities for enterprise systems and third-party services"
        background="gradient"
      >
        <APIManagement />
      </Section>

      {/* Compliance & Security */}
      <Section 
        id="compliance" 
        title="Compliance & Security" 
        subtitle="Comprehensive GDPR compliance, data privacy controls, and security monitoring"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GDPRCompliance />
          <DataPrivacyControls />
          <SecurityDashboard />
        </div>
      </Section>

      <Footer />
    </main>
  );
}
