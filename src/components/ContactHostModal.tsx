import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

interface ContactHostModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostName: string;
  listingTitle: string;
}

const ContactHostModal = ({ isOpen, onClose, hostName, listingTitle }: ContactHostModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: `Your message has been sent to ${hostName}. They will contact you soon.`,
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiryType: 'general'
      });
      onClose();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Contact {hostName}</span>
          </DialogTitle>
          <DialogDescription>
            Send a message about "{listingTitle}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Phone (Optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="viewing">Request Viewing</SelectItem>
                <SelectItem value="application">Application to Rent</SelectItem>
                <SelectItem value="questions">Questions about Property</SelectItem>
                <SelectItem value="availability">Availability Check</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Hi! I'm interested in your property listing..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactHostModal;