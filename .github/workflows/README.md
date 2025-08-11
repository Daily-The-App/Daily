# CI/CD Workflows

## Overview

This project uses a two-tier CI/CD approach to optimize development velocity and cost:

1. **Main CI** (`ci.yml`) - Fast feedback for PRs and pushes
2. **Release Build** (`release-build.yml`) - On-demand native builds for releases

## Main CI Pipeline

The main CI pipeline runs on every push and PR to `main` and includes:

- **Linting** - Code style and quality checks
- **Type Checking** - TypeScript compilation verification  
- **Testing** - Unit tests with Jest
- **Build** - TypeScript compilation and Expo doctor checks

This pipeline is optimized for speed (typically < 10 minutes) to provide fast feedback during development.

## Release Build Pipeline

The release build pipeline is **manually triggered** and handles expensive native builds:

### How to Trigger

1. Go to the **Actions** tab in GitHub
2. Select **Release Build** workflow
3. Click **Run workflow**
4. Configure the build:
   - **Platform**: `all`, `ios`, or `android`
   - **Profile**: `production` or `preview` 
   - **Submit**: Whether to auto-submit to app stores

### Prerequisites

Before running native builds, ensure:

1. **EXPO_TOKEN** is set in repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add `EXPO_TOKEN` with your Expo access token
   - Get token from: https://expo.dev/accounts/[account]/settings/access-tokens

2. **EAS Configuration** exists:
   ```bash
   # If you don't have eas.json yet
   npx eas build:configure
   ```

3. **Build Profiles** are configured in `eas.json`:
   ```json
   {
     "build": {
       "production": {
         "distribution": "store"
       },
       "preview": {
         "distribution": "internal"
       }
     }
   }
   ```

### Build Profiles

- **Production**: Store-ready builds for release
- **Preview**: Internal testing builds with development signatures

### Cost Optimization

- Native builds only run when manually triggered
- No automatic builds on every PR/push
- Reduces EAS build credits consumption
- Keeps main CI fast and focused on code quality

### Security Notes

- All sensitive tokens are stored as GitHub secrets
- Builds run in isolated GitHub Actions environment
- EXPO_TOKEN validation ensures builds fail fast if misconfigured

## Workflow Files

- `ci.yml` - Main development CI pipeline
- `release-build.yml` - On-demand native builds
- `README.md` - This documentation file
