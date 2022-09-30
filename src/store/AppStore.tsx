import create from "zustand";

/**
 * Documentation: https://github.com/pmndrs/zustand
 */
const useStore: any = create((set: Function) => ({
    totalMediaSize: 0,
    setTotalMediaSize: (size: number) => set({ totalMediaSize: size }),
}));

export { useStore };
