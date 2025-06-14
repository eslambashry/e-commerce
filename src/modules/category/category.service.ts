import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '../../core/schemas/category';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async getCategories(){
        console.log("Fetching all categories");
        
        const categories = await this.categoryModel.find();
        if (!categories || categories.length === 0) {
            throw new HttpException('No categories found',HttpStatus.NOT_FOUND);
        }
        return categories;
    }
    
    async getCategoryById(id: string){
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }   
        return category;
        }

    async createCategory(categoryData: CreateCategoryDto){
        const existingCategory = await this.categoryModel.findOne({ title: categoryData.title });
        if (existingCategory) {
            throw new HttpException('Category already exists', HttpStatus.CONFLICT);
        }
        const newCategory = new this.categoryModel(categoryData);
        const savedCategory = await newCategory.save();
        if (!savedCategory) {
            throw new HttpException('Failed to create category', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return savedCategory;
    }

    async updateCategory(id: string, categoryData: CreateCategoryDto){
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, categoryData, { new: true });
        if (!updatedCategory) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }   
        return updatedCategory;
    }

    async deleteCategory(id: string): Promise<string> {
        const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return 'Category deleted successfully';
    }
}
