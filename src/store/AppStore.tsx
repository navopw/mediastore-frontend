import create from "zustand";

/**
 * Documentation: https://github.com/pmndrs/zustand
 */
const useStore: any = create((set: Function) => ({
	user: null,
	token: null,

	setUser: (user: any) => set({ user }),
	setToken: (token: any) => set({ token }),
}));

export { useStore };
