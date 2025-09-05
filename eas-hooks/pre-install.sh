#!/bin/bash
echo "=== DEBUG: Listing Xcode Schemes ==="
xcodebuild -list -project ios/App/App.xcodeproj
echo "=== END SCHEME LIST ==="
