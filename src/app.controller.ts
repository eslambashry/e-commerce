import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiDocs(@Res() res: Response) {
    const apiData = this.appService.getApiRoutes();
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${apiData.title}</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .header {
                text-align: center;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                margin-bottom: 30px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .header h1 {
                font-size: 3rem;
                margin-bottom: 10px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .header p {
                font-size: 1.2rem;
                color: #666;
                margin-bottom: 20px;
            }
            
            .status-bar {
                display: flex;
                justify-content: center;
                gap: 30px;
                flex-wrap: wrap;
            }
            
            .status-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
            }
            
            .routes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 30px;
                margin-bottom: 30px;
            }
            
            .route-section {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .route-section:hover {
                transform: translateY(-5px);
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
            }
            
            .route-section h2 {
                font-size: 1.8rem;
                margin-bottom: 10px;
                color: #333;
            }
            
            .route-section p {
                color: #666;
                margin-bottom: 25px;
                font-size: 1rem;
            }
            
            .endpoint {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
                border-left: 4px solid #667eea;
                transition: all 0.3s ease;
            }
            
            .endpoint:hover {
                background: #e9ecef;
                transform: translateX(5px);
            }
            
            .method {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 0.8rem;
                margin-right: 10px;
                text-transform: uppercase;
            }
            
            .method.get { background: #28a745; color: white; }
            .method.post { background: #007bff; color: white; }
            .method.put { background: #ffc107; color: #333; }
            .method.delete { background: #dc3545; color: white; }
            
            .path {
                font-family: 'Courier New', monospace;
                font-weight: bold;
                font-size: 1.1rem;
                color: #333;
            }
            
            .description {
                margin: 10px 0;
                color: #666;
            }
            
            .auth-required {
                background: #fff3cd;
                color: #856404;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                display: inline-block;
                margin: 5px 0;
            }
            
            .code-block {
                background: #2d3748;
                color: #e2e8f0;
                padding: 15px;
                border-radius: 8px;
                margin: 10px 0;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                overflow-x: auto;
            }
            
            .footer {
                text-align: center;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .footer h3 {
                margin-bottom: 15px;
                color: #333;
            }
            
            .base-url {
                background: #e9ecef;
                padding: 10px 20px;
                border-radius: 25px;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                display: inline-block;
                margin: 10px 0;
            }
            
            @media (max-width: 768px) {
                .container { padding: 10px; }
                .header h1 { font-size: 2rem; }
                .routes-grid { grid-template-columns: 1fr; }
                .status-bar { flex-direction: column; align-items: center; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${apiData.title}</h1>
                <p>${apiData.description}</p>
                <div class="status-bar">
                    <div class="status-item">
                        <i class="fas fa-server"></i>
                        <span>Server: ${apiData.status.server}</span>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-database"></i>
                        <span>Database: ${apiData.status.database}</span>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-code-branch"></i>
                        <span>Version: ${apiData.version}</span>
                    </div>
                </div>
            </div>
            
            <div class="routes-grid">
                ${Object.entries(apiData.routes).map(([key, section]: [string, any]) => `
                    <div class="route-section">
                        <h2>${section.title}</h2>
                        <p>${section.description}</p>
                        ${section.endpoints.map((endpoint: any) => `
                            <div class="endpoint">
                                <div>
                                    <span class="method ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
                                    <span class="path">${endpoint.path}</span>
                                </div>
                                <div class="description">${endpoint.description}</div>
                                ${endpoint.auth ? `<div class="auth-required"><i class="fas fa-lock"></i> ${endpoint.auth}</div>` : ''}
                                ${endpoint.body ? `<div class="code-block">${JSON.stringify(endpoint.body, null, 2)}</div>` : ''}
                                ${endpoint.params ? `<div class="code-block">Params: ${JSON.stringify(endpoint.params, null, 2)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            
            <div class="footer">
                <h3><i class="fas fa-link"></i> Base URL</h3>
                <div class="base-url">${apiData.baseUrl}</div>
                <p style="margin-top: 20px; color: #666;">
                    <i class="fas fa-clock"></i> Last Updated: ${new Date(apiData.status.lastUpdated).toLocaleString()}
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api')
  getApiJson() {
    return this.appService.getApiRoutes();
  }
}
