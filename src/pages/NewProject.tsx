import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FolderPlus, 
  Target, 
  Calendar, 
  Users, 
  Settings, 
  Save, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Image,
  BarChart3,
  Megaphone,
  Zap,
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Camera,
  Video,
  Mic,
  PenTool,
  Palette,
  Code,
  Database,
  Cloud,
  Shield,
  Clock,
  Star,
  Heart,
  TrendingUp,
  Eye,
  Share2,
  MessageCircle,
  ThumbsUp,
  Download,
  Upload,
  RefreshCw,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/UI/Button';

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  bgColor: string;
  features: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ProjectFormData {
  projectName: string;
  description: string;
  category: string;
  targetAudience: string;
  goals: string[];
  platforms: string[];
  timeline: string;
  budget: string;
  teamSize: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
}

export function NewProject() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    description: '',
    category: '',
    targetAudience: '',
    goals: [],
    platforms: [],
    timeline: '',
    budget: '',
    teamSize: '',
    priority: 'Medium',
    status: 'Planning'
  });

  const projectTemplates: ProjectTemplate[] = [
    {
      id: 'content-marketing',
      name: 'Content Marketing Campaign',
      description: 'Create and execute a comprehensive content marketing strategy',
      category: 'Marketing',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      features: ['Content Calendar', 'SEO Optimization', 'Social Media Integration', 'Analytics Tracking'],
      estimatedTime: '2-4 weeks',
      difficulty: 'Intermediate'
    },
    {
      id: 'brand-identity',
      name: 'Brand Identity Design',
      description: 'Develop a complete brand identity including logo, colors, and guidelines',
      category: 'Design',
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines'],
      estimatedTime: '1-2 weeks',
      difficulty: 'Beginner'
    },
    {
      id: 'social-media',
      name: 'Social Media Strategy',
      description: 'Build and manage social media presence across platforms',
      category: 'Social Media',
      icon: Share2,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      features: ['Platform Setup', 'Content Planning', 'Engagement Strategy', 'Performance Tracking'],
      estimatedTime: '3-6 weeks',
      difficulty: 'Intermediate'
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'Improve website visibility and search engine rankings',
      category: 'SEO',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
      estimatedTime: '4-8 weeks',
      difficulty: 'Advanced'
    },
    {
      id: 'advertising-campaign',
      name: 'Advertising Campaign',
      description: 'Create and launch targeted advertising campaigns',
      category: 'Advertising',
      icon: Megaphone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      features: ['Ad Creative', 'Targeting Setup', 'Budget Management', 'Performance Analysis'],
      estimatedTime: '2-3 weeks',
      difficulty: 'Intermediate'
    },
    {
      id: 'website-redesign',
      name: 'Website Redesign',
      description: 'Modernize and improve website design and functionality',
      category: 'Web Development',
      icon: Globe,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      features: ['UI/UX Design', 'Responsive Layout', 'Performance Optimization', 'Content Migration'],
      estimatedTime: '6-12 weeks',
      difficulty: 'Advanced'
    }
  ];

  const platformOptions = [
    { name: 'Website', icon: Globe, color: 'text-blue-600' },
    { name: 'LinkedIn', icon: '💼', color: 'text-blue-600' },
    { name: 'Instagram', icon: '📷', color: 'text-pink-600' },
    { name: 'Facebook', icon: '📘', color: 'text-blue-600' },
    { name: 'Twitter', icon: '🐦', color: 'text-blue-400' },
    { name: 'YouTube', icon: '📺', color: 'text-red-600' },
    { name: 'TikTok', icon: '🎵', color: 'text-black' },
    { name: 'Pinterest', icon: '📌', color: 'text-red-600' }
  ];

  const goalOptions = [
    'Increase Brand Awareness',
    'Generate Leads',
    'Drive Website Traffic',
    'Boost Sales',
    'Improve SEO Rankings',
    'Build Community',
    'Launch New Product',
    'Increase Engagement',
    'Grow Social Following',
    'Improve Customer Retention'
  ];

  const steps = [
    { number: 1, title: 'Choose Template', description: 'Select a project template or start from scratch' },
    { number: 2, title: 'Project Details', description: 'Define your project goals and requirements' },
    { number: 3, title: 'Platforms & Audience', description: 'Choose target platforms and audience' },
    { number: 4, title: 'Timeline & Resources', description: 'Set timeline, budget, and team size' },
    { number: 5, title: 'Review & Create', description: 'Review your project and create it' }
  ];

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      category: template.category,
      description: template.description
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically save the project to your backend
      console.log('Project created:', {
        ...formData,
        template: selectedTemplate,
        createdAt: new Date().toISOString(),
        userId: user?.id
      });
      
      // Reset form and go back to step 1
      setFormData({
        projectName: '',
        description: '',
        category: '',
        targetAudience: '',
        goals: [],
        platforms: [],
        timeline: '',
        budget: '',
        teamSize: '',
        priority: 'Medium',
        status: 'Planning'
      });
      setSelectedTemplate(null);
      setCurrentStep(1);
      
      // Show success message (you can use toast here)
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <FolderPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create New Project
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start a new project with our guided setup process
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Choose a Project Template
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a template to get started quickly, or create a custom project
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    className={`${template.bgColor} rounded-xl p-6 border-2 cursor-pointer transition-all duration-200 ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 shadow-lg'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-lg ${template.bgColor} border border-gray-200 dark:border-gray-600`}>
                        <template.icon className={`w-6 h-6 ${template.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {template.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {template.description}
                    </p>
                    <div className="space-y-2">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {template.estimatedTime}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTemplate(null)}
                  className="mt-6"
                >
                  Start from Scratch
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Project Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your project goals and requirements
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your project name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your project..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Social Media">Social Media</option>
                      <option value="SEO">SEO</option>
                      <option value="Advertising">Advertising</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Content Creation">Content Creation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Project Goals
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {goalOptions.map((goal) => (
                        <label key={goal} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.goals.includes(goal)}
                            onChange={() => handleGoalToggle(goal)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Platforms & Audience
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your target platforms and define your audience
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Target Platforms
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {platformOptions.map((platform) => (
                        <label key={platform.name} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.platforms.includes(platform.name)}
                            onChange={() => handlePlatformToggle(platform.name)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            {typeof platform.icon === 'string' ? (
                              <span className="text-lg">{platform.icon}</span>
                            ) : (
                              <platform.icon className="w-4 h-4" />
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300">{platform.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Audience
                    </label>
                    <textarea
                      value={formData.targetAudience}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your target audience..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Timeline & Resources
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Set your project timeline, budget, and team requirements
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                      <option value="6 months">6 months</option>
                      <option value="1 year">1 year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $1,000">Under $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="Over $50,000">Over $50,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select team size</option>
                      <option value="Just me">Just me</option>
                      <option value="2-3 people">2-3 people</option>
                      <option value="4-6 people">4-6 people</option>
                      <option value="7-10 people">7-10 people</option>
                      <option value="10+ people">10+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Review & Create Project
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Review your project details and create your project
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                          <p className="text-gray-900 dark:text-white">{formData.projectName || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category:</span>
                          <p className="text-gray-900 dark:text-white">{formData.category || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline:</span>
                          <p className="text-gray-900 dark:text-white">{formData.timeline || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority:</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(formData.priority)}`}>
                            {formData.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Platforms:</span>
                          <p className="text-gray-900 dark:text-white">
                            {formData.platforms.length > 0 ? formData.platforms.join(', ') : 'None selected'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Size:</span>
                          <p className="text-gray-900 dark:text-white">{formData.teamSize || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget:</span>
                          <p className="text-gray-900 dark:text-white">{formData.budget || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.goals.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.goals.map((goal, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTemplate && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Selected Template</h3>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className={`p-2 rounded-lg ${selectedTemplate.bgColor}`}>
                          <selectedTemplate.icon className={`w-5 h-5 ${selectedTemplate.color}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{selectedTemplate.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTemplate.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !selectedTemplate && !formData.projectName}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !formData.projectName}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
