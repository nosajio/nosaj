package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type FileSystem struct{}

// Cleanup will delete a full directory at path, but the path must be in /tmp
func (f *FileSystem) Cleanup(path string) error {
	if !strings.HasPrefix(path, "/tmp/") {
		return errors.New("path must start with /tmp")
	}

	err := os.RemoveAll(path)
	if err != nil {
		fmt.Println(err)
		return fmt.Errorf("issue removing the cloned posts repo: %v", path)
	}

	return nil
}

// FilterFiles lists all files in path that match the provided pattern
func (f *FileSystem) FilterFiles(path string, pattern string) []string {
	globSearch := path + "/" + pattern
	fmt.Println(globSearch)

	files, err := filepath.Glob(globSearch)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return files
}

// ReadFile returns the bytes for a file
func (f *FileSystem) ReadFile(path string) ([]byte, error) {
	body, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Println(err)
		return []byte{}, errors.New("can't open the file path provided")
	}
	return body, nil
}
