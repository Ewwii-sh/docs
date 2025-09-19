FROM ubuntu:22.04

# Install system deps only once when the image is built
RUN apt-get update && apt-get install -y \
    pkg-config libcairo2-dev libglib2.0-dev libgirepository1.0-dev \
    libpango1.0-dev libatk1.0-dev libgtk-3-dev \
 && rm -rf /var/lib/apt/lists/*

# Node + pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g pnpm \
 && rm -rf /var/lib/apt/lists/*

# Rust (minimal profile)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal
ENV PATH="/root/.cargo/bin:$PATH"

WORKDIR /workspace
