#!/bin/sh
set -eu

if [ "$#" -ne 2 ]; then
  echo "usage: $0 <version> <SHA256SUMS file>" >&2
  exit 1
fi

version=$1
sums=$2
base="https://github.com/Jae-dev0/Jac-Chart/releases/download/cli-v$version"

sha() {
  value=$(awk -v name="$1" '$2 == name || $2 == "*" name { print tolower($1); exit }' "$sums")
  case $value in
    "" | *[!0-9a-f]*)
      echo "No valid checksum for $1 in $sums" >&2
      exit 1
      ;;
  esac
  if [ "${#value}" -ne 64 ]; then
    echo "The checksum for $1 in $sums is not a SHA-256 digest" >&2
    exit 1
  fi
  printf '%s' "$value"
}

darwin_arm64=$(sha jac-chart-darwin-arm64)
darwin_x64=$(sha jac-chart-darwin-x64)
linux_arm64=$(sha jac-chart-linux-arm64)
linux_x64=$(sha jac-chart-linux-x64)

cat <<EOF
class Jac-Chart < Formula
  desc "Official command-line client for Jac-Chart, the open source project manager"
  homepage "https://jac-chart.app/docs/cli"
  version "$version"
  license "MIT"

  on_macos do
    on_arm do
      url "$base/jac-chart-darwin-arm64"
      sha256 "$darwin_arm64"
    end
    on_intel do
      url "$base/jac-chart-darwin-x64"
      sha256 "$darwin_x64"
    end
  end

  on_linux do
    on_arm do
      url "$base/jac-chart-linux-arm64"
      sha256 "$linux_arm64"
    end
    on_intel do
      url "$base/jac-chart-linux-x64"
      sha256 "$linux_x64"
    end
  end

  def install
    bin.install Dir["jac-chart-*"].first => "jac-chart"
  end

  test do
    assert_match "\\"version\\":\\"#{version}\\"", shell_output("#{bin}/jac-chart --version --json")
  end
end
EOF
