export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  originalPrice: string;
  description: string;
  shortDescription: string;
  features: string[];
  keywords: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'LegalAgent',
    slug: 'legalbot',
    image: '/assets/saas-consulting-images/chatbot-juridique-1200x800-1-700x700.webp',
    price: '999,00',
    originalPrice: '1.000,00',
    description: 'Virtual agents are AI bots that can be specifically trained to interact with customers in call centers or contact centers.',
    shortDescription: 'AI chatbots trained on legal data for intelligent responses.',
    features: [
      'Legal document analysis',
      'Contract review assistance',
      'Legal query responses',
      'Compliance checking'
    ],
    keywords: 'Legal AI, Legal Bot, Law Chatbot, Legal Assistant, AI Legal Help'
  },
  {
    id: 2,
    name: 'MedicalAgent',
    slug: 'medicalbot',
    image: '/assets/saas-consulting-images/HealthcareChatbotTrainingData-300x300.webp',
    price: '999,00',
    originalPrice: '1.000,00',
    description: 'AI chatbots trained on medical data to provide accurate health-related information and assistance.',
    shortDescription: 'Healthcare-focused AI chatbot for medical assistance.',
    features: [
      'Symptom analysis',
      'Medical information lookup',
      'Healthcare guidance',
      'Appointment scheduling'
    ],
    keywords: 'Medical AI, Health Bot, Healthcare Chatbot, Medical Assistant, AI Health Help'
  },
  {
    id: 3,
    name: 'TechnicalAgent',
    slug: 'technicalbot',
    image: '/assets/saas-consulting-images/netacea-header-e1720904743204-300x300.jpg',
    price: '999,00',
    originalPrice: '1.000,00',
    description: 'Technical support AI bot trained to handle IT and technical queries efficiently.',
    shortDescription: 'IT support and technical assistance chatbot.',
    features: [
      'Technical troubleshooting',
      'IT support assistance',
      'System diagnostics',
      'Setup guidance'
    ],
    keywords: 'Technical AI, IT Bot, Support Chatbot, Tech Assistant, AI Tech Help'
  },
  {
    id: 4,
    name: 'SocialAgent',
    slug: 'socialbot',
    image: '/assets/saas-consulting-images/do-a-bot-which-automates-your-works-89a7.webp',
    price: '999,00',
    originalPrice: '1.000,00',
    description: 'Social media management bot for automated responses and engagement.',
    shortDescription: 'AI-powered social media management assistant.',
    features: [
      'Social media automation',
      'Engagement tracking',
      'Content suggestions',
      'Audience analysis'
    ],
    keywords: 'Social Media AI, Social Bot, Marketing Chatbot, Social Assistant, AI Social Help'
  },
  {
    id: 5,
    name: 'EducationalAgent',
    slug: 'educationalbot',
    image: '/assets/saas-consulting-images/64f037406f46384449154525_using-machine-learning-bot-in-educational-institutions-700x700.jpg',
    price: '999,00',
    originalPrice: '1.000,00',
    description: 'Educational AI bot designed to assist in learning and teaching processes.',
    shortDescription: 'AI-powered educational assistant for learning support.',
    features: [
      'Learning assistance',
      'Study materials',
      'Quiz generation',
      'Progress tracking'
    ],
    keywords: 'Education AI, Learning Bot, Educational Chatbot, Study Assistant, AI Learning Help'
  },
  {
    id: 6,
    name: 'InformationalAgent',
    slug: 'informationalbot',
    image: '/assets/saas-consulting-images/informational-bot-color-icon-robot-virtual-assistant-artificial-intelligence-web-robot-in-online-networks-access-to-data-machine-learning-software-application-isolated-illustration-vector.jpg',
    price: '999,00',
    originalPrice: '1.000,00',
    description: 'General information and knowledge base AI bot for diverse queries.',
    shortDescription: 'Comprehensive information retrieval and assistance bot.',
    features: [
      'Knowledge base access',
      'Information retrieval',
      'FAQ handling',
      'Data organization'
    ],
    keywords: 'Information AI, Knowledge Bot, FAQ Chatbot, Info Assistant, AI Information Help'
  }
];

export const getProduct = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getRelatedProducts = (currentProduct: Product, count: number = 2): Product[] => {
  return products
    .filter(product => product.id !== currentProduct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};
