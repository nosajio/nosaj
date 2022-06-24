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

	op := operation{
		ts:     time.Now().Unix(),
		status: Running,
	}

	op.Checkout(config.POSTS_REPO, filesPath)
	op.Ingest(filesPath)

	// Delete the checked out posts dir, don't leave a trace
	op.Cleanup(filesPath)

}
