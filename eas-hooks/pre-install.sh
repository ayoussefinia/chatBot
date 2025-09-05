#!/bin/bash
echo "=============================="
echo "=== DEBUG HOOK IS RUNNING ==="
echo "=============================="

if [ -d "ios/App/App.xcodeproj" ]; then
  echo "Found Xcode project at ios/App/App.xcodeproj"
else
  echo "Xcode project NOT found at ios/App/App.xcodeproj"
fi

xcodebuild -list -project ios/App/App.xcodeproj || echo "xcodebuild failed"
