-- Create namespace
create schema nosaj;

-- Create posts table
CREATE TABLE
  nosaj.posts (
    id serial constraint posts_pkey primary key,
    title text NULL,
    metadata jsonb NOT NULL,
    publish_date timestamp without time zone NULL,
    slug character varying(255) NOT NULL,
    file_hash text NULL,
    file_name character varying(255) NULL,
    markdown text NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    html text NOT NULL,
    post_sample text NULL,
    cover text NULL
  );

-- Create operations table
CREATE TABLE
  nosaj.operations (
    id serial constraint operations_pkey primary key,
    created_at timestamp(6) without time zone NOT NULL DEFAULT now(),
    status character varying(255) NOT NULL,
    commit_hash character varying(255) NULL,
    processing jsonb NULL DEFAULT '{"failed": [], "processed": []}' ::jsonb
  );

-- Create stats table
CREATE TABLE 
  nosaj.stats (
    id serial constraint stats_pkey primary key,
    created_at timestamp(6) without time zone NOT NULL DEFAULT now(),
    stat character varying(255) NULL,
    uri character varying(255) NULL,
    ip_address character varying(255) NULL,
    token character varying(255) NULL,
    payload jsonb NULL DEFAULT '{}'::jsonb
  );