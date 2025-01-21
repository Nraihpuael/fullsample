
## Full-Stack Application Documentation

This project includes a backend built with Spring Boot and a frontend built with React (using Vite).


## Requirements

- ### FrontEnd:

- Node.js: v18.17
- Vite: v5.3.3
- npm: v10.2.4
- React, React DOM, React Router DOM
- React Hook Form
- Axios
- Zustand

- ### Backend:

- Java: 17
- Maven: v3.8+
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring WEB
- JWT
- Bean Validation

- ### General:

- PostgreSQL 15
- Docker
- Docker Compose


## Setup Instructions

1.- Ensure Docker and Docker Compose are installed on your system.
2.- Run the following command in a git bash to build and start the application:
	
	./run.sh

	'Just in case you need to give permissions: chmod +x run.sh  ' 
	
	The frontend will be available at http://localhost:3000 and the backend at http://localhost:8080/api
	
	Email: admin@example.com
	password: Aa12#

## Project Structure



	frontend/
	├── public/
	│   ├── vite.svg
	│   └── ...
	├── src/
	│   ├── assets/
	|   |   |── logo
	│   │   ├── images/
	│   ├── components/
	│   │   ├── Button.jsx
	│   │   └── ...
	│   ├── hooks/
	│   ├── lib/
	│   ├── pages/
	│   │   ├── Home.jsx
	│   │   └── ...
	│   ├── router/
	│   │   ├── AppRouter.jsx
	│   │   └── ...
	│   ├── services/
	│   ├── store/
	│   ├── styles/
	│   │   ├── base/
	│   │       │   ├── reset.css
	│   │       │   ├── variables.css
	│   │       │   └── ...
	│   │       ├── components/
	│   │       │   ├── Button.css
	│   │       │   └── ...
	│   │       ├── pages/
	│   │       │   ├── Home.css
	│   │       │   └── ...
	│   │       └── index.css
	│   ├── utils/
	│   ├── validations/
	│   └── main.jsx
	├── .gitignore
	├── Dockerfile
	├── package.json
	└── vite.config.js



	backend/
	├── src/
	│    ├── main/
	│    │   ├── java/
	│    │   │   └── com
	│    │   │       └── ensolvers
	│    │   │           └── backend
	│    │   │               ├── ServerApplication
	│    │   │               ├── application
	│    │	 │		 │   ├── dto  	    
	│    │   │               │   ├── mapper     
	│    │   │               │   └── service   
	│    │   │               ├── domanin
	│    │   │               │   ├── entity 	
	│    │   │               ├── infrastructure
	│    │   │               │   ├── config 		
	│    │   │               │   ├── security    
	│    │   │               │   └── exception 
	│    │   │               ├── persistence
	│    │   │               │   └── repository
	│    │   │               ├── presentation
	│    │   │               │   └── controller 
	│    │   │               └── DigicertApplication.java
	│    └── └── resources
	│           └── application.properties
	│
	├── Dockerfile
	├── mvnw
	├── mvnw.cmd
	└── pom.xml					
			



