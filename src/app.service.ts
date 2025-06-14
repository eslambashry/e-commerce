import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiRoutes() {
    return {
      title: "🛍️ E-Commerce API Documentation",
      version: "1.0.0",
      description: "Welcome to our comprehensive e-commerce API",
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
      routes: {
        authentication: {
          title: "🔐 Authentication",
          description: "User authentication and authorization endpoints",
          endpoints: [
            {
              method: "POST",
              path: "/auth/signup",
              description: "Register a new user account",
              body: {
                email: "user@example.com",
                password: "password123",
                name: "John Doe"
              }
            },
            {
              method: "POST", 
              path: "/auth/signin",
              description: "Login with existing credentials",
              body: {
                email: "user@example.com",
                password: "password123"
              }
            }
          ]
        },
        users: {
          title: "👥 Users Management",
          description: "User profile and management endpoints",
          endpoints: [
            {
              method: "GET",
              path: "/users",
              description: "Get all users (Admin only)",
              auth: "Bearer Token Required"
            },
            {
              method: "PUT",
              path: "/users/:id",
              description: "Update user profile",
              auth: "Bearer Token Required",
              params: { id: "User ID" },
              body: {
                name: "Updated Name",
                email: "updated@example.com"
              }
            }
          ]
        },
        categories: {
          title: "📂 Categories",
          description: "Product categories management",
          endpoints: [
            {
              method: "GET",
              path: "/categories",
              description: "Get all product categories"
            },
            {
              method: "POST",
              path: "/categories",
              description: "Create a new category",
              auth: "Admin Token Required",
              body: {
                name: "Electronics",
                description: "Electronic devices and accessories"
              }
            },
            {
              method: "PUT",
              path: "/categories/:id",
              description: "Update category",
              auth: "Admin Token Required",
              params: { id: "Category ID" }
            },
            {
              method: "DELETE",
              path: "/categories/:id",
              description: "Delete category",
              auth: "Admin Token Required",
              params: { id: "Category ID" }
            }
          ]
        }
      },
      status: {
        server: "🟢 Online",
        database: "🟢 Connected",
        lastUpdated: new Date().toISOString()
      }
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
