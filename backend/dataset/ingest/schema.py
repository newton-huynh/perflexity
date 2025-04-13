from typing import List, Literal

SourceType = Literal["article", "youtube"]

# Represents a standard document with metadata
# Contains attributes for title, URL, content, type, tags, author, source_id, transcript_language, and published_date
class StandardDoc:
    def __init__(
        self,
        title: str,
        url: str,
        content: str,
        type: SourceType,
        tags: List[str] = [],
        author: str = "Unknown",
        source_id: str = "",
        transcript_language: str = "en",
        published_date: str = ""
    ):
        self.title = title
        self.url = url
        self.content = content
        self.type = type
        self.tags = tags
        self.author = author
        self.source_id = source_id
        self.transcript_language = transcript_language
        self.published_date = published_date

    def to_dict(self):
        return self.__dict__
