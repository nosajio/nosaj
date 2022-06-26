package main

func main() {
	appEnv := GetEnv()

	// The env values won't come from .env in production, so init is only needed
	// in development.
	if appEnv == Development {
		InitConfig()
	}
	config := GetConfig()

	// Listen for signals over http
	api := API{
		Config: &config,
	}
	api.Init()
}
