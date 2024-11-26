import dotenv from 'dotenv';
import { expect, should } from 'chai';
import axios from 'axios';

// Load environment variables from .env.test
dotenv.config();

const baseURL = process.env.API_BASE_URL;

describe(' API should signup user ', () => {
    const firstName = "Test";
    const lastName = "User ";
    const email = `testuser${Date.now()}@gmail.com`; // Ensure unique email for each test
    const password = "password123";

    it("should register a user with valid data", async () => {
        try {
            const userdata = await axios.post(`${baseURL}/api/users/signup`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            //console.log('Userdata:', userdata.data);
            // Check that the response status is 201 Created
            expect(userdata.status).to.equal(201);
            // Check that the response contains the user data
            expect(userdata.data).to.include.all.keys('message', 'user');
            expect(userdata.data.user).to.include.all.keys('user_id', 'first_name', 'last_name', 'email');
            // Now, delete the user after the test
        const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
          data: { email } // Make sure to send the email in the request body
      });

      // Check that the response status is 200 OK
      expect(deleteResponse.status).to.equal(200);
      expect(deleteResponse.data).to.have.property('message').that.includes('deleted');
        } catch (error) {
            // Log the error response for debugging
            console.error('Error response:', error.response);
            throw error; // Re-throw the error to fail the test
        }         
    });
  });

  describe('API should sign in User', () => {
    const firstName = "Test";
    const lastName = "User ";
    const email = `testuserSignIn@gmail.com`; // Ensure unique email for each test
    const password = "password123";
     it('should sign in a user', async () => {
       
           await axios.post(`${baseURL}/api/users/signup`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
          
          try {
          const signinData = await axios.post(`${baseURL}/api/users/login`, {
            email,
            password,
            });
           
            // Check that the response status is 200 OK
            expect(signinData.status).to.equal(200);
            // Check that the response contains the user data
            expect(signinData.data).to.include.all.keys('message', 'user', 'token');
            //----
            //debug for user data
            //console.log('SigninData:', signinData.data);
            //----
            expect(signinData.data.user).to.include.all.keys( 'user_id',"first_name", "last_name");
            //delete testuser after test
           
            // Now, delete the user after the test
        const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
          data: { email } // Make sure to send the email in the request body
      });

      // Check that the response status is 200 OK
      expect(deleteResponse.status).to.equal(200);
      expect(deleteResponse.data).to.have.property('message').that.includes('deleted');
        
    } catch (error) {
            // Log the error response for debugging
            console.error('Error response:', error.response
            );
            throw error; // Re-throw the error to fail the test
            }
          
        });
     });    
describe(' API should not signup user with duplicate email', () => {
    it("should return 409 when email is already in use", async () => {
      
      const firstName = "Test";
      const lastName = "User ";
     const email = `testuserduplicate@gmail.com`; // Ensure unique email for each test
      const password = "password123";
      
      // First, register the user
      await axios.post(`${baseURL}/api/users/signup`, {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
      });

      // Now, try to register the same user again
      try {
          await axios.post(`${baseURL}/api/users/signup`, {
              first_name: firstName,
              last_name: lastName,
              email,
              password,
          });
          // If the request succeeds, fail the test
          expect.fail("Expected request to fail due to email conflict but it succeeded.");
      } catch (error) {
          // Check that the error status is 409 Conflict
          if (error.response) {
              expect(error.response.status).to.equal(409);
              expect(error.response.data).to.have.property('error').that.includes('Email already exists');
             
              // Now, delete the user after the test
        const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
          data: { email } // Make sure to send the email in the request body
      });

      // Check that the response status is 200 OK
      expect(deleteResponse.status).to.equal(200);
      expect(deleteResponse.data).to.have.property('message').that.includes('deleted');
            
            } else {
              console.error('Error:', error.message);
              expect.fail(`Request failed: ${error.message}`);
          }
        }
        
      });
    });

describe(' API should delete user', () => {
it("should delete a user account from the datbase", async () => {
    
  const firstName = "Test";
  const lastName = "User ";
 const email = `testuserdelete@gmail.com`; // Ensure unique email for each test
  const password = "password123";
  
  //create a user to be deleted after
  await axios.post(`${baseURL}/api/users/signup`, {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
});

// Now, try to delete the user
try {

// Now, delete the user after the test
const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
  data: { email } // Make sure to send the email in the request body
});

// Check that the response status is 200 OK
expect(deleteResponse.status).to.equal(200);
expect(deleteResponse.data).to.have.property('message').that.includes('deleted');

  // If the request succeeds, fail the test
  expect.fail("Expected request to fail due to email conflict but it succeeded.");
  } catch (error) {
    // Check that the error status is 404 Not Found
    if (error.response) {
      expect(error.response.status).to.equal(404);
      expect(error.response.data).to.have.property('error').that.includes('User not found');
    }
  }

  });

});