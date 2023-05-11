const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsService = require('../src/services/product_service');
const productsSchema = require('../src/database/schemas/product_schema');
const mongoose = require('mongoose');
const assert = require('assert');


describe('Products Service', () => {
    describe('insertProduct', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should save a new product to the database', async () => {
            // Arrange
            const params = {
                name: 'Product 1',
                description: 'Description',
                price: 10,
                category: '645b063d65d306b01de1ff3b',
            };
            const img = { path: 'path/to/image.jpg' };
            const product = new productsSchema(params);
            const saveSpy = sinon.stub(productsSchema.prototype, 'save').resolves(product);

            // Act
            await productsService.insertProduct(params, img);

            // Assert
            assert(saveSpy.calledOnce);
            saveSpy.restore();
        });

        it('should throw an error when product is invalid', async () => {
            sinon.stub(productsSchema.prototype, 'validateSync').returns(new Error('Validation error'));

            await expect(productsService.insertProduct({ name: 'Product 2', description: 'Description', price: 'not a number', category: '1' }, { path: 'path/to/image.jpg' })).to.be.rejectedWith(Error, 'Validation error');
        });
    });


    describe('updateProduct', () => {
        afterEach(() => {
            sinon.restore();
        });
        it('should update an existing product in the database', async () => {
            // Arrange
            const productId = '645b14252fade85b06a7cee6';
            const update = {
              name: 'Updated Product',
              description: 'New Description',
              price: 20,
              category: '2',
            };
            const img = { path: 'path/to/image.jpg' };
            const updatedProduct = {
              _id: productId,
              name: update.name,
              description: update.description,
              price: update.price,
              category: update.category,
              image: img.path,
              validateSync: sinon.stub(),
              save: sinon.stub().resolves(),
            };
            const product = {
              _id: productId,
              name: 'Product 1',
              description: 'Description',
              price: 10,
              category: '1',
              image: 'path/to/image.jpg',
              validateSync: sinon.stub(),
              save: sinon.stub().resolves(updatedProduct),
            };
            const findByIdStub = sinon.stub(productsSchema, 'findById').resolves(product);
            
            // Act
            const result = await productsService.updateProduct(productId, update, img);
            
            // Assert
            assert(findByIdStub.calledOnceWith(productId));
            assert.deepStrictEqual(product.name, update.name);
            assert.deepStrictEqual(product.description, update.description);
            assert.deepStrictEqual(product.price, update.price);
            assert.deepStrictEqual(product.category, update.category);
            assert.deepStrictEqual(product.image, img.path);
            assert.deepStrictEqual(result, updatedProduct);
            findByIdStub.restore();
          });
          
          



        it('should throw an error when product does not exist', async () => {
            sinon.stub(productsSchema, 'findById').returns(null);
            await expect(productsService.updateProduct('1', { name: 'Product 1 updated', price: 20 }, { path: 'path/to/image.jpg' })).to.be.rejectedWith(Error, 'Product not found');
        });
    });

    describe('deleteProduct', () => {
        it('should delete product and log when it exists', async () => {
            const deletedCount = 1;
            sinon.stub(productsSchema, 'deleteOne').returns({ deletedCount });

            const logSpy = sinon.spy(console, 'log');

            await productsService.deleteProduct('1');

            expect(deletedCount).to.equal(1);
            expect(logSpy.calledWith('Product deleted from database')).to.be.true;

            sinon.restore();
        });

        it('should log not found when product does not exist', async () => {
            const deletedCount = 0;
            sinon.stub(productsSchema, 'deleteOne').returns({ deletedCount });

            const logSpy = sinon.spy(console, 'log');

            await productsService.deleteProduct('1');

            expect(deletedCount).to.equal(0);
            expect(logSpy.calledWith('Product not found in database')).to.be.true;

            sinon.restore();
        });
    });
    describe('getProductsByCategory', () => {
        it('should return products belonging to a category', async () => {
          // Arrange
          const categoryId = '1';
          const products = [
            {
              _id: '645b14252fade85b06a7cee6',
              name: 'Product 1',
              description: 'Description 1',
              price: 10,
              category: '1',
              image: 'path/to/image1.jpg',
            },
            {
              _id: '745b14252fade85b06a7cee7',
              name: 'Product 2',
              description: 'Description 2',
              price: 20,
              category: '1',
              image: 'path/to/image2.jpg',
            },
          ];
          const findStub = sinon.stub(productsSchema, 'find').resolves(products);
    
          // Act
          const result = await productsService.getProductsByCategory(categoryId);
    
          // Assert
          assert.deepStrictEqual(result, products);
          assert(findStub.calledOnceWith({ category: categoryId }));
          findStub.restore();
        });
      });
});