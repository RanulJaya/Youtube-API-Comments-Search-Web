#!/bin/bash
source /app/.venv/bin/activate 
python3 /app/web-scrapper.py > /var/log/cron.log
