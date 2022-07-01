package main

import (
	"fmt"
	"strings"
)

type OpStatus string

const (
	Running   OpStatus = "RUNNING"
	Error     OpStatus = "ERROR"
	Completed OpStatus = "COMPLETED"
)

type Operation struct {
	FileSystem
	store          Store
	ts             string
	status         OpStatus
	commitHash     string
	processedFiles []string
	failedFiles    []string
	// changedFilesCount int
}

func (op *Operation) Init(config *Config) error {
	if err := op.store.Connect(config); err != nil {
		return err
	}
	return nil
}

func (op *Operation) GetPostFiles(from string, to string) {
	repo := PostsRepo{
		Path: to,
		Url:  from,
	}

	if err := repo.Clone(); err != nil {
		op.isError(err)
	}

	commitHash, err := repo.CommitDetails()
	if err != nil {
		op.isError(err)
	}
	op.commitHash = commitHash
}

func getFilenameFromPath(path string) string {
	lastSlash := strings.LastIndex(path, "/")
	if lastSlash == -1 {
		return path
	}
	if path[lastSlash:lastSlash+1] == "/" {
		lastSlash = lastSlash + 1
	}
	return path[lastSlash:]
}

func (op *Operation) Ingest(dir string) {
	files := op.FilterFiles(dir, "*.md")

	for _, f := range files {
		b, err := op.ReadFile(f)
		filename := getFilenameFromPath(f)

		// Handle failed read
		if err != nil {
			fmt.Printf("failed to read file: %s", f)
			op.failedFiles = append(op.failedFiles, f)
			continue
		}

		fm, html, md, sample, err := ParseFile(b)
		if err != nil {
			fmt.Printf("failed to parse file: %s", f)
			op.failedFiles = append(op.failedFiles, f)
			continue
		}

		op.processedFiles = append(op.processedFiles, f)
		op.store.StorePost(html, md, filename, sample, *fm)
	}
}

func (op *Operation) Finish() {
	defer op.store.DB.Close()
	op.status = Completed
	if err := op.store.SaveOp(op); err != nil {
		fmt.Println(err)
		fmt.Println("error saving operation to db")
	}
}

func (op *Operation) isError(e error) {
	op.status = Error
	fmt.Println(e)
}
