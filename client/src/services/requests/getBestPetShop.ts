import { api } from "../api";

export interface BestPetShopRequestType {
  Date: string;
  SmallDogs: number;
  BigDogs: number;
}

export interface BestPetShopResponseType {
  Name: string;
  Distance: number;
  TotalPrice: number;
}

export async function getBestPetShop(body: BestPetShopRequestType) {
  const response = await api.post("/PetShop/BestPetShop", body);
  return response.data as BestPetShopResponseType;
}