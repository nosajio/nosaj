package main

import (
	"bytes"
	"errors"
	"fmt"
	"strings"

	"github.com/adrg/frontmatter"
	"github.com/gomarkdown/markdown"
)

type PostMetadata struct {
	Title     string `yaml:"title"`
	Cover     string `yaml:"cover"` // optional
	Published string `yaml:"published"`
	Slug      string `yaml:"slug"`
}

func ParseFile(body []byte) (*PostMetadata, []byte, error) {
	hasFrontmatter := strings.HasPrefix(string(body), "---")

	if hasFrontmatter {
		var matter PostMetadata

		rest, err := frontmatter.Parse(bytes.NewReader(body), &matter)
		if err != nil {
			fmt.Println(err)
			return nil, nil, errors.New("frontmatter can't be parsed")
		}

		if len(matter.Title) == 0 {
			fmt.Printf("missing title in post %s", string(body)[0:30])
		}
		if len(matter.Published) == 0 {
			fmt.Printf("missing publish date in post %s", matter.Title)
		}
		if len(matter.Slug) == 0 {
			fmt.Printf("missing slug in post %s", matter.Title)
		}

		html := markdown.ToHTML(rest, nil, nil)
		return &matter, html, nil
	} else {
		html := markdown.ToHTML(body, nil, nil)
		return &PostMetadata{}, html, nil
	}
}
