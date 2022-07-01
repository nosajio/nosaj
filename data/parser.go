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
	Sample    string `yaml:"sample"` // optional, will be automatic
	Cover     string `yaml:"cover"`  // optional
	Published string `yaml:"published"`
	Slug      string `yaml:"slug"`
}

func ParseFile(body []byte) (*PostMetadata, []byte, []byte, string, error) {
	var sample string
	hasFrontmatter := strings.HasPrefix(string(body), "---")

	if hasFrontmatter {
		var matter PostMetadata

		rest, err := frontmatter.Parse(bytes.NewReader(body), &matter)
		if err != nil {
			fmt.Println(err)
			return nil, nil, nil, "", errors.New("frontmatter can't be parsed")
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
		// find the sample by taking the first paragraph as a simple string
		if len(matter.Sample) == 0 {
			sample = getSample(rest)
		} else {
			sample = matter.Sample
		}

		html := markdown.ToHTML(rest, nil, nil)
		return &matter, html, rest, sample, nil
	} else {
		html := markdown.ToHTML(body, nil, nil)
		sample = getSample(body)
		return &PostMetadata{}, html, body, sample, nil
	}
}

func getSample(md []byte) string {
	p := strings.Split(strings.ReplaceAll(string(md), "\r\n", "\n"), "\n")
	fmt.Printf("%v", p[0])
	return p[0]
}
