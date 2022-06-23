extern crate git2;

use git2::Repository;

pub fn pull_repo(url: String) {
  let repo = match Repository::clone(&url, "/tmp/posts") {
    Ok(repo) => repo,
    Err(e) => panic!("error accessing repo: {}, {}", url, e),
  };

  println!("{:?}", repo.namespace());
}
