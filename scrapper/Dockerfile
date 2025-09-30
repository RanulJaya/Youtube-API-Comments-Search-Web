FROM ubuntu:latest

RUN apt-get update && apt-get install -y cron &&  apt-get install python3 && apt-get install -y python3-pip && apt-get install -y python3-venv && apt-get install bash

WORKDIR /app

COPY . .

SHELL ["/bin/bash", "-c"]

RUN python3 -m venv /app/.venv

RUN source .venv/bin/activate && pip install -r requirements.txt

COPY runCron.sh /etc/cron.d/runCron.sh

RUN chmod +x /etc/cron.d/runCron.sh

RUN chmod +x /app/runbatch.sh

RUN crontab /etc/cron.d/runCron.sh

CMD ["cron", "-f"]