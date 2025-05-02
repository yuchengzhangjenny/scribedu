import React, { useState } from 'react';
import { Mail, Lock, Unlock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { useAuth } from '../../context/AuthContext';
import { UserCredentials, ValidationErrors } from '../../types';
import { z } from 'zod';

interface SignInFormProps {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onForgotPassword, onSignUp }) => {
  const { login, authState } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UserCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
  });

  const validateForm = (): boolean => {
    try {
      validationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof ValidationErrors;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      await login(formData);
      // After successful login, the user will be redirected by the AuthProvider
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      {errors.general && (
        <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm animate-fade-in">
          {errors.general}
        </div>
      )}
      
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        icon={<Mail size={18} />}
        error={errors.email}
        autoComplete="email"
        required
      />
      
      <div className="relative">
        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          icon={<Lock size={18} />}
          error={errors.password}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-neutral-500 hover:text-neutral-700 transition-colors"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <Unlock size={18} /> : <Lock size={18} />}
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <Checkbox
          name="rememberMe"
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        
        <button
          type="button"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-neutral-600">
          Don't have an account?{' '}
          <button
            type="button"
            className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            onClick={onSignUp}
          >
            Create account
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;