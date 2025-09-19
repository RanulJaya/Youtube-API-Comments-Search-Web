from googleapiclient.discovery import build

def video_obj(video_id):
    # creating youtube resource object
    youtube = build('youtube','v3',
                    developerKey="AIzaSyDKCAfSGXcOqEkG5eU42fziV78ivBNOaq8")

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


video_id = "gAkwW2tuIqE"

video_obj(video_id)