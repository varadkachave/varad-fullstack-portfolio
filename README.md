# Portfolio Website with Spring Boot and MySQL

This project is a deployable personal portfolio website built with:

- Spring Boot 3
- Thymeleaf
- Spring Data JPA
- MySQL
- Docker and Docker Compose

It includes a polished landing page, projects section, experience timeline, skills grid, and a contact form that stores submitted messages in MySQL.

## Features

- Responsive portfolio UI with a custom visual style
- MySQL-backed contact form
- Seeded starter profile, project, experience, and skill content
- Environment-based configuration for deployment
- Dockerfile and `docker-compose.yml` for local setup

## Project structure

- `src/main/java/com/portfolio/website` - controllers, services, entities, repositories
- `src/main/resources/templates/index.html` - Thymeleaf homepage
- `src/main/resources/static/css/site.css` - custom styling
- `src/main/resources/static/js/site.js` - mobile nav and scroll reveals

## Open in IntelliJ IDEA

1. Open IntelliJ IDEA.
2. Choose `Open` and select this folder:

```text
C:\Users\kacha\OneDrive\Documents\New project
```

3. If IntelliJ asks how to import it, choose `Open as Project` or open `pom.xml` as a Maven project.
4. Make sure the Project SDK is set to `Java 17`.
5. In the Maven tool window, click `Reload All Maven Projects` if dependencies do not appear automatically.
6. Run `PortfolioApplication` from:

```text
src/main/java/com/portfolio/website/PortfolioApplication.java
```

If IntelliJ opens the older static files first, ignore those root files and use the Maven project under `src/`. The real Spring Boot app starts from `pom.xml` and `src/main/java`.

## Run locally with MySQL

1. Create a MySQL database named `portfolio_db`, or let the app create it automatically.
2. Set environment variables if your MySQL credentials differ from the defaults:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/portfolio_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="root"
```

3. Start the app:

```powershell
.\mvnw.cmd spring-boot:run
```

4. Open [http://localhost:8080](http://localhost:8080)

The app also supports the simpler MySQL-style variables below, which is useful on platforms like Railway:

```powershell
$env:MYSQLHOST="localhost"
$env:MYSQLPORT="3306"
$env:MYSQLDATABASE="portfolio_db"
$env:MYSQLUSER="root"
$env:MYSQLPASSWORD="root"
```

## Run with Docker Compose

```bash
docker compose up --build
```

This starts:

- MySQL on port `3306`
- The Spring Boot app on port `8080`

## Build for deployment

```bash
.\mvnw.cmd clean package
```

The packaged jar will be created in `target/portfolio-site-0.0.1-SNAPSHOT.jar`.

## Deploy notes

- Set `SPRING_DATASOURCE_URL`
- Set `SPRING_DATASOURCE_USERNAME`
- Set `SPRING_DATASOURCE_PASSWORD`
- Set `PORT` if your hosting provider requires it

This setup is friendly for platforms like Render, Railway, or any VPS that can run Java 17 and connect to MySQL.

## Deploy on Railway

This repo is now prepared for Railway with a root `Dockerfile`, a [`railway.toml`](./railway.toml) config file, and environment-based MySQL configuration.

### Fastest path

1. Push this project to GitHub.
2. Create a new Railway project.
3. Add a `MySQL` service from Railway's database templates.
4. Add a new app service and connect your GitHub repository.
5. Railway will detect and use the root `Dockerfile`.
6. In your app service `Variables` tab, set these values.

If your database service is named `MySQL`, use Railway reference variables like this:

```text
MYSQLHOST=${{MySQL.MYSQLHOST}}
MYSQLPORT=${{MySQL.MYSQLPORT}}
MYSQLDATABASE=${{MySQL.MYSQLDATABASE}}
MYSQLUSER=${{MySQL.MYSQLUSER}}
MYSQLPASSWORD=${{MySQL.MYSQLPASSWORD}}
PORT=8080
```

If your database service has a different name, replace `MySQL` with that exact Railway service name.

### After deploy

1. Open the deployed app service.
2. Go to `Settings -> Networking`.
3. Click `Generate Domain` to get a free Railway domain.
4. If you own a custom domain, add it in the same section.
5. https://varad-fullstack-portfolio-production.up.railway.app

### Notes

- The app uses `/` as the Railway healthcheck path.
- Contact form submissions will be saved in the `contact_messages` table.
- You do not need to hardcode credentials in the codebase.

## Customize your content

Starter portfolio data is seeded in:

- `src/main/java/com/portfolio/website/service/PortfolioDataInitializer.java`

Update the seeded profile, project links, experience history, and skills there to match your own details. Contact form submissions are stored in the `contact_messages` table.
