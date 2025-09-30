#!/bin/bash
source /app/.venv/bin/activate 
python3 /app/web-scrapper.py > /app/cron.log
