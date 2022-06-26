FROM postgres

COPY ./sql/*.sql /docker-entrypoint-initdb.d/
EXPOSE 5432

ENV POSTGRES_USER=dev
ENV POSTGRES_PASSWORD=dev