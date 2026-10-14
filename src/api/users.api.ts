import api from "./axios";
import type { User } from "../types/user.types";

export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/users");
  return response.data;
}