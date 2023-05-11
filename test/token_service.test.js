const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const { getToken } = require('../src/services/token_service');
const jwt = require('jsonwebtoken');

chai.use(chaiAsPromised);

describe('getToken', () => {
  it('should return a valid token', async () => {
    const token = await getToken();
    expect(token).to.be.a('string');
    expect(token.split('.').length).to.equal(3);
  });

  it('should throw an error if an error occurs while generating the token', async () => {
    // Simulamos un error al generar el token
    jwt.sign = () => {
      throw new Error('Error generating token');
    };
    await expect(getToken()).to.be.rejectedWith('Error generating token');
  });
});
