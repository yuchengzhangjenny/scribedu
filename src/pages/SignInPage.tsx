import React, { useState } from 'react';
import Logo from '../components/common/Logo';
import SignInForm from '../components/auth/SignInForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import WaveAnimation from '../components/animations/WaveAnimation';

enum AuthView {
  SIGN_IN,
  FORGOT_PASSWORD,
}

const SignInPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.SIGN_IN);

  const handleForgotPassword = () => {
    setCurrentView(AuthView.FORGOT_PASSWORD);
  };

  const handleReturnToSignIn = () => {
    setCurrentView(AuthView.SIGN_IN);
  };

  const handleSignUp = () => {
    // In a real app, this would navigate to the sign up page
    alert('Sign up functionality would be implemented here');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="bg-primary-800 text-white md:w-1/2 p-8 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto">
          <Logo size="lg" variant="white" />
          
          <h1 className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold">
            Transform Speech to Text with AI
          </h1>
          
          <p className="mt-4 text-primary-100 text-lg">
            Accurate transcriptions powered by state-of-the-art AI technology. 
            Save time and boost productivity with our professional transcription service.
          </p>
          
          <div className="mt-8">
            <WaveAnimation />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Accurate</h3>
              <p className="text-sm text-primary-100">
                Industry-leading accuracy with specialized vocabulary support
              </p>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Fast</h3>
              <p className="text-sm text-primary-100">
                Get transcripts in minutes, not hours
              </p>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-sm text-primary-100">
                Enterprise-grade security for all your sensitive audio
              </p>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Smart</h3>
              <p className="text-sm text-primary-100">
                Advanced features like speaker identification and sentiment analysis
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Authentication */}
      <div className="bg-white md:w-1/2 p-8 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-neutral-900">
              {currentView === AuthView.SIGN_IN ? 'Welcome back' : 'Reset Password'}
            </h2>
            
            {currentView === AuthView.SIGN_IN && (
              <p className="mt-2 text-neutral-600">
                Sign in to access your transcription dashboard
              </p>
            )}
          </div>
          
          {currentView === AuthView.SIGN_IN ? (
            <SignInForm 
              onForgotPassword={handleForgotPassword}
              onSignUp={handleSignUp}
            />
          ) : (
            <ForgotPasswordForm 
              onCancel={handleReturnToSignIn} 
            />
          )}
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} VoxScript. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;