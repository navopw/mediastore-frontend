import create from "zustand";

/**
 * Documentation: https://github.com/pmndrs/zustand
 */
const useStore: any = create((set: Function) => ({
	number: 0,
	increaseNumber: () => set((state: any) => ({ number: state.number + 1 })),
	resetNumber: () => set({ number: 0 }),
}));

export { useStore };
