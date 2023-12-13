package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type Movie struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Genre     string `json:"genre"`
	Year      string `json:"year"`
	Favourite bool   `json:"favourite"`
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

	app.Patch("/api/movies/:id/fav", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		for i, m := range movies {
			if m.ID == id {
				movies[i].Favourite = !m.Favourite
				break
			}
		}

		return c.JSON(movies)
	})

	log.Fatal(app.Listen(":4000"))
}
