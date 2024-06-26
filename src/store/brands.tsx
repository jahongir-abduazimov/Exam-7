import { create } from "zustand";
import { BrandStore } from "@interfaces";
import { brands } from "@services";
import Notification from "@notification";

const useBrandsStore = create<BrandStore>((set) => ({
  brand: [],
  isLoading: false,
  totalCount: 1,
  getBrands: async (params) => {
    set({ isLoading: true });
    try {
      const response = await brands.get_brands(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.data.count),
          brand: response.data.data.brands,
        });
      }
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  getBrandsByCategory: async (id) => {
    try {
      const response = await brands.get_brands_by_category(id);
      return response;
    } catch (error: any) {
      Notification({
        title: error.message,
        type: "error",
      });
    }
  },
  createBrand: async (data) => {
    try {
      const response = await brands.create_brand(data);
      if (response.status === 201) {
        set((state) => ({
          brand: [...state.brand, response.data.data],
        }));
        Notification({
          title: response.data.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      Notification({
        title: error.response.data.message,
        type: "error",
      });
    }
  },
  deleteBrand: async (id) => {
    try {
      const response = await brands.delete_brand(id);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          brand: state.brand.filter((item: any) => item.id != id),
        }));
      }
      return response;
    } catch (error: any) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
  updateBrand: async (id, data) => {
    try {
      const response = await brands.update_brand(id, data);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        });
        set((state) => ({
          brand: state.brand.map((item: any) =>
            item.id === id ? response.data.data : item
          ),
        }));
      }
      return response;
    } catch (error: any) {
      Notification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  },
}));

export default useBrandsStore;
