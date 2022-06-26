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
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// GetConfig returns the full Config struct
func GetConfig() Config {
	config := Config{
		PG_USERNAME:      os.Getenv("PG_USERNAME"),
		PG_PASSWORD:      os.Getenv("PG_PASSWORD"),
		PG_DATABASE:      os.Getenv("PG_DATABASE"),
		PG_HOST:          os.Getenv("PG_HOST"),
		POSTS_TABLE_NAME: os.Getenv("POSTS_TABLE_NAME"),
		OPS_TABLE_NAME:   os.Getenv("OPS_TABLE_NAME"),
		WEB_API_KEY:      os.Getenv("WEB_API_KEY"),
		WEB_PORT:         os.Getenv("WEB_PORT"),
		POSTS_REPO:       os.Getenv("POSTS_REPO"),
	}

	return config
}
