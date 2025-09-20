FROM rust:1.90.0-slim

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
      pkg-config libcairo2-dev libglib2.0-dev libgirepository1.0-dev \
      libpango1.0-dev libatk1.0-dev libgtk-3-dev \
      jq git curl gnupg lsb-release ca-certificates \
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
