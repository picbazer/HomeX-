# HOME X — Premium Real Estate Marketplace

A full-featured property marketplace platform tailored for Bangladesh (Buy, Rent, Lease) built with Next.js (App Router), Tailwind CSS, and Lucide Icons.

---

## Deploying to GitHub Pages

If you deployed to GitHub Pages and saw a **blank white page**, this occurs for three common reasons in Next.js:

1. **Jekyll ignoring `_next`**: GitHub Pages uses Jekyll by default, which ignores folders starting with an underscore (`_next`). We added `public/.nojekyll` to disable this behavior.
2. **Missing `basePath` / subpath 404s**: Project sites are hosted at `https://<username>.github.io/<repo-name>/`. Without `basePath`, asset requests resolve to `https://<username>.github.io/_next/...` (404 Not Found), preventing JavaScript/CSS from loading.
3. **Missing Static Export**: GitHub Pages only serves static files, whereas Next.js defaults to a Node.js server. We configured static export (`output: 'export'`) with `generateStaticParams()` on all dynamic routes.

### Recommended: Automated GitHub Actions Deployment (1-Click)

A ready-to-run GitHub Actions workflow has been added at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub (`main` or `master` branch).
2. Go to your repository on GitHub:
   - Click **Settings** → **Pages** (under "Code and automation").
   - Under **Build and deployment** > **Source**, select **GitHub Actions** (instead of "Deploy from a branch").
3. Go to the **Actions** tab on GitHub and click "Run workflow", or push a new commit.
4. Your site will automatically build and publish to your GitHub Pages URL without blank screen issues!

### Manual Export Build (Alternative)

If you prefer building the static files locally to push to a `gh-pages` branch:

```bash
# If your repo is at https://<username>.github.io/<repo-name>/
NEXT_PUBLIC_BASE_PATH="/<repo-name>" npm run build:pages
```

The static HTML and assets will be output in the `out/` directory, ready to deploy.
