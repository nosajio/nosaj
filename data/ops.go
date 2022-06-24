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
	ts                int64
	status            OpStatus
	commitHash        string
	changedFilesCount int
}

func (op *operation) Checkout(from string, to string) {
	// Clone the posts repo
	repo := PostsRepo{
		Path: to,
		Url:  from,
	}

	if err := repo.Clone(); err != nil {
		fmt.Println(err)
	}

	commitHash, filesChanged, err := repo.CommitDetails()
	if err != nil {
		fmt.Println(err)
	}
	op.commitHash = commitHash
	op.changedFilesCount = filesChanged
}

func (op *operation) Ingest(postsDir string) {

}
