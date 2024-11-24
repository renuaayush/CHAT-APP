import {create} from"zustand"
import { axiosinstance } from "../lib/axios"
import toast from "react-hot-toast";
import {io } from "socket.io-client"



const BASE_URL  =import.meta.env.MODE === "development"? "http://localhost:5001" :"/"

export const useAuthStore = create((set,get) =>({
    authUser : null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    ischeckingAuth:true,
    onlineUsers : [],
    socket:null,


    checkAuth:async ()=> {
            try {
                const res = await axiosinstance.get("/auth/check");

                set ({authUser:res.data}) 
                get().connectSocket() 

            } catch (error) {
                set ({authUser:null})
                console.log("error in checkauth" , error.message)  
            }finally{
                set({ischeckingAuth:false})
            }
        },

    // signup: async (data)=>{
    //     set({ isSigningUp: true})
    //     try {
    //         const res  = await axiosinstance.post("/auth/signup",data);
    //         set({authUser:res.data})
    //         toast.success("Account created Successfully")
            
    //     } catch (error) {
    //         toast.error(error.response.data.message)
            
    //     }finally{
    //         set({isSigningUp:false})
    //     }

    // }


    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosinstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created Successfully");
          get().connectSocket()
        } catch (error) {
          console.log("Error during signup:", error); // Debugging the error
          if (error.response) {
            toast.error(error.response.data.message); // Display server-side error message
          } else {
            toast.error("An unexpected error occurred");
          }
        } finally {
          set({ isSigningUp: false });
        }
      },


      logout: async()=>{
        try {

            await axiosinstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message) 
        }
        
      },


      login: async(data) =>{
        set({isLoggingIn:true})
        try {
            const res = await axiosinstance.post("/auth/login",data);
            set({authUser: res.data})
            toast.success("Logged in successfully")

            get().connectSocket()
            window.location.reload();


        } catch (error) {
            toast.error(error.response.data.message) 
            
        }finally{
            set({isLoggingIn:false})
        }
      },

      // updateProfile: async (data)=>{
      //   set({ isUpdatingProfile: true });

      //   try {
      //     const res = await axiosinstance.put("/auth/update-profile", data);
      //     set({ authUser: res.data });
      //     toast.success("Profile updated successfully");
      //   } catch (error) {
      //     console.log("error in update profile:", error);
      //     toast.error(error.response.data.message);
      //   } finally {
      //     set({ isUpdatingProfile: false });
      //   }

      // }


      // updateProfile: async (data) => {
      //   set({ isUpdatingProfile: true });
      //   try {
      //     // Assuming you want to send `profilePic` or other data to update the profile
      //     const res = await axiosinstance.put("/auth/update-profile", data);
      //     set({ authUser: res.data }); // Update the user in state
      //     toast.success("Profile updated successfully");
      //   } catch (error) {
      //     // Add more robust error handling
      //     console.log("Error updating profile:", error);
      
      //     if (error.response) {
      //       // Server error (e.g., validation or authentication failure)
      //       toast.error(error.response.data.message || "Error updating profile");
      //     } else if (error.request) {
      //       // No response was received
      //       toast.error("Network error. Please try again.");
      //     } else {
      //       // Error setting up the request
      //       toast.error("An unexpected error occurred.");
      //     }
      //   } finally {
      //     set({ isUpdatingProfile: false });
      //   }
      // }


      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosinstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);  // Debugging
            if (error.response) {
                toast.error(error.response.data.message || "Error updating profile");
            } else if (error.request) {
                toast.error("Network error. Please try again.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () =>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, { query: { userid: authUser._id } });

        socket.connect();

        set({socket:socket})

        socket.on("getonlineusers",(usersids)=>{
            set({onlineUsers: usersids})
        })
    },
    disconnectSocket: () =>{
        if(get().socket?.connected)
             get().socket.disconnect()
    }
    

      



}))