package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Movie struct {
	Title   string `json:"title"`
	Genre   string `json:"genre"`
	Year    int    `json:"year"`
	Picture string `json:"picture"`
}

func main() {
	fmt.Println("Hello World")

	app := fiber.New()

	app.Get("/moviestore", func(c *fiber.Ctx) error {
		return c.SendString("Okay")
	})

	log.Fatal(app.Listen(":4000"))
}
