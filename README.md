This is a simple website for adopting a cat/dog or putting a cat/dog for adoption


A few notes about the behaviour of this website:

Regarding login/logout: if a user logs in for the first time, their credentials are automatically written to file and a session is created. There is no need to login again.

Regarding sessions when having a pet to give away: the server verifies if there is a session. If there's not, then the server redirects to the login page. However, if the user is already logged in, they can directly submit their pet.

Regarding search criteria: when it comes to compatibility, non restrictive search was in mind. This means a search (for example) with only "good with other dogs" could have a pet that is "good with other dogs" and other compatibility criteria also valid.

When submitting a form on "Have a pet to give away", the redirect is that very page. This is intended, this is not a bug. This is to allow the user to input multiple pets in a row without having to select the page every time.

Every interactive page is done through .ejs files.
