package main

import (
	"time"
)

func main() {
	appEnv := GetEnv()

	// The env values won't come from .env in production, so init is only needed
	// in development.
	if appEnv == Development {
		InitConfig()
	}
	config := GetConfig()

	const filesPath = "/tmp/posts"

	op := Operation{
		ts:     time.Now().UTC().Format("2006-01-02T15:04:05-0700"),
		status: Running,
	}

	defer op.Cleanup(filesPath)

	op.Init(&config)
	op.GetPostFiles(config.POSTS_REPO, filesPath)
	op.Ingest(filesPath)
	op.Finish()

	// Listen for signals over http
	api := API{}
	api.Init()
}
