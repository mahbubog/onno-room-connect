import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email/pin, 2: otp, 3: new password
  const [formData, setFormData] = useState({
    emailOrPin: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (step === 1) {
      // Send OTP
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: "Check your email for the verification code"
        });
        setStep(2);
        setIsLoading(false);
      }, 1000);
    } else if (step === 2) {
      // Verify OTP
      setTimeout(() => {
        if (formData.otp === "123456") {
          toast({
            title: "OTP Verified",
            description: "Please set your new password"
          });
          setStep(3);
        } else {
          toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "Please check the code and try again"
          });
        }
        setIsLoading(false);
      }, 1000);
    } else if (step === 3) {
      // Reset password
      if (formData.newPassword !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Password Mismatch",
          description: "Passwords do not match"
        });
        setIsLoading(false);
        return;
      }
      
      setTimeout(() => {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated"
        });
        navigate("/login");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">OnnoRokom</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Reset Password</h2>
          <p className="text-muted-foreground">
            {step === 1 && "Enter your email or PIN to reset password"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create a new password"}
          </p>
        </div>

        {/* Reset Card */}
        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="text-center">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "New Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1 && "We'll send you a verification code"}
              {step === 2 && "Enter the 6-digit code from your email"}
              {step === 3 && "Your new password must be secure"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="space-y-2">
                  <Label htmlFor="emailOrPin" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email or PIN</span>
                  </Label>
                  <Input
                    id="emailOrPin"
                    type="text"
                    placeholder="Enter your email or PIN"
                    value={formData.emailOrPin}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailOrPin: e.target.value }))}
                    required
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <Label htmlFor="otp" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Verification Code</span>
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.otp}
                    onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                    required
                    className="transition-all duration-300 focus:shadow-glow text-center text-lg tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Demo OTP: 123456
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>New Password</span>
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                      required
                      className="transition-all duration-300 focus:shadow-glow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Confirm Password</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="transition-all duration-300 focus:shadow-glow"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
                variant="hero"
              >
                {isLoading ? "Processing..." : 
                 step === 1 ? "Send OTP" :
                 step === 2 ? "Verify OTP" :
                 "Reset Password"}
              </Button>

              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "OTP Resent",
                      description: "A new code has been sent to your email"
                    });
                  }}
                >
                  Resend OTP
                </Button>
              )}
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-primary hover:text-primary-hover font-medium transition-colors inline-flex items-center space-x-1"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back to login</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;