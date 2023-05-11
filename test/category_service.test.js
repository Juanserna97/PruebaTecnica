const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const categoriesService = require('../src/services/category_service');
const categoriesSchema = require('../src/database/schemas/category_schema');
const mongoose = require('mongoose');
const assert = require('assert');


describe('Categories Service', () => {
    describe('insertCategory', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should save a new category to the database', async () => {
            // Arrange
            const params = {
                name: 'Category 1',
                description: 'Description'
            };
            const category = new categoriesSchema(params);
            const saveSpy = sinon.stub(categoriesSchema.prototype, 'save').resolves(category);

            // Act
            await categoriesService.insertCategory(params);

            // Assert
            assert(saveSpy.calledOnce);
            saveSpy.restore();
        });

        it('should throw an error when category is invalid', async () => {
            sinon.stub(categoriesSchema.prototype, 'validateSync').returns(new Error('Validation error'));

            await expect(categoriesService.insertCategory({ name: 'Category 2', description: 'Description'})).to.be.rejectedWith(Error, 'Validation error');
        });
    });


    describe('updateCategory', () => {
        it('should update an existing category in the database', async () => {
          // Arrange
          const categoryId = '6154a4aa4cb9ac25dfdeea4c';
          const update = {
            name: 'Updated Category',
            description: 'New Description',
          };
          const category = {
            _id: categoryId,
            name: 'Category 1',
            description: 'Description',
            validateSync: sinon.stub(),
            save: sinon.stub(),
          };
          const findByIdAndUpdateStub = sinon.stub(categoriesSchema, 'findByIdAndUpdate').resolves(category);
    
          // Act
          const updatedCategory = await categoriesService.updateCategory(categoryId, update);
    
          // Assert
          assert(findByIdAndUpdateStub.calledOnceWith(categoryId, update, { new: true, runValidators: true }));
          assert.deepStrictEqual(updatedCategory, category);
          findByIdAndUpdateStub.restore();
        });
    
        it('should throw an error when trying to update a non-existent category', async () => {
          // Arrange
          const categoryId = 'nonExistentCategoryId';
          const update = {
            name: 'Updated Category',
            description: 'New Description',
          };
          const findByIdAndUpdateStub = sinon.stub(categoriesSchema, 'findByIdAndUpdate').resolves(null);
    
          // Act and Assert
          await assert.rejects(categoriesService.updateCategory(categoryId, update), Error('category not found'));
          assert(findByIdAndUpdateStub.calledOnceWith(categoryId, update, { new: true, runValidators: true }));
          findByIdAndUpdateStub.restore();
        });
      });

    describe('deleteCategory', () => {
        it('should delete category and log when it exists', async () => {
            const deletedCount = 1;
            sinon.stub(categoriesSchema, 'deleteOne').returns({ deletedCount });

            const logSpy = sinon.spy(console, 'log');

            await categoriesService.deleteCategory('1');

            expect(deletedCount).to.equal(1);
            expect(logSpy.calledWith('Category deleted from database')).to.be.true;

            sinon.restore();
        });

        it('should log not found when category does not exist', async () => {
            const deletedCount = 0;
            sinon.stub(categoriesSchema, 'deleteOne').returns({ deletedCount });

            const logSpy = sinon.spy(console, 'log');

            await categoriesService.deleteCategory('1');

            expect(deletedCount).to.equal(0);
            expect(logSpy.calledWith('Category not found in database')).to.be.true;

            sinon.restore();
        });
    });
    describe('getAllCategories', () => {
        it('should return all categories', async () => {
          const categories = [      { name: 'Category 1' },      { name: 'Category 2' },    ];
          const findStub = sinon.stub(categoriesSchema, 'find').resolves(categories);
      
          const result = await categoriesService.getAllCategories();
      
          assert.deepStrictEqual(result, categories);
          findStub.restore();
        });
      });
});