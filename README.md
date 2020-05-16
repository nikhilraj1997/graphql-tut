# Learning GraphQL

This repository exists for anyone who wants to have a basic GraphQL project as a guide for learning purposes. The backend uses ExpressJs with GraphQl for and React.js to serve its purposes.

I do have to state the fact that this project consists of both the backend and the frontend (yes, I am aware that it should not be done for a lot of reasons but this was not a production level thing anyways and no, I am not a crazy person). 

> **NOTE**: I used the publically available [tutorial series of GraphQL](https://www.youtube.com/playlist?list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_) by [Academind on YouTube](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w)


#### Setting up

This is pretty obvious but for just as a refresher

```
npm install // in project root for installing dependencies for the backend
cd frontend
npm install // to install dependencies for frontend
```

#### Starting the services

```
npm start // backend should start on port 8000
cd frontend
npm start // frontend should start on port 3000
```

#### Future Plans

- I hope to add Apollo Sever and Client pretty soon which should help speed up the entire thing
- The project also uses DataLoader but it has mixed feelings from the entire developer community, do that might be removed