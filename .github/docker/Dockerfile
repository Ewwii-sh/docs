FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
      pkg-config libcairo2-dev libglib2.0-dev libgirepository1.0-dev \
      libpango1.0-dev libatk1.0-dev libgtk-3-dev \
      curl gnupg lsb-release ca-certificates \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get update \
 && apt-get install -y nodejs \
 && npm install -g pnpm \
 && rm -rf /var/lib/apt/lists/*

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal
ENV PATH="/root/.cargo/bin:$PATH"

WORKDIR /workspace
