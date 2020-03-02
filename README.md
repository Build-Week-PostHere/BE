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
