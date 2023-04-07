# Nextjs. Open Jira APP

### Para correr localmente, se necesita la base de datos

```
    docker-compose up -d
```

* El -d, significa __detached__

### Local MongoDB URL connection

```
    mongodb://localhost:27017/entriesdb
```

#### Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__ con sus respectivos valores

#### Llenar la base de datos con informacion inicial

Llamar a:

```
    http://localhost:3000/api/seed
```
