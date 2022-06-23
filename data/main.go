package main

import (
	"log"
)

func main() {
	InitConfig()
	config := GetConfig()
	log.Printf("%v", config)
}
