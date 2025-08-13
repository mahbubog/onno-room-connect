import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, User, Phone, Mail, Lock, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const departments = [
  "Human Resource Management",
  "Software Development", 
  "Business Development",
  "Software Quality Assurance",
  "Operations & Management",
  "UI & Graphics Design",
  "TechCare",
  "Requirement Analysis & UX Design",
  "Top Management",
  "DevOps & Network",
  "Finance & Accounts",
  "Internal Audit",
  "Graphics & Creative",
  "Organization Development",
  "IT & Hardware",
  "Legal & Compliance",
  "Operations (Asset Management)"
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    phone: "",
    email: "",
    department: "",
    designation: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match"
      });
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast({
        variant: "destructive", 
        title: "Invalid Password",
        description: "Password must contain uppercase, lowercase, number and special character"
      });
      return false;
    }

    const phoneRegex = /^\+880[0-9]{10}$/;
    const fullPhone = `+880${formData.phone}`;
    if (!phoneRegex.test(fullPhone)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Please login with your credentials"
      });
      navigate("/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">OnnoRokom</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Create Account</h2>
          <p className="text-muted-foreground">Join the meeting booking system</p>
        </div>

        {/* Registration Card */}
        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="text-center">Register</CardTitle>
            <CardDescription className="text-center">
              Create your account to start booking meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin" className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>PIN (1-9 digits)</span>
                  </Label>
                  <Input
                    id="pin"
                    type="text"
                    placeholder="Enter unique PIN"
                    value={formData.pin}
                    onChange={(e) => handleInputChange("pin", e.target.value.replace(/\D/g, '').slice(0, 9))}
                    required
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </Label>
                  <div className="flex">
                    <div className="px-3 py-2 bg-muted text-muted-foreground border border-r-0 rounded-l-md">
                      +880
                    </div>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="1712345678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                      className="rounded-l-none transition-all duration-300 focus:shadow-glow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Department</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger className="transition-all duration-300 focus:shadow-glow">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation" className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Designation</span>
                  </Label>
                  <Input
                    id="designation"
                    type="text"
                    placeholder="Your job title"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
                variant="hero"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;