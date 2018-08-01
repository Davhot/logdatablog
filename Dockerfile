FROM ruby:2.5
ENV LANG C.UTF-8

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client nodejs apt-utils apt-transport-https --no-install-recommends cron gawk sed  && rm -rf /var/lib/apt/lists/*
RUN apt-get install openssl
RUN apt-cache policy openssl libssl1.1
# Обновление ruby
RUN gem pristine --all

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
