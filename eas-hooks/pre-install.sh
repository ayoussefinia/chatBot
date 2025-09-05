#!/bin/bash
echo "=== Forcing Java 17 in EAS build VM ==="
export JAVA_HOME=$(/usr/libexec/java_home -v 17 2>/dev/null || true)
if [ -z "$JAVA_HOME" ]; then
  # fallback for Linux
  if [ -d "/usr/lib/jvm/java-17-openjdk-amd64" ]; then
    export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
  elif [ -d "/usr/lib/jvm/java-17-openjdk" ]; then
    export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
  fi
fi
export PATH=$JAVA_HOME/bin:$PATH

echo "JAVA_HOME=$JAVA_HOME"
java -version
