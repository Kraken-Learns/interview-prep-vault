# Deployment Guide - GitHub Pages

This guide will help you deploy your Interview Prep Vault to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- This project code

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `interview-prep-vault`)
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Initialize Git and Push Your Code

Open a terminal in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit"

# Add your GitHub repository as remote (replace with your username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically trigger and deploy your site

## Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually takes 1-2 minutes)
4. Once complete, your site will be live!

## Your Site URL

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Making Updates

After the initial setup, any time you want to update your site:

```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
```

The site will automatically rebuild and deploy within a few minutes.

## Troubleshooting

### Build Fails
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Try running `npm run build` locally to catch errors

### Site Not Loading
- Wait a few minutes after the first deployment
- Check that GitHub Pages is set to "GitHub Actions" source
- Verify the deployment completed successfully in the Actions tab

### Assets Not Loading
- The `vite.config.ts` is configured with `base: './'` which should work for any repo name
- Clear your browser cache and try again

## Adding New Problems

1. Create a new `.md` file in `src/content/problems/`
2. Use the same format as `two-sum.md`
3. Commit and push your changes
4. The site will automatically rebuild with your new problem!
