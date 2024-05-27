# Use a multi-stage build to reduce the final image size
# Stage 1: Build
FROM maven:3.8.1-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Package
FROM openjdk:11-jre-slim
VOLUME /tmp
COPY --from=build /app/target/Discovery-Server-0.0.1-SNAPSHOT.jar eureka-server.jar
ENTRYPOINT ["java", "-jar", "/eureka-server.jar"]
EXPOSE 8761

