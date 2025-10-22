#!/bin/bash
source scrapper/venv/bin/activate 
python3 scrapper/web-scrapper.py > scrapper/cron.log
