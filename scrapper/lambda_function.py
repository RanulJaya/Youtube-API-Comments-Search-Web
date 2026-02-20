from googleapiclient.discovery import build
import os
# from dotenv import load_dotenv
import json
import boto3
from google.oauth2 import service_account
import time
from aws_lambda_powertools import Logger
import logging

# load_dotenv()
api_key = os.getenv("API_KEY")

logger = Logger()
logger.setLevel(logging.INFO)

# Get s3 bucket of a credential of 
# Bucket = 'stores3bucketslunar'
def get_credentials():
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket=api_key, Key='app/credentials.json')
    # print(obj)
    file_content = obj['Body'].read().decode('utf-8')
    # print(file_content)
    credentials = json.loads(file_content)['API_KEY']
    return credentials


# JSON serializer for returning object set 
def json_serializer(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')


# function for api key of url
def video_obj(video_id):
    # creating youtube resource object
    youtube = build('youtube','v3', developerKey=get_credentials())

    # retrieve youtube video results
    video_response=youtube.commentThreads().list(
        part='snippet,replies',
        videoId= video_id
    ).execute()

    
    loadItem = json.loads('[]')
    # iterate video response
    while video_response:

        # from each result object 
        for item in video_response['items']:
            
            # Extracting comments
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            username = item['snippet']['topLevelComment']['snippet']['authorDisplayName']
            likes = item['snippet']['topLevelComment']['snippet']['likeCount']
            
            # Create an array for comments and append into a dict
            data = {"username": username, "comment": comment}
            loadItem.append(data)

        # Again repeat
        if 'nextPageToken' in video_response:
            video_response = youtube.commentThreads().list(
                    part = 'snippet,replies',
                    videoId = video_id,
                    pageToken = video_response['nextPageToken']
                ).execute()
        else:
            break 
    
    # Return dictionary
    diction = dict(enumerate(loadItem))
    
    return diction



# video_id = "nZU9_2bTNTM"
# obj = video_obj(video_id)
# serial = json.dumps(obj, indent=4, default=json_serializer)
# print(serial)

# Hanlder to run the container for parsing string from a url and output the body
def handler(event, context):
    # Your function code here

    # url of the parameter
    value1 = event['queryStringParameters']['api_key']
    video_id = value1

    # Parsing the url to function to output the dict and then convert to a json format
    vid_obj = video_obj(video_id)
    convertJson = json.dumps(vid_obj, indent=4, default=json_serializer)

    # return body into a json format header
    return {
        "statusCode": 200,
        "Content-Type": "application/json",
        "body": convertJson
    }

