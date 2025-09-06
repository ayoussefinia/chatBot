#!/bin/bash
echo "=== Forcing Java 17 in EAS build VM ==="
if [[ -d /usr/libexec/java_home ]]; then
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
elif [[ -d "/usr/lib/jvm/java-17-openjdk-amd64" ]]; then
  export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
elif [[ -d "/usr/lib/jvm/java-17-openjdk" ]]; then
  export JAVA_HOME="/usr/lib/jvm/java-17-openjdk"
fi
echo "JAVA_HOME=$JAVA_HOME"
# persist the variable for subsequent build phases
set-env JAVA_HOME "$JAVA_HOME"
java -version
