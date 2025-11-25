import axios from "axios";

export const HomeService = {
  async getProducts() {
    const resp = await axios.get("/products?limit=12");
    return resp.data;
  },

  async getCategories() {
    const resp = await axios.get("/categories");
    return resp.data;
  }
};
