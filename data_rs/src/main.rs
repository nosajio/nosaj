mod config;
mod repo;

fn main() {
  config::init();
  let config = config::get_env();

  repo::pull_repo(config.posts_repo);
}
