package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type API struct {
	Port   string
	Token  string
	Config *Config
}

func Authorization(token string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		expect := fmt.Sprintf("Basic %s", token)

		if authHeader == expect {
			c.Next()
			return
		}

		c.JSON(http.StatusForbidden, gin.H{
			"error":   "Forbidden",
			"message": "Incorrect Authorization header",
		})
		c.Abort()
	}
}

func (api *API) Init() {
	r := gin.Default()
	config := api.Config
	port := config.WEB_PORT
	token := config.WEB_API_KEY

	if len(port) < 4 {
		panic("can't start HTTP server without a port")
	}

	if token == "" {
		panic("can't start HTTP server without an API token")
	}

	r.Use(Authorization(token))

	// Leave it here to test things are working
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"pong": true,
		})
	})

	r.POST("/sync", func(c *gin.Context) {
		s := time.Now().Unix()
		op := handleSyncOperation(config)
		e := time.Now().Unix()
		d := e - s

		c.JSON(http.StatusOK, gin.H{
			"status":         op.status,
			"processedFiles": op.processedFiles,
			"failedFiles":    op.failedFiles,
			"processTime":    fmt.Sprintf("%d seconds", d),
		})
	})

	r.Run(fmt.Sprintf(":%s", port))
}

func handleSyncOperation(config *Config) *Operation {
	const filesPath = "/tmp/posts"

	op := Operation{
		ts:     time.Now().UTC().Format("2006-01-02T15:04:05-0700"),
		status: Running,
	}

	defer op.Cleanup(filesPath)

	op.Init(config)
	op.GetPostFiles(config.POSTS_REPO, filesPath)
	op.Ingest(filesPath)
	op.Finish()

	return &op
}
