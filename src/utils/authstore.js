import supabase from "@/lib/supabase";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  signInwithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      console.log("data",data);
      if (error) throw error;

      set({ user:data });
    } catch (e) {
      console.log(e);
    } 
  },
  signUpWithEmailAndPassword: async (email, password,setLoading,setShowVerifyModal) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setShowVerifyModal(true);
      set({ user });
    } catch (error) {
      console.error("Sign up error:", error.message);
    }finally {
      setLoading(false);
    }
  },

  signInWithEmailAndPassword: async (email, password, setLoading) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({ user });
    } catch (error) {
      console.error("Sign in error:", error.message);
    } finally {
      setLoading(false);
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  },

  // onAuthStateChange:async()=>{
  //   try{
  //     const { data: { user } } = await supabase.auth.getUser();
  //     set({ user });
  //   }catch(error){
  //     console.error("Sign out error:", error.message);
  //   }
  // }
}));

// Initialize user state based on authentication state
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ user: session?.user });
});

export { useAuthStore };
