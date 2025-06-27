import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiRoutes() {
    return {
      title: "🛍️ E-Commerce API Documentation",
      version: "1.0.0",
      description: "Welcome to our comprehensive e-commerce API",
      baseUrl: process.env.BASE_URL || "http://localhost:8080",
      routes: {
        authentication: {
          title: "🔐 Authentication",
          description: "User authentication and authorization endpoints",
          endpoints: [
            {
              method: "POST",
              path: "/auth/sign_up",
              description: "Register a new user account",
              body: {
                email: "user@example.com",
                password: "password123",
                name: "John Doe"
              }
            },
            {
              method: "POST",
              path: "/auth/sign_in",
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
          title: "📂 Category",
          description: "Product categories management",
          endpoints: [
            {
              method: "GET",
              path: "/category",
              description: "Get all product categories"
            },
            {
              method: "POST",
              path: "/category",
              description: "Create a new category",
              auth: "Admin Token Required",
              body: {
                name: "Electronics",
                description: "Electronic devices and accessories"
              }
            },
            {
              method: "PUT",
              path: "/category/:id",
              description: "Update category",
              auth: "Admin Token Required",
              params: { id: "Category ID" }
            },
            {
              method: "DELETE",
              path: "/category/:id",
              description: "Delete category",
              auth: "Admin Token Required",
              params: { id: "Category ID" }
            }
          ]
        },
        products: {
          title: "🛒 Products Management",
          description: "Product catalog and management endpoints",
          endpoints: [
            {
              method: "POST",
              path: "/products/create",
              description: "Create a new product",
              auth: "Admin Token Required",
              body: {
                title: "Casual T-Shirt",
                price: 199,
                cat_prefix: "684a04ee75ff1f474e1a2b86",
                img: "https://images.pexels.com/photos/1468372/pexels-photo-1468372.jpeg",
                max: 4,
                owner: "684c645fd216bfe3cab3eed8"
              }
            },
            {
              method: "GET",
              path: "/products",
              description: "Get all products",
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/products/:id",
              description: "Get a specific product by ID",
              params: { id: "Product ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/products/owner/:owner",
              description: "Get all products by owner/seller",
              params: { owner: "Owner/User ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/products/category/:cat_prefix",
              description: "Get all products in a specific category",
              params: { cat_prefix: "Category ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/products/search/:title",
              description: "Search products by title",
              params: { title: "Product title or keyword" },
              auth: "No authentication required"
            }
          ]
        },
          cart: {
          title: "🛒 Cart Management",
          description: "Shopping cart operations",
          endpoints: [
            {
              method: "GET",
              path: "/cart",
              description: "Get all carts",
              auth: "Admin Token Required",
            },
            {
               method: "GET",
              path: "/cart/:ownerId",
              description: "Get cart by owner ID",
              params: { ownerId: "Owner ID" },
              auth: "No authentication required"
            },
            {
              method: "POST",
              path: "/cart/add",
              description: "Add a product to the cart",
              auth: "No authentication required",
              body: {
                productId: "Product ID",
                quantity: 1
              }
            },
            {
              method: "DELETE",
              path: "/cart/delete/:id",
              description: "Delete a cart by ID",
              params: { id: "Cart ID" },
              auth: "No authentication required"
            },
            {
              method: "PUT",
              path: "/cart/update",
              description: "Update a cart",
              auth: "No authentication required",
            },
            {
              method: "GET",
              path: "/cart/getByOwner/:ownerId",
              description: "Get cart by owner ID",
              params: { ownerId: "Owner ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/cart/getByProduct/:productId",
              description: "Get cart by product ID",
              params: { productId: "Product ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/cart/getByOwnerAndProduct/:ownerId/:productId",
              description: "Get cart by owner ID and product ID",
              params: { ownerId: "Owner ID", productId: "Product ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/cart/getByOwnerAndProduct/:ownerId/:productId",
              description: "Get cart by owner ID and product ID",
              params: { ownerId: "Owner ID", productId: "Product ID" },
              auth: "No authentication required"
            },
            {
              method: "GET",
              path: "/cart/getByOwnerAndProduct/:ownerId/:productId",
              description: "Get cart by owner ID and product ID",
              params: { ownerId: "Owner ID", productId: "Product ID" },
              auth: "No authentication required"
      },
          ]
        },
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
