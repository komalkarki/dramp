import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, MapPin, FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

interface ReportData {
  // Step 1: Location
  street: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  
  // Step 2: Details
  category: string;
  description: string;
  dateOccurred: string;
  
  // Step 3: Evidence
  evidenceLinks: string[];
  contactInfo: string;
}

const Report = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [reportData, setReportData] = useState<ReportData>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: '',
    category: '',
    description: '',
    dateOccurred: '',
    evidenceLinks: [''],
    contactInfo: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const discriminationCategories = [
    'Race/Ethnicity',
    'National Origin',
    'Religion',
    'Gender',
    'Disability',
    'Familial Status',
    'Sexual Orientation',
    'Age',
    'Source of Income',
    'Other'
  ];

  const propertyTypes = [
    'Apartment',
    'House',
    'Room/Shared Housing',
    'Student Housing',
    'Dormitory',
    'Other'
  ];

  const updateReportData = (field: keyof ReportData, value: any) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const addEvidenceLink = () => {
    setReportData(prev => ({
      ...prev,
      evidenceLinks: [...prev.evidenceLinks, '']
    }));
  };

  const updateEvidenceLink = (index: number, value: string) => {
    setReportData(prev => ({
      ...prev,
      evidenceLinks: prev.evidenceLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const removeEvidenceLink = (index: number) => {
    setReportData(prev => ({
      ...prev,
      evidenceLinks: prev.evidenceLinks.filter((_, i) => i !== index)
    }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return reportData.street && reportData.city && reportData.state && reportData.zipCode && reportData.propertyType;
      case 2:
        return reportData.category && reportData.description && reportData.dateOccurred;
      case 3:
        return reportData.evidenceLinks.some(link => link.trim() !== '') || reportData.contactInfo;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all required information before proceeding.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Report submitted successfully",
        description: "Thank you for reporting. We'll review your case and follow up if needed.",
        variant: "default"
      });
      
      // Reset form
      setCurrentStep(1);
      setReportData({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        propertyType: '',
        category: '',
        description: '',
        dateOccurred: '',
        evidenceLinks: [''],
        contactInfo: ''
      });
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Property Location</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={reportData.street}
                  onChange={(e) => updateReportData('street', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={reportData.city}
                  onChange={(e) => updateReportData('city', e.target.value)}
                  placeholder="New York"
                />
              </div>
              
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={reportData.state}
                  onChange={(e) => updateReportData('state', e.target.value)}
                  placeholder="NY"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={reportData.zipCode}
                  onChange={(e) => updateReportData('zipCode', e.target.value)}
                  placeholder="10001"
                />
              </div>
              
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={reportData.propertyType} onValueChange={(value) => updateReportData('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Incident Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Discrimination Category *</Label>
                <Select value={reportData.category} onValueChange={(value) => updateReportData('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discrimination type" />
                  </SelectTrigger>
                  <SelectContent>
                    {discriminationCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dateOccurred">Date Occurred *</Label>
                <Input
                  id="dateOccurred"
                  type="date"
                  value={reportData.dateOccurred}
                  onChange={(e) => updateReportData('dateOccurred', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description of Incident *</Label>
                <Textarea
                  id="description"
                  value={reportData.description}
                  onChange={(e) => updateReportData('description', e.target.value)}
                  placeholder="Please describe what happened in detail..."
                  className="min-h-[120px]"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Include relevant details like what was said, who was involved, and the context.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <Upload className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Evidence & Contact</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Evidence Links (Optional)</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add links to photos, emails, documents, or other evidence stored online.
                </p>
                
                {reportData.evidenceLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={link}
                      onChange={(e) => updateEvidenceLink(index, e.target.value)}
                      placeholder="https://example.com/evidence.jpg"
                    />
                    {reportData.evidenceLinks.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeEvidenceLink(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEvidenceLink}
                  className="mt-2"
                >
                  Add Another Link
                </Button>
              </div>
              
              <div>
                <Label htmlFor="contactInfo">Contact Information (Optional)</Label>
                <Input
                  id="contactInfo"
                  value={reportData.contactInfo}
                  onChange={(e) => updateReportData('contactInfo', e.target.value)}
                  placeholder="Your email or phone for follow-up"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Optional - only if you want us to follow up with you directly.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Review & Submit</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">
                  {reportData.street}, {reportData.city}, {reportData.state} {reportData.zipCode}
                </p>
                <Badge variant="outline" className="mt-1">{reportData.propertyType}</Badge>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Incident Details</h4>
                <Badge variant="accent" className="mb-2">{reportData.category}</Badge>
                <p className="text-sm text-muted-foreground mb-2">Date: {reportData.dateOccurred}</p>
                <p className="text-sm">{reportData.description}</p>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Evidence & Contact</h4>
                {reportData.evidenceLinks.filter(link => link.trim()).length > 0 && (
                  <p className="text-sm text-muted-foreground mb-1">
                    Evidence links: {reportData.evidenceLinks.filter(link => link.trim()).length}
                  </p>
                )}
                {reportData.contactInfo && (
                  <p className="text-sm text-muted-foreground">Contact: {reportData.contactInfo}</p>
                )}
              </div>
              
              <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning">Important Notice</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      This report will be used for research and policy advocacy. We do not provide legal services, 
                      but can connect you with resources if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report Discrimination</h1>
          <p className="text-muted-foreground">
            Help us track housing discrimination by reporting your experience. Your information will help build a safer housing market.
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Report;