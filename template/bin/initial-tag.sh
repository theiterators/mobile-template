#!/usr/bin/env bash

# Check if the repository is initialized
if [ ! -d ".git" ]; then
  echo "This directory is not a Git repository. Please initialize it first with 'git init'."
  exit 1
fi

# Set the default tag name
INITIAL_TAG="v0.0.1"

# Check if there is an existing tag
if git rev-parse "$INITIAL_TAG" >/dev/null 2>&1; then
  echo "Tag $INITIAL_TAG already exists"
  exit 1
fi

# Create the initial tag
git tag -a "$INITIAL_TAG" -m "Initial release"
