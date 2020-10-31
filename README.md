# spacevolcanoes-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Production deploy

### Build container
```
docker build -t receiptanalysis/frontend .
echo $DOCKER_PASS | docker login -u$DOCKER_USER --password-stdin
docker push receiptanalysis/frontend
docker logout
```

### Update in production env
```
docker pull receiptanalysis/frontend
docker stop analysis-frontend && docker rm analysis-frontend && docker-compose -f docker-compose.frontend.yml up -d frontend
```
