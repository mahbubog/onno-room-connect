import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Building2, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (pin === "admin" && password === "123456") {
        toast({
          title: "Login Successful",
          description: "Welcome to Super Admin Dashboard",
        });
        navigate("/admin");
      } else if (pin && password) {
        toast({
          title: "Login Successful", 
          description: "Welcome to OnnoRokom Meeting System",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid PIN or Password",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/fa903b58-92ad-41fc-8e78-58c330f74c7a.png" 
            alt="OnnoRokom Logo" 
            className="mx-auto mb-6 h-24 w-auto"
          />
          <h2 className="text-xl text-primary font-medium">Meeting Room Booking System</h2>
        </div>

        {/* Login Card */}
        <Card className="shadow-card border">
          <CardContent className="pt-8 pb-8 px-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-foreground mb-2">Log in</h1>
              <p className="text-muted-foreground">Welcome! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-sm font-medium text-foreground">
                  PIN
                </Label>
                <Input
                  id="pin"
                  type="text"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember Password
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-hover font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Log in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;