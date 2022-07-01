package main

import (
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
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

// getCurrentPostId attempts to find the current post if it exists in the
// database. The fn prefers filename, and will fallback to searching on slug
func (s *Store) getCurrentPostId(filename string, slug string) int {
	if filename == "" {
		return -1
	}

	var id int

	err := s.DB.QueryRow(`
		select id from nosaj.posts where file_name = $1 or slug = $2
	`, filename, slug).Scan(&id)

	if err != nil {
		fmt.Println(err)
		return -1
	}

	return id
}

func (s *Store) StorePost(html []byte, markdown []byte, filename string, sample string, meta PostMetadata) error {
	title := meta.Title
	cover := meta.Cover
	slug := meta.Slug
	hash := sha256.Sum256(markdown)
	pubdate := meta.Published
	currentId := s.getCurrentPostId(filename, slug)

	if currentId > -1 {
		// Update
		s.DB.Exec(`
			update nosaj.posts set 
			title = $2, slug = $3, cover = $4, publish_date = $5, markdown = $6, html = $7, file_name = $8, file_hash = $9, post_sample = $10, metadata = $11
			where id = $1
		`,
			currentId,
			title,
			slug,
			cover,
			pubdate,
			string(markdown),
			string(html),
			filename,
			hex.EncodeToString(hash[:]),
			sample,
			postMetadataJSON(&meta),
		)
	} else {
		// Insert
		s.DB.Exec(`
			insert into nosaj.posts (title, slug, cover, publish_date, markdown, html, file_name, file_hash, metadata) 
			values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		`,
			title,
			slug,
			cover,
			pubdate,
			string(markdown),
			string(html),
			filename,
			hex.EncodeToString(hash[:]),
			postMetadataJSON(&meta),
		)
	}

	fmt.Printf("%s, %s, %s, %s, %s, %v", title, slug, cover, filename, hex.EncodeToString(hash[:]), meta)
	return nil
}

func postMetadataJSON(m *PostMetadata) string {
	type PostMetaJSON struct {
		Cover     string `json:"cover"`
		Slug      string `json:"slug"`
		Title     string `json:"title"`
		Published string `json:"published"`
	}

	b, err := json.Marshal(PostMetaJSON{
		Cover:     m.Cover,
		Slug:      m.Slug,
		Title:     m.Title,
		Published: m.Published,
	})

	if err != nil {
		fmt.Println(err)
		return "{}"
	}

	return string(b)
}

func opsMetadataJSON(op *Operation) string {
	type OpProcessingJSON struct {
		Processed []string `json:"processed"`
		Failed    []string `json:"failed"`
	}

	b, err := json.Marshal(OpProcessingJSON{
		Processed: op.processedFiles,
		Failed:    op.failedFiles,
	})

	if err != nil {
		fmt.Println(err)
		return "{}"
	}

	return string(b)
}
