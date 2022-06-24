package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCleanup(t *testing.T) {
	f := FileSystem{}

	cleanupPath := "/tmp/not/a/directory"
	err := f.Cleanup(cleanupPath)

	if err != nil {
		assert.NotContains(t, err.Error(), "path must start with", "should only work inside of /tmp/**/*, provided: %s", cleanupPath)
	}
}
