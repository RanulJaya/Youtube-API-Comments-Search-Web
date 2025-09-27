from googleapiclient.discovery import build
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY")

def video_obj(video_id):
    # creating youtube resource object
    youtube = build('youtube','v3',
                    developerKey=api_key)

    # retrieve youtube video results
    video_response=youtube.commentThreads().list(
    part='snippet,replies',
    videoId= video_id
    ).execute()


    # iterate video response
    while video_response:

        # from each result object 
        for item in video_response['items']:
            
            # Extracting comments
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            username = item['snippet']['topLevelComment']['snippet']['authorDisplayName']

            print( username + ": \n[" + comment + "]", end='\n\n')

        # Again repeat
        if 'nextPageToken' in video_response:
            video_response = youtube.commentThreads().list(
                    part = 'snippet,replies',
                    videoId = video_id,
                        pageToken = video_response['nextPageToken']
                ).execute()
        else:
            break 


video_id = "V2Tx4R96kx0"

video_obj(video_id)