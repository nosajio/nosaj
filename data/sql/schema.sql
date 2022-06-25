-- Create namespace
create schema nosaj;

-- Create posts table
CREATE TABLE nosaj.posts (
  title text NULL,
  metadata jsonb NOT NULL,
  publish_date timestamp without time zone NULL,
  slug character varying(255) NOT NULL,
  file_hash text NULL,
  file_name character varying(255) NULL,
  markdown text NOT NULL,
  created_at timestamp without time zone NOT NULL,
  id integer NOT NULL
);
ALTER TABLE
  nosaj.posts
ADD
  CONSTRAINT posts_pkey PRIMARY KEY (id);

-- Create operations table
CREATE TABLE
  nosaj.operations (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    status character varying(255) NOT NULL,
    commit_hash character varying(255) NULL,
    processing jsonb NULL DEFAULT '{"failed": [], "processed": []}' ::jsonb
  );
ALTER TABLE
  nosaj.operations
ADD
  CONSTRAINT operations_pkey PRIMARY KEY (id);