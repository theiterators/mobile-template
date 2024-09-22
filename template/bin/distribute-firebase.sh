#!/usr/bin/env bash


echo "Running Environment Details:"
echo "Home Directory: $HOME"
echo "Operating System: $(uname -s)"

# Check if jq is installed, if not, install it
if ! command -v jq &> /dev/null; then
  echo "jq is not installed. Installing jq..."
  
  # For Alpine-based systems (APK)
  if [ -x "$(command -v apk)" ]; then
    apk add --no-cache jq
  # For Ubuntu/Debian-based systems (APT)
  elif [ -x "$(command -v apt-get)" ]; then
    sudo apt-get update && sudo apt-get install -y jq
  # For Fedora-based systems (DNF)
  elif [ -x "$(command -v dnf)" ]; then
    sudo dnf install jq -y
  # For RedHat-based systems (YUM)
  elif [ -x "$(command -v yum)" ]; then
    sudo yum install jq -y
  # For macOS (Darwin)
  elif [ "$(uname -s)" == "Darwin" ]; then
    if command -v brew &> /dev/null; then
      brew install jq
    else
      echo "Homebrew is not installed"
      exit 1
    fi
  else
    echo "Unsupported package manager"
    exit 1
  fi
fi

# Check if firebase-tools is installed, if not, install it
if ! command -v firebase &> /dev/null; then
  echo "firebase-tools is not installed. Installing firebase-tools..."
  if [ "$(uname -s)" == "Darwin" ]; then
    if command -v brew &> /dev/null; then
        echo "Installing firebase-tools using Homebrew..."
        brew install firebase-cli
    fi
  else
    # Use npm for other systems
    npm install -g firebase-tools
  fi
fi

firebase --version

# Extract the latest changes from Release notes
RESPONSE=$(curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" "https://gitlab.com/api/v4/projects/$GITLAB_PROJECT_ID/releases")
if echo "$RESPONSE" | jq . >/dev/null 2>&1; then
  RELEASE_NOTES=$(echo "$RESPONSE" | jq -r 'if type == "array" and length > 0 and .[0].description != null then .[0].description else "No release notes available." end')
else
  RELEASE_NOTES="No release notes available."
fi

echo "Release notes - $RELEASE_NOTES"

if [ -z "$RELEASE_NOTES" ]; then
  RELEASE_NOTES="Fixes and improvements"
fi

echo "$RELEASE_NOTES"

echo "EAS build succeeded. Uploading to Firebase..."

BUILD_URL=$(npx eas-cli build:list --platform $EAS_BUILD_PLATFORM --status finished --limit 1 --non-interactive --json | jq -r '.[0].artifacts.buildUrl')

if [ "$EAS_BUILD_PLATFORM" == "android" ]; then curl -L -o app.apk "$BUILD_URL"; else curl -L -o app.ipa "$BUILD_URL"; fi
# Find the build artifact based on platform
if [ "$EAS_BUILD_PLATFORM" == "android" ]; then
  firebase appdistribution:distribute app.apk --app $FIREBASE_APP_ID_ANDROID --token $FIREBASE_TOKEN --release-notes $RELEASE_NOTES || exit 1
elif [ "$EAS_BUILD_PLATFORM" == "ios" ]; then
  firebase appdistribution:distribute app.ipa  --app $FIREBASE_APP_ID_IOS --token $FIREBASE_TOKEN --release-notes $RELEASE_NOTES  || exit 1
fi

echo "Upload to Firebase App Distribution completed."