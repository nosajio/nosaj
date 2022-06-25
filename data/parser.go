package main

import (
	"bytes"
	"errors"
	"fmt"
	"strings"

	"github.com/adrg/frontmatter"
	"github.com/gomarkdown/markdown"
)

type KnownFrontmatter struct {
	Title     string `yaml:"title"`
	Cover     string `yaml:"cover"`
	Published string `yaml:"published"`
}

func ParseFile(body []byte) (*KnownFrontmatter, []byte, error) {
	hasFrontmatter := strings.HasPrefix(string(body), "---")

	if hasFrontmatter {
		var matter KnownFrontmatter
		rest, err := frontmatter.Parse(bytes.NewReader(body), &matter)
		if err != nil {
			fmt.Println(err)
			return nil, nil, errors.New("frontmatter can't be parsed")
		}
		html := markdown.ToHTML(rest, nil, nil)
		return &matter, html, nil
	} else {
		html := markdown.ToHTML(body, nil, nil)
		return &KnownFrontmatter{}, html, nil
	}
}
