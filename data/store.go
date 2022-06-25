package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/lib/pq"
)

type Store struct {
	DB sql.DB
}

// Connect to database using PG_ vars in config
func (s *Store) Connect(config *Config) error {
	connStr := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.PG_HOST,
		5432,
		config.PG_USERNAME,
		config.PG_PASSWORD,
		config.PG_DATABASE)

	dbConn, err := sql.Open("postgres", connStr)
	if err != nil {
		fmt.Printf("cannot connect to database using user: %s, host: %s, db: %s", config.PG_USERNAME, config.PG_HOST, config.PG_DATABASE)
		return err
	}

	s.DB = *dbConn
	fmt.Println("database connection successful")

	return nil
}

func (s *Store) SaveOp(op *Operation) error {
	_, err := s.DB.Exec(`
		insert into nosaj.operations (created_at, status, commit_hash, processing) values ($1::timestamp, $2, $3, $4::jsonb)
	`,
		op.ts,
		op.status,
		op.commitHash,
		opsMetadataJSON(op),
	)
	return err
}

// func (s *Store) StorePost(body []byte, meta PostMetadata) error {

// }

type OpProcessing struct {
	Processed []string `json:"processed"`
	Failed    []string `json:"failed"`
}

func opsMetadataJSON(op *Operation) string {
	b, err := json.Marshal(OpProcessing{
		Processed: op.processedFiles,
		Failed:    op.failedFiles,
	})

	if err != nil {
		fmt.Println(err)
		return "{}"
	}

	return string(b)
}
