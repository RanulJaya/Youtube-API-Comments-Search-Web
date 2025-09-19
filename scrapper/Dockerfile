FROM ubuntu:latest

RUN apt-get update && apt-get install -y cron &&  apt-get install python3 && apt-get install -y python3-pip && apt-get install -y python3-venv && apt-get install bash

WORKDIR /app

COPY . .

SHELL ["/bin/bash", "-c"]

RUN python3 -m venv /app/.venv

RUN source .venv/bin/activate && pip install -r requirements.txt

COPY test.sh /etc/cron.d/test.sh

RUN chmod +x /etc/cron.d/test.sh

RUN chmod +x /app/runtest.sh

RUN crontab /etc/cron.d/test.sh

RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log