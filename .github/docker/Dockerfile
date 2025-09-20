FROM rust:1.90.0-slim

# Install minimal system dependencies
RUN apt-get update && apt-get install -y \
      pkg-config git curl jq ca-certificates build-essential \
 && rm -rf /var/lib/apt/lists/*

# Install Node 20 + pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g pnpm \
 && rm -rf /var/lib/apt/lists/*

# Install 1.89.0 version
RUN rustup install 1.89.0 \
 && rustup component add rustfmt clippy rust-src --toolchain 1.89.0

# Install stable version
RUN rustup default stable \
 && rustup component add rustfmt clippy rust-src --toolchain stable

WORKDIR /workspace
