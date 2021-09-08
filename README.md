# Welcome to my Web App


## Created by Emre Rauhofer

### Instructions for the API


1. Registring a user

To register a user post to the url `/register/user`.

To register an admin post to the url `/register/admin`.

The class that contains information about the user looks like this.

```
{
	"nickname": "username",
	"name": "Max",
	"surname": "Musterman",
	"age": 22,
	"email": "test@gmail.com",
	"password": "12341234"
}
```


2. Login 

To Login post to the url `/auth/login`.

The logininformation has to look like this:

```
{
  "username":"username",
  "password": "12341234"
}
```


This also returns a JSOn webtoken that is required for further actions!

3. Current User Information 

To Get Information about the current user the url `/username`.

Don't forget to also send the JWT!

To Change your Information post to the url `/username`.

The class to change the users information looks like this:
```
{
  	"newInfo": {
		"nickname": "username",
		"name": "Max",
		"surname": "Musterman",
		"age": 22,
		"email": "newMail@gmail.com",
		"password": "12341234"
	},
	"oldInfo": {
		"nickname": "username",
		"name": "Max",
		"surname": "Musterman",
		"age": 22,
		"email": "test@gmail.com",
		"password": "12341234"
	}
}
```


Lastly to change the profile picture the user has to be an admin.

This is done by posting to the url `/username/profilePic`.

To post the image the user has to post a multipart file with the key `file`.

To see the picture just get the url `username/profilePic`.