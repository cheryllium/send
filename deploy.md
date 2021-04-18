# Deployment

## 1. Grab the prod image:
```
docker login registry.gitlab.com
docker pull registry.gitlab.com/cheryllium/docker-images/cheryllium-send-prod
docker tag registry.gitlab.com/cheryllium/docker-images/cheryllium-send-prod cheryllium-send
```

## 2. Create the .env file (if it doesn't already exist):
```
echo "REDIS_HOST=redis" > .docker.env
```

## 3. Create the network (if it doesn't already exist):
```
docker network create prod-net
```

## 4. Run Redis:
```
docker run -d --net prod-net --name redis redis
```

## 5. Run the application:
```
docker run -d --env-file=.docker.env --net prod-net -p 1443:80 --name cheryllium-send cheryllium-send
```
