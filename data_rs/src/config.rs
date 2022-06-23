extern crate dotenv;

use dotenv::dotenv;
use std::env;

#[derive(Debug)]
pub struct Config {
  pub posts_repo: String,

  pub pg_host: String,
  pub pg_database: String,
  pub pg_username: String,
  pub pg_password: String,

  pub posts_table_name: String,
  pub ops_table_name: String,

  pub web_api_key: String,
}

pub fn init() {
  dotenv().ok();
}

pub fn get_env() -> Config {
  let config = Config {
    pg_host: env::var("PG_HOST").unwrap(),
    pg_database: env::var("PG_DATABASE").unwrap(),
    pg_username: env::var("PG_USERNAME").unwrap(),
    pg_password: env::var("PG_PASSWORD").unwrap(),
    posts_table_name: env::var("POSTS_TABLE_NAME").unwrap(),
    ops_table_name: env::var("OPS_TABLE_NAME").unwrap(),
    web_api_key: env::var("WEB_API_KEY").unwrap(),
    posts_repo: env::var("POSTS_REPO").unwrap(),
  };

  return config;
}
