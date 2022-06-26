package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type API struct {
	Port  string
	Token string
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
	port := api.Port

	if len(port) < 4 {
		panic("can't start HTTP server without a port")
	}

	r.Use(Authorization(api.Token))

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"pong": true,
		})
	})

	r.Run(fmt.Sprintf(":%s", port))
	fmt.Printf("api started @ http://localhost:%s", port)
}
