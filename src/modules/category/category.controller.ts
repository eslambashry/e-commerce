import { Body, Controller, Get, Post,Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    // The controller can be extended with methods to handle requests related to categories.

    constructor(private _categoryService: CategoryService) {}

    @Get()
    getCategories() {
        console.log("YES");
        
        // This method would typically call a service to retrieve categories.
        return this._categoryService.getCategories();
    }

    @Post()
    createCategory(@Body() body: CreateCategoryDto) {
        // This method would typically call a service to create a new category.
        // You would pass the necessary data to the service method.
        return this._categoryService.createCategory(body);
    }

    @Get('/:id')
    getCategoryById(@Param('id') id: string) {
        // This method would typically call a service to retrieve a category by its ID.
        // You would pass the ID to the service method.
        return this._categoryService.getCategoryById(id);
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {
        // This method would typically call a service to delete a category by its ID.
        // You would pass the ID to the service method.
        return this._categoryService.deleteCategory(id);
    }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() body: CreateCategoryDto) {      
        // This method would typically call a service to update a category by its ID.
        // You would pass the ID and the updated data to the service method.
        return this._categoryService.updateCategory(id, body);
    }
    // For example, you could add methods for creating, updating, deleting, and retrieving categories.
    // Each method would typically use a service to interact with the database or perform business logic.

}
