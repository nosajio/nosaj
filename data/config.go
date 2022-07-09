package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PG_USERNAME string
	PG_PASSWORD string
	PG_DATABASE string
	PG_HOST     string

	OPS_TABLE_NAME   string
	POSTS_TABLE_NAME string

	WEB_API_KEY string
	WEB_PORT    string

	POSTS_REPO string
}

type AppEnv string

const (
	Production  AppEnv = "PRODUCTION"
	Development AppEnv = "DEVELOPMENT"
)

func GetEnv() AppEnv {
	e := os.Getenv("APP_ENV")
	if e == "PRODUCTION" {
		return Production
	}
	return Development
}

func InitConfig() {
	err := godotenv.Load("../.env.dev")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// GetConfig returns the full Config struct
func GetConfig() Config {
	config := Config{
		POSTS_TABLE_NAME: "posts",
		OPS_TABLE_NAME:   "operations",
		PG_USERNAME:      os.Getenv("PGUSER"),
		PG_PASSWORD:      os.Getenv("PGPASSWORD"),
		PG_DATABASE:      os.Getenv("PGDATABASE"),
		PG_HOST:          os.Getenv("PGHOST"),
		WEB_API_KEY:      os.Getenv("DATA_WEB_API_KEY"),
		WEB_PORT:         os.Getenv("DATA_WEB_PORT"),
		POSTS_REPO:       os.Getenv("DATA_POSTS_REPO"),
	}

	return config
}
