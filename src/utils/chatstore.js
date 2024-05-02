import create from "zustand";

const useChatStore = create((set) => ({
  chats: [],
  id:null,
  setChat:(chat)=>set({ chats: messages }),
  addChat: (message) => set((state) => ({ chats: [...state.chats, message] })),
  clearChats: () => set({ chats: [] }),
  setId: (id) => set({ id: id }),
}));

export default useChatStore;
