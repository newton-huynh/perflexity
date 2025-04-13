from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
from schema import StandardDoc
from dotenv import load_dotenv
import os
import requests
import hashlib

load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")


def extract_video_id(url: str) -> str:
    if "v=" in url:
        return url.split("v=")[-1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[-1]
    else:
        raise ValueError("Invalid YouTube URL")
    
def get_youtube_metadata(video_id: str, api_key: str) -> dict:
    url = "https://www.googleapis.com/youtube/v3/videos"
    params = {
        "part": "snippet",
        "id": video_id,
        "key": api_key
    }
    response = requests.get(url, params=params)
    data = response.json()

    if not data["items"]:
        return None

    snippet = data["items"][0]["snippet"]
    return {
        "title": snippet["title"],
        "channel_name": snippet["channelTitle"],
        "channel_url": f"https://www.youtube.com/channel/{snippet['channelId']}",
        "published_at": snippet["publishedAt"],
        "thumbnail": snippet["thumbnails"]["default"]["url"],
        "tags": snippet["tags"]
    }

def process_youtube(url: str) -> StandardDoc:
    video_id = extract_video_id(url)
    metadata = get_youtube_metadata(video_id, YOUTUBE_API_KEY)
    transcript = YouTubeTranscriptApi.get_transcript(video_id)


    transcript_text = "".join([segment["text"] for segment in transcript])

    # Optional metadata
    tags = ["youtube"]
    source_id = hashlib.md5(url.encode()).hexdigest()

    return StandardDoc(
        title=f"YouTube Video: {video_id}",
        url=url,
        content=transcript_text,
        type="youtube",
        tags=metadata["tags"],
        author=metadata["channel_name"],
        source_id=source_id,
        transcript_language=transcript[0].get("language", "en"),
        published_date=metadata["published_at"]
    )
