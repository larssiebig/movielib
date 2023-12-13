package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type Movie struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Genre   string `json:"genre"`
	Year    int    `json:"year"`
	Picture string `json:"picture"`
}

func main() {
	app := fiber.New()

	movies := []Movie{}

	app.Get("/moviestore", func(c *fiber.Ctx) error {
		return c.SendString("Okay")
	})

	app.Post("/api/movies", func(c *fiber.Ctx) error {
		movie := &Movie{}

		if err := c.BodyParser(movie); err != nil {
			return err
		}

		movie.ID = len(movies) + 1

		movies = append(movies, *movie)

		return c.JSON(movies)
	})

	log.Fatal(app.Listen(":4000"))
}
