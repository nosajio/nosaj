package main

import "fmt"

type OpStatus string

const (
	Running   OpStatus = "RUNNING"
	Error     OpStatus = "ERROR"
	Completed OpStatus = "COMPLETED"
)

type operation struct {
	FileSystem
	ts             int64
	status         OpStatus
	commitHash     string
	processedFiles []string
	failedFiles    []string
	// changedFilesCount int
}

func (op *operation) GetPostFiles(from string, to string) {
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

func (op *operation) Ingest(dir string) {
	files := op.FilterFiles(dir, "*.md")

	for _, f := range files {
		b, err := op.ReadFile(f)

		// Handle failed read
		if err != nil {
			fmt.Printf("failed to read file: %s", f)
			op.failedFiles = append(op.failedFiles, f)
			continue
		}

		fm, html, err := ParseFile(b)
		if err != nil {
			fmt.Printf("failed to parse file: %s", f)
			op.failedFiles = append(op.failedFiles, f)
			continue
		}
		fmt.Printf("%v", fm)
		fmt.Println(string(html))

	}

}

func (op *operation) isError(e error) {
	op.status = Error
	fmt.Println(e)
}
