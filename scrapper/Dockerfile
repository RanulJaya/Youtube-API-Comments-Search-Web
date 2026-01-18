# FROM ubuntu:latest

# RUN apt-get update && apt-get install -y cron &&  apt-get install python3 && apt-get install -y python3-pip && apt-get install -y python3-venv && apt-get install bash

# WORKDIR /app

# COPY . .

# SHELL ["/bin/bash", "-c"]

# RUN python3 -m venv /app/.venv

# RUN source .venv/bin/activate && pip install -r requirements.txt

# ENV PATH "/app/.venv/bin:/app/.venv/bin"

# # COPY runCron.sh /etc/cron.d/runCron.sh

# # RUN chmod +x /etc/cron.d/runCron.sh

# # RUN chmod +x /app/runbatch.sh

# # RUN crontab /etc/cron.d/runCron.sh

# CMD ["python3", "web-scrapper.py"]

FROM public.ecr.aws/lambda/python:3.12

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -r requirements.txt

# Copy function code
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_function.handler" ]