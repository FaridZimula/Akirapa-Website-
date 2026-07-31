import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Smartphone, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

const Register = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "", // Contact phone
        paymentPhone: "", // Mobile money phone
        provider: "" as "mtn" | "airtel" | "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.provider) {
            toast({
                title: "Payment Method Required",
                description: "Please select MTN or Airtel to pay the registration fee.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSuccess(true);
            setIsSubmitting(false);
            toast({
                title: "Registration Successful!",
                description: "Your membership registration is now complete.",
            });
        }, 1000);
    };

    if (isSuccess) {
        return (
            <Layout>
                <section className="px-4 py-20 bg-background min-h-[70vh] flex items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-10 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">In Review!</h2>
                        <p className="text-gray-600 mb-8">
                            We've received your registration details for <span className="font-bold text-primary">{formData.fullName}</span>.
                            Once your UGX 10,000 payment is confirmed, you will be officially listed as a SUYEL member.
                        </p>
                        <Button
                            onClick={() => window.location.href = "/"}
                            className="w-full h-14 rounded-full text-lg font-bold"
                        >
                            Back to Home
                        </Button>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="px-4 sm:px-6 lg:px-8 py-12 bg-background min-h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl p-8 sm:p-12 border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-primary">
                            Register for Membership
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Join SUYEL today. The annual registration fee is <span className="font-bold text-primary">UGX 10,000</span>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-base font-semibold">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    required
                                    className="h-12 text-lg rounded-xl"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="h-12 text-lg rounded-xl"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-base font-semibold">Contact Phone</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="077..."
                                        required
                                        className="h-12 text-lg rounded-xl"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div className="text-center">
                                <Label className="text-xl font-bold">Pay Registration Fee (UGX 10,000)</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Select your mobile money provider and enter your number.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, provider: 'mtn' }))}
                                    className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${formData.provider === 'mtn'
                                        ? "border-yellow-400 bg-yellow-400/5 ring-4 ring-yellow-400/10"
                                        : "border-gray-100 hover:border-yellow-200"
                                        }`}
                                >
                                    <img src="/MTN mobile money.png" alt="MTN MoMo" className="h-10 w-auto object-contain mb-2" />
                                    <span className={`font-bold text-sm ${formData.provider === 'mtn' ? "text-yellow-700" : "text-gray-500"}`}>MTN MoMo</span>
                                    {formData.provider === 'mtn' && <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white ring-2 ring-white"><CheckCircle2 className="w-3 h-3" /></div>}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, provider: 'airtel' }))}
                                    className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${formData.provider === 'airtel'
                                        ? "border-red-600 bg-red-600/5 ring-4 ring-red-600/10"
                                        : "border-gray-100 hover:border-red-200"
                                        }`}
                                >
                                    <img src="/Airtel mobile money.jpg" alt="Airtel Money" className="h-10 w-auto object-contain mb-2" />
                                    <span className={`font-bold text-sm ${formData.provider === 'airtel' ? "text-red-700" : "text-gray-500"}`}>Airtel Money</span>
                                    {formData.provider === 'airtel' && <div className="absolute top-2 right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white ring-2 ring-white"><CheckCircle2 className="w-3 h-3" /></div>}
                                </button>
                            </div>

                            {formData.provider && (
                                <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 animate-in slide-in-from-top-2">
                                    <div className="space-y-2 flex flex-col items-center">
                                        <Label htmlFor="paymentPhone" className="text-sm font-bold text-gray-700">Payment Number (for PIN prompt)</Label>
                                        <div className="relative w-full max-w-xs">
                                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                id="paymentPhone"
                                                name="paymentPhone"
                                                type="tel"
                                                placeholder="07XX XXX XXX"
                                                className="h-14 pl-12 text-center text-lg rounded-xl border-gray-200 bg-white"
                                                value={formData.paymentPhone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 italic text-center">A PIN prompt for UGX 10,000 will be sent to this number.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            size="lg"
                            className="w-full text-xl h-16 font-bold shadow-xl hover:shadow-primary/20 rounded-full bg-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    Sending PIN prompt...
                                </>
                            ) : (
                                <>
                                    Complete Membership & Pay
                                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default Register;

