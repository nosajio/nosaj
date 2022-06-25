package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type API struct{}

func (api *API) Init() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"pong": true,
		})
	})

	r.Run("0.0.0.0:5669")
	fmt.Println("api started @ http://localhost:5669")
}
