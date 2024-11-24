import {create}from "zustand"
import {axiosinstance} from "../lib/axios"
import toast from "react-hot-toast"
import {useAuthStore} from "./useAuthstore"

export const useChatStore = create((set,get) =>({
    messages:[],
    users: [],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,




    getusers: async ()=>{
        set({isUsersLoading:true})
        try {
            const res = await axiosinstance.get("/message/users")
            set({users:res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }finally{
            set({isUsersLoading:false})
        }
    },

    getmessages : async(userid) =>{
        set({isMessagesLoading:true})

        try {
            const res = await axiosinstance.get(`/message/${userid}`)
            set({messages:res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }finally{
            set({isMessagesLoading:false})

        }
    },
    sendMessage: async(messageData)=>{
        const{selectedUser,messages} = get()
        try {
            const res = await axiosinstance.post(`/message/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }

    },
    subscribeToMessages: () =>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;


        socket.on("newMessage",(newMessage) =>{
            if(newMessage.senderid !== selectedUser._id) return
            set({
                messages:[...get().messages , newMessage],
            })
        })


    },
    unsubscribeToMessages:() =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")

    },




    setSelectedUser: async (selectedUser) =>set({selectedUser}),




}))










