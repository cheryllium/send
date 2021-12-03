This repository was moved to private gitlab.

-------------------

# send

Old README is located at: README_original.md

## Development

Create a `.docker.env.dev` file containing the environment variables that you'd like to configure for running the app. You can see the `.docker.env.example` file for all the available environment variables, or server/config.js for defaults and descriptions.

Build the NodeJS docker image. You only need to run this once. You will need to rebuild this only if `Dockerfile.dev` changes.

```
docker build -f Dockerfile.dev -t firefox-send .
```

Run the server:

```
docker run -it --env-file .docker.env.dev -v $PWD:/app -p 4001:4001 firefox-send
```

Optionally add `-d` flag to run in the background.

## Deployment

To build a docker image for deployment, do this: 

```
docker build -f Dockerfile -t cheryllium-send-prod:latest .
docker push registry.gitlab.com/cheryllium/docker-images/cheryllium-send-prod
docker tag cheryllium-send-prod:latest registry.gitlab.com/cheryllium/docker-images/cheryllium-send-prod
```

To get it on the server, see deploy.md 
