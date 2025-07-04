
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import SuggestionForm from "@/components/suggestions/SuggestionForm";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import AdvertCarousel from "@/components/home/AdvertCarousel";
import EssentialsPreview from "@/components/home/EssentialsPreview";
import Chatbot from "@/components/chat/Chatbot";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isLoading } = useSessionContext();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isServiceProvider, setIsServiceProvider] = React.useState(false);
  const [serviceProviderId, setServiceProviderId] = React.useState<string | null>(null);

  const { data: serviceProvider } = useQuery({
    queryKey: ["service-provider"],
    queryFn: async () => {
      if (!session?.user) return null;
      
      const { data, error } = await supabase
        .from("service_providers")
        .select("id")
        .eq("profile_id", session.user.id)
        .maybeSingle();

      // Handle PGRST116 error (no rows found) silently
      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }
      return data;
    },
    enabled: !!session?.user,
    retry: false,
    meta: {
      onError: (error: any) => {
        console.error('Error in service provider query:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check service provider status",
        });
      },
    },
  });

  useEffect(() => {
    const checkUserStatus = async () => {
      if (session?.user) {
        try {
          // Use the new admin function to avoid RLS recursion
          const { data: isAdminResult, error: adminError } = await supabase
            .rpc('is_user_admin', { user_id: session.user.id });
          
          if (adminError) {
            console.error('Error checking admin status:', adminError);
          } else {
            setIsAdmin(isAdminResult || false);
          }

          const { data: providerData, error: providerError } = await supabase
            .from('service_providers')
            .select('id')
            .eq('profile_id', session.user.id)
            .maybeSingle();
          
          // Only log error if it's not a "no rows found" error
          if (providerError && providerError.code !== 'PGRST116') {
            console.error('Error checking provider status:', providerError);
            return;
          }
          
          setIsServiceProvider(!!providerData);
          if (providerData) {
            setServiceProviderId(providerData.id);
          }
        } catch (error) {
          console.error('Error in checkUserStatus:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to check user status",
          });
        }
      }
    };

    checkUserStatus();
  }, [session, toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.clear(); // Clear any stored auth data
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      
      navigate('/login', { replace: true }); // Redirect to login page and replace history
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ceremonial-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="absolute top-20 right-4 flex gap-4 z-50">
        <div className="flex gap-2">
          {session ? (
            <Button
              className="shadow-[5px_5px_10px_#b8b8b8,-5px_-5px_10px_#ffffff] bg-ceremonial-gold hover:bg-ceremonial-gold/90 text-white backdrop-blur-md flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="shadow-[5px_5px_10px_#b8b8b8,-5px_-5px_10px_#ffffff] border-ceremonial-gold text-ceremonial-gold hover:bg-ceremonial-gold hover:text-white backdrop-blur-md bg-white/30"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                className="shadow-[5px_5px_10px_#b8b8b8,-5px_-5px_10px_#ffffff] bg-ceremonial-gold hover:bg-ceremonial-gold/90 text-white backdrop-blur-md"
                onClick={() => navigate("/register")}
              >
                Join Us
              </Button>
            </>
          )}
        </div>
      </div>

      <Hero />
      <AdvertCarousel />
      <Services />
      <EssentialsPreview />
      <HowItWorks />
      <Testimonials />
      
      {session && !isServiceProvider && (
        <div className="max-w-md mx-auto px-4 py-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full shadow-[5px_5px_10px_#b8b8b8,-5px_-5px_10px_#ffffff] bg-ceremonial-gold hover:bg-ceremonial-gold/90"
              >
                Suggest a Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Suggest a Service</DialogTitle>
              </DialogHeader>
              <SuggestionForm />
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
