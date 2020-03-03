# BackEnd

BASE URL: https://reddit-sub-predictor.herokuapp.com/

# ENDPOINTS 

(1) URL SUFFIX: /api/auth/register

Goal: Register a new user

- Method(s): POST 

- Requires: 
    - A reqest body with the following information:
        username (a unique, required string)
        password (required string)
    
NOTE: If you do not pass both properties the request will not work

- Sends back to client: N/A

(2) URL SUFFIX: /api/auth/login

Goal: Log a user in and grant permissions to access restricted information/pages

- Method(s): POST

- Requires:
    - A request body with the following information:
        username (a unique, required string)
        password (required string)


NOTE: If you do not pass both properties the request will not work

- Sends back to client: a json web token in the request headers (req.headers). This token must be stored somewhere on the front-end. The token will remain valid for 8 hours as of now. If the token is not stored than the user would have to re-login for every page they attempt to access that is restricted.

****** ENDPOINTS 3-4 require the token and user id to be stored on the front-end ******


(3) URL SUFFIX: /api/user/:id

Methods: GET, POST

GET:

- Requires:
    - A request with an id (in request params/url)

- Sends back to Client: A list of user posts if any exist.

POST:

- Requires:
    - A new post in the request body (most contain values for the properties post_title and post_text; the other properties are handled by the server)
    - A request with an id (in request params/url)

- Sends back to client: 
    - the id of the new post
    - A success message

(4) URL SUFFIX: /api/user/:id/post/:post_id

Methods: GET, PUT, DELETE

GET:

- Requires:
    - request params for: (1) user id, (2) post id

- Sends back to Client: 
    The post what corresponds to the post id

PUT:

- Requires:
    - request params for: (1) user id, (2) post id
    - The updated post content in the request body

- Sends back to client: 
    - a number: 1 indicates success

DELETE:

- Requires:
    - request params for: (1) user id, (2) post id

- Sends back to client: 
    - A success message
