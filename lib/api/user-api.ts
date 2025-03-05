"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { extractSupabaseSession } from "../utils";

// Configure base API
const API_URL =
  process.env.NEXT_PUBLIC_API_URL + "/api" || "http://localhost:3333/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth interceptor to include JWT token in requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    // Extract token from cookies
    const cookies = document.cookie.split(";");
    const token = extractSupabaseSession(cookies);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// User API endpoints
export const userApi = {
  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update user
  updateUser: async (userId: string, userData: any) => {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};
