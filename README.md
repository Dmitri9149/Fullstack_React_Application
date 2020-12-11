Node (CRUDE) backend server for frontend  
React project 'Phonebook': https://github.com/Dmitri9149/React-applications/tree/master/phonebook 

From the root: ```npm start dev```

The page will reload if you make edits. (nodemon is used)  

The project is in progress, the current stage :

- return JSON of persons , request to http://localhost:3001/api/persons
- request to http://localhost:3001/info -> some info
- http://localhost:3001 -> general greeting
- http://localhost:3001/api/persons -> POST a new person 
(same name or no name/number -> error )
- http://localhost:3001/api/persons/id -> delete a person by id



The fullstack (front ..backend) will be placed to Heroku and DockerHub. 

The fullstack of the front..backend will be Dockerized and used with automatic deployments to DockerHub.

The target is to develop components of FullStack application (frontend + backend) and test different configurations of deployment to web (Heroku and DockerHub) and AUTOMATICAL  deployment to (Heroku and DockerHub) (Docker Compose, Docker inside Docker techniques, 
GitHub Actions and CircleCI tools).

The front..backend approximatelly correspond to the projects to be developed in the course : [Deep Dive Into Modern Web Development; 
Full Stack open 2020](https://fullstackopen.com/en/#course-contents) of Helsinki University




