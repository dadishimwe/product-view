/** GitHub `owner/repo` for source links and README badges. */
export function githubRepoSlug() {
  return process.env.NEXT_PUBLIC_GITHUB_REPO ?? "dadishimwe/product-view";
}

export function githubRepoUrl() {
  return `https://github.com/${githubRepoSlug()}`;
}

export function githubStarUrl() {
  return `${githubRepoUrl()}/stargazers`;
}

export function githubIssuesUrl() {
  return `${githubRepoUrl()}/issues`;
}
