import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, Shield, Users, FileText, AlertTriangle, Home } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      color: 'bg-primary',
      questions: [
        {
          question: 'What is DRAMP and how does it work?',
          answer: 'DRAMP (Discrimination Reporting and Monitoring Platform) is a comprehensive platform that helps fight housing discrimination in Italy. We provide verified listings, anonymous reporting tools, and data-driven insights to create a safer housing marketplace for everyone, especially international students and marginalized communities.'
        },
        {
          question: 'Is DRAMP free to use?',
          answer: 'Yes, DRAMP is completely free for renters. Our basic services including browsing verified listings, reporting discrimination, and accessing safety information are available at no cost. We may charge fees to property hosts for premium verification services.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple. Click on "Register" in the top menu, fill out the basic information form, and verify your email address. You can also browse listings without an account, but registration is required to save listings and submit reports.'
        },
        {
          question: 'What cities in Italy does DRAMP cover?',
          answer: 'DRAMP covers major Italian cities including Milan, Rome, Bologna, Florence, Naples, Turin, Venice, and many others. We are continuously expanding to cover more cities and regions across Italy.'
        }
      ]
    },
    {
      id: 'housing',
      title: 'Housing & Listings',
      icon: Home,
      color: 'bg-success',
      questions: [
        {
          question: 'How are listings verified as "safe"?',
          answer: 'Our verification process includes background checks on hosts, review of rental agreements for discriminatory language, analysis of past tenant reviews, and AI-powered screening for bias indicators. Only listings that pass all checks receive our "Verified Safe" badge.'
        },
        {
          question: 'What should I do if I find a discriminatory listing?',
          answer: 'If you encounter a discriminatory listing, please report it immediately using our reporting tool. Include screenshots, links, and any relevant details. We investigate all reports within 24 hours and remove verified discriminatory content.'
        },
        {
          question: 'Can I save listings for later?',
          answer: 'Yes, registered users can save listings to their personal list. Click the heart icon on any listing to save it. You can access your saved listings anytime from your dashboard or the "Saved Listings" page.'
        },
        {
          question: 'How do I contact a host?',
          answer: 'For verified listings, you can contact hosts directly through our secure messaging system. Click "Contact Host" on any listing details page. This helps us monitor communications and ensure fair treatment.'
        }
      ]
    },
    {
      id: 'discrimination',
      title: 'Discrimination Reporting',
      icon: AlertTriangle,
      color: 'bg-warning',
      questions: [
        {
          question: 'What types of discrimination can I report?',
          answer: 'You can report discrimination based on race, ethnicity, national origin, religion, gender, disability, familial status, sexual orientation, age, source of income, or any other protected characteristic. We also track other forms of unfair treatment in housing.'
        },
        {
          question: 'Is my report anonymous?',
          answer: 'Yes, all discrimination reports are completely anonymous by default. You can choose to provide contact information if you want follow-up, but this is optional. We never share reporter information without explicit consent.'
        },
        {
          question: 'What happens after I submit a report?',
          answer: 'After submission, we review your report within 24 hours, investigate the claims, update our database, and may flag or remove discriminatory listings. If you provided contact info, we may reach out for additional information or to offer support resources.'
        },
        {
          question: 'Can DRAMP help with legal action?',
          answer: 'While DRAMP doesn\'t provide legal services directly, we can connect you with partner organizations and legal aid societies in Italy that specialize in housing discrimination cases. We also provide documentation that may be helpful for legal proceedings.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: Shield,
      color: 'bg-accent',
      questions: [
        {
          question: 'How do you protect my personal information?',
          answer: 'We use industry-standard encryption and security measures to protect all user data. Personal information is never shared with hosts or third parties without your explicit consent. All communications are encrypted and stored securely.'
        },
        {
          question: 'What if I feel unsafe during a housing search?',
          answer: 'If you feel unsafe at any point, trust your instincts. Use our emergency reporting feature for immediate concerns. We also provide safety tips for housing searches and can connect you with local support organizations.'
        },
        {
          question: 'How do you verify host backgrounds?',
          answer: 'Our host verification includes identity verification, criminal background checks where legally permitted, previous tenant feedback analysis, and social media screening for discriminatory behavior patterns.'
        },
        {
          question: 'Can I report safety concerns about a property?',
          answer: 'Absolutely. Use our reporting system to flag safety issues like poor building conditions, lack of proper exits, or other hazards. We investigate all safety reports and work with local authorities when necessary.'
        }
      ]
    },
    {
      id: 'platform',
      title: 'Platform Features',
      icon: Users,
      color: 'bg-secondary',
      questions: [
        {
          question: 'How do I use the analytics dashboard?',
          answer: 'The analytics dashboard shows discrimination trends, safe neighborhoods, and platform statistics. You can filter data by city, time period, and discrimination type to understand housing patterns in your area of interest.'
        },
        {
          question: 'What is the rating system for hosts?',
          answer: 'Hosts are rated on fairness, responsiveness, property accuracy, and overall experience. Ratings include safety scores based on discrimination reports and verification status. Only verified tenants can submit ratings.'
        },
        {
          question: 'Can I use DRAMP on mobile devices?',
          answer: 'Yes, DRAMP is fully optimized for mobile devices. You can access all features including browsing listings, submitting reports, and viewing analytics from your smartphone or tablet browser.'
        },
        {
          question: 'How often is the platform updated?',
          answer: 'We continuously update our listings database, safety information, and platform features. New listings are verified daily, and safety reports are processed in real-time. Major platform updates are released monthly.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const totalQuestions = faqCategories.reduce((sum, category) => sum + category.questions.length, 0);
  const filteredQuestions = filteredCategories.reduce((sum, category) => sum + category.questions.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-primary/10">
        <div className="container mx-auto text-center">
          <Badge variant="accent" className="mb-4">Frequently Asked Questions</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">How Can We Help You?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Find quick answers to common questions about fair housing, our platform features, 
            and how to stay safe during your housing search in Italy.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            {searchTerm ? `Showing ${filteredQuestions} of ${totalQuestions} questions` : `${totalQuestions} questions available`}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        {filteredCategories.length > 0 ? (
          <div className="grid gap-8">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`${category.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <span>{category.title}</span>
                    <Badge variant="outline">{category.questions.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-soft text-center py-12">
            <CardContent>
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No matching questions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse all categories above.
              </p>
              <Badge variant="outline" onClick={() => setSearchTerm('')} className="cursor-pointer hover:bg-secondary">
                Clear Search
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Contact CTA */}
        <Card className="shadow-soft mt-12 bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Still Have Questions?</span>
            </CardTitle>
            <CardDescription>
              Can't find what you're looking for? Our support team is here to help.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                Contact Support
              </a>
              <a href="/report" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
                Report Discrimination
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;