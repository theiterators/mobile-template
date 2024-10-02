#!/bin/bash

# GitLab API details
GITLAB_API_URL="https://gitlab.iterato.rs/api/v4/projects/$GITLAB_PROJECT_ID/trigger/pipeline"
REF="main"  # Branch or tag to trigger the pipeline on


# Trigger the GitLab pipeline
curl --request POST \
  --form "token=$TRIGGER_TOKEN" \
  --form "ref=$REF" \
  --form "variables[EAS_BUILD_PLATFORM]=$EAS_BUILD_PLATFORM" \
  --form "variables[EAS_BUILD_PROFILE]=$EAS_BUILD_PROFILE" \
  --form "variables[GITLAB_PROJECT_ID]=$GITLAB_PROJECT_ID" \
  "$GITLAB_API_URL"