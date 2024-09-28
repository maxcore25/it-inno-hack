FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine AS runtime

ENV JAVA_OPTS=""
ENV SPRING_PROFILES_ACTIVE=prod

RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

USER spring:spring

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
