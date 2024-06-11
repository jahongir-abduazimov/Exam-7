import request from "../config";
import { Request } from "@interfaces";

export const auth: Request = {
  sign_in: (data) => request.post("/auth/sign-in", data),
  sign_up: (data) => request.post("/auth/admin/sign-up", data),
  get_admin: (id) => request.get(`/admin/${id}`),
  update_admin: (id, data) => request.patch(`/admin/${id}`, data),
  delete_admin: (id) => request.delete(`/admin/${id}`),
};
