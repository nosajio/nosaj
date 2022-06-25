package main

import (
	"errors"
	"fmt"
	"os"

	"github.com/go-git/go-git/v5"
)

type PostsRepo struct {
	FileSystem
	Repo     *git.Repository
	Path     string
	LastHash string
	Url      string
}

func (repo *PostsRepo) dirExists() bool {
	dir := repo.Path
	_, err := os.Stat(dir)

	return !os.IsNotExist(err)
}

func (repo *PostsRepo) Clone() error {
	if repo.dirExists() {
		fmt.Println("Repo dir already exists, cleaning up...")
		repo.Cleanup(repo.Path)
	}

	if repo.Url == "" {
		return errors.New("PostsRepo.Url cannot be empty")
	}

	if repo.Path == "" {
		return errors.New("PostsRepo.Path cannot be empty")
	}

	r, err := git.PlainClone(repo.Path, false, &git.CloneOptions{
		URL:      repo.Url,
		Progress: os.Stdout,
	})
	repo.Repo = r

	if err != nil {
		fmt.Println(err)
		return errors.New("repo could not be cloned into the provided path")
	}

	return nil
}

func (repo *PostsRepo) CommitDetails() (string, error) {
	r := repo.Repo
	r.Branch("master")
	fmt.Printf("%v", repo.Repo)

	ref, err := r.Head()
	if err != nil {
		fmt.Println(err)
		return "", errors.New("cannot get the repo's HEAD state")
	}

	repo.LastHash = ref.Hash().String()

	return repo.LastHash, nil
}
