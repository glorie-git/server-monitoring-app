# server
Server service implemented using Spring Boot, Angular and Java in the IntelliJ IDE

Followed a tutorial by [Amigoscode](https://youtu.be/8ZPsZBcue50)

<img width="1440" alt="UI Image 1" src="https://user-images.githubusercontent.com/70677768/173446760-a77bfbb4-afc9-46db-af6e-143221400282.png">

The Server App is a web based that montiors your servers. 

## Functionality
- Add server
- Ping server
- Delete server
- Print report
- Sort servers

## How to run
You will need to run the Angular Live Development Server and Spring boot server

To run the Angular Live Development Server:
- Make sure you have Angular CLI installed (https://github.com/glorie-git/server/)
- From root directory run `cd serverapp`
- Run `npm install`
- Run `ng serve`

Spring boot server:
Before running Spring Boot make sure you have install MySQL locally.
- Navigate to root folder
- Run `./mvn spring-boot:run`
