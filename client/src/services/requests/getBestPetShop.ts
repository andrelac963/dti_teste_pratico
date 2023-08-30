import { api } from "../api";

export interface BestPetShopRequestType {
  date: string;
  smallDogs: number;
  bigDogs: number;
}

export interface BestPetShopResponseType {
  name: string;
  totalPrice: number;
}

export async function getBestPetShop(body: BestPetShopRequestType) {
  const response = await api.post("/petshop/best", body);
  return response.data as BestPetShopResponseType;
}