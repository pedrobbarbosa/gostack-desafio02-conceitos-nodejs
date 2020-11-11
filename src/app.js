const express = require("express");
const cors = require("cors");
const { uuid, isUuid} = require('uuidv4');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params; 
  const {title, url, techs} = request.body;

  if (!isUuid(id)) {
    return response.status(400).json({
      error: `${id} is not valid`
    })
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Project was not found"})
  }

  // let repository = repositories[repositoryIndex];
  
  const repository = {
    id,
    title,
    url,
    techs,
  likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Project was not found"})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Project was not found"})
  }

  repository = repositories[repositoryIndex];

  repository.likes = repository.likes + 1;
  
  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
});

module.exports = app;
