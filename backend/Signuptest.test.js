import dotenv from 'dotenv';
import { expect, should } from 'chai';
import axios from 'axios';


// Load environment variables from .env.test
dotenv.config();

const baseURL = process.env.API_BASE_URL;

describe('API should signup user', () => {
  let token;
  let uniqueEmail;

  beforeEach(() => {
    // Generate a unique email for each test
    uniqueEmail = `testuser${Date.now()}@gmail.com`;
  });

  it("should register a user", async () => {
    try {
      // Step 1: Register a new user
      const signupResponse = await axios.post(`${baseURL}/api/users/signup`, {
        first_name: "Test",
        last_name: "User ",
        email: uniqueEmail, // Use the unique email
        password: "password123",
      });

      // Check that the response status is 201 Created
      expect(signupResponse.status).to.equal(201);
      expect(signupResponse.data).to.include.all.keys('message', 'user');
      expect(signupResponse.data.user).to.include.all.keys('user_id', 'first_name', 'last_name', 'email');

      // Step 2: Log in to get the access token
      const loginResponse = await axios.post(`${baseURL}/api/users/login`, {
        email: uniqueEmail,
        password: "password123",
      });

      // Check that the response status is 200 OK
      expect(loginResponse.status).to.equal(200);
      expect(loginResponse.data).to.include.all.keys('message', 'user', 'token');

      // Save the token to delete user after test
   
      token = loginResponse.data.token;

      // Now, delete the user after the test
      const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
        data: { email: uniqueEmail }, // Ensure you send the email in the request body
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authorization
        },
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

  // Add more tests as needed
});

  describe('API should sign in User', () => {
     let token;
    
    
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
            //get acces token from signinData
            token = signinData.data.token
            // Now, delete the user after the test
            const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
              data: { email }, // Ensure you send the email in the request body
              headers: {
                Authorization: `Bearer ${token}`, // Include the token for authorization
              },
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
    let token;
 
  
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
             
              // siugn in to get token
              const signinData = await axios.post(`${baseURL}/api/users/login`, {
                email,
                password,
                });
              //get token from database 
              token = signinData.data.token
              //delete testuser after test
              const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
                data: { email }, // Ensure you send the email in the request body
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token for authorization
                },  
                }) 
      // Check that the response status is 200 OK
      expect(deleteResponse.status).to.equal(200);
      expect(deleteResponse.data).to.have.property('message').that.includes('deleted');
            
            } else {
              console.error('Error:', error.message);
              expect.fail(`Request failed: ${error.message}`);
            }
          };
        });
      });
        
describe(' API should delete user', () => {

  let token;

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
  // First, log in to get the access token
  const signinData = await axios.post(`${baseURL}/api/users/login`, {
    email,
    password,
    });
    //get token from database
    token = signinData.data.token
    // Now, delete the user 
const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
  data: { email }, // Ensure you send the email in the request body
  headers: {
    Authorization: `Bearer ${token}`, // Include the token for authorization
  },
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

  //the test requires that you delete the user after the test manually from the database.

  //  sql command (delete from users where user_id >= 0;) to delete all users from the database


  describe(' API should sign out user', () => {

    let token;

    it("should sign out a user", async () => {

    const firstName = "Test";
    const lastName = "User ";
   const email = `testusersignout@gmail.com`; // Ensure unique email for each test
    const password = "password123";
    
    //create a user to be deleted after
    await axios.post(`${baseURL}/api/users/signup`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
  });
  

  try {
    // First, log in to get the access token
    const signinData = await axios.post(`${baseURL}/api/users/login`, {
      email,
      password,
      });
      //get token from database
      token = signinData.data.token

      //sign out user

     const response = await axios.post(`${baseURL}/api/users/logout`,{}, // No body needed
      {
          headers: { Authorization: `Bearer ${token}` },
      }
  );
  // Check that the response status is 200 OK
  expect(response.status).to.equal(200);
  expect(response.data).to.have.property('message').that.includes('logged out');


  //sign in user to get token for removing account from database
  const signinData2 = await axios.post(`${baseURL}/api/users/login`, {
    email,
    password,
    });
     //console.log('SigninData 2:', signinData2.data);
     //console.log('Login response:', signinData2.data); // Log login response
      
    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.data).to.include.all.keys('message', 'user', 'token');

    
    //get token from database
    token = signinData2.data.token
    //console.log('Access token received:', token); // Log access token

  //delete user after test
  const deleteResponse = await axios.delete(`${baseURL}/api/users/delete`, {
    data: { email }, // Ensure you send the email in the request body
    headers: {
      Authorization: `Bearer ${token}`, // Include the token for authorization
    },
  });

 // Check that the response status is 200 OK
 //console.log('Delete response:', deleteResponse.data); // Log delete response
 expect(deleteResponse.status).to.equal(200);
 expect(deleteResponse.data).to.have.property('message').that.includes('deleted');
  } catch (error) {
    // Check that the error status is 404 Not Found
    if (error.response) {
      expect(error.response.status).to.equal(404);
      expect(error.response.data).to.have.property('error').that.includes('User not found');
    } 
      // If the request fails, check that the error status is 400 Bad Request¨
    if (error.response) {
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('error').that.includes('Token not provided');
    } 
  }
    });
});

describe('API should have user post review', () => {
  let token;

  it("should post a review", async () => {
    // sign up user for reviews
    const firstName = "Test";
    const lastName = "User  ";
    const email = `testusereviews@gmail.com`; // Ensure unique email for each test
    const password = "password123";

    // Step 1: Sign up the user
    await axios.post(`${baseURL}/api/users/signup`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    // Step 2: Sign in the user to get the token
    const signinData = await axios.post(`${baseURL}/api/users/login`, {
      email,
      password,
    });

    // Get token from login response
    token = signinData.data.token;

    // Step 3: Post the review
    try {
      const reviewResponse = await axios.post(`${baseURL}/api/reviews/add`, {
        tmdb_id: 1, // Make sure this ID is valid
        review_text: "Great movie",
        rating: 5,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authorization
        },
      });

      // Log the actual response for debugging
      console.log('Review Response:', reviewResponse.data);

      // Check that the response status is 201 Created (or appropriate status)
      expect(reviewResponse.status).to.equal(201);
      
      // Update the expectations based on the actual response structure
      // Assuming the response only contains the review object
      expect(reviewResponse.data).to.have.property('review'); // Check for review key
      // If you need to check for specific properties in the review
      expect(reviewResponse.data.review).to.include.all.keys('review_id', 'tmdb_id', 'review_text', 'rating'); // Adjust as needed
    } catch (error) {
      // Log the error response for debugging
      console.error('Error posting review:', error.response);
      throw error; // Re-throw the error to fail the test
    }
  });
});

describe('API should have user update review', () => {
  let token;
  let reviewId;

  it("should update a review", async () => {
    const email = `testusereviews@gmail.com`; // Ensure unique email for each test
    const password = "password123";

    // Sign in the user to get the token
    const signinData = await axios.post(`${baseURL}/api/users/login`, {
      email,
      password,
    });

    // Get token from login response
    token = signinData.data.token;

    // Step 3: Post a review to update later
    const reviewResponse = await axios.post(`${baseURL}/api/reviews/add`, {
      tmdb_id: 1, // Ensure this ID is valid
      review_text: "Great movie",
      rating: 5,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
    });

    // Get the review ID from the response
    reviewId = reviewResponse.data.review.review_id;

    // Step 4: Update the review
    const updateResponse = await axios.put(`${baseURL}/api/reviews/${reviewId}`, {
      review_text: "Updated review text",
      rating: 4,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
    });

    // Check that the response status is 200 OK
    expect(updateResponse.status).to.equal(200);
    expect(updateResponse.data).to.have.property('review'); // Check for review key
    expect(updateResponse.data.review).to.include.all.keys('review_id', 'review_text', 'rating'); // Adjust as needed
  });
});



