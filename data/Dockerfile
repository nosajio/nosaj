# BUILD
FROM golang:alpine as build

WORKDIR /usr/src/nosaj_data

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

RUN go build -v -o /nosaj_data

# DEPLOY
FROM alpine

RUN apk update
RUN apk add git

WORKDIR /

COPY --from=build /nosaj_data /nosaj_data

EXPOSE 8191

CMD [ "/nosaj_data" ]