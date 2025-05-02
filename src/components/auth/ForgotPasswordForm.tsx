import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { z } from 'zod';

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onCancel }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = (): boolean => {
    try {
      z.string().email('Please enter a valid email address').parse(email);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await forgotPassword(email);
      setIsSuccess(true);
      setSuccessMessage(response.message || 'Password reset instructions sent to your email.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center animate-slide-up">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-100 mb-4">
          <svg className="h-6 w-6 text-success-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">Check your email</h3>
        <p className="text-neutral-600 mb-4">{successMessage}</p>
        <Button onClick={onCancel}>
          Return to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">Forgot your password?</h3>
        <p className="text-neutral-600">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={handleEmailChange}
          icon={<Mail size={18} />}
          error={error}
          required
        />
        
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            Send Link
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;