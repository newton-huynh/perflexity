import requests
from bs4 import BeautifulSoup
from schema import StandardDoc
import hashlib

# Takes a raw HTML string and returns a cleaned text string
# Removes unwanted elements and extracts paragraph text
def clean_html(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    # Remove unwanted elements
    for tag in soup(["script", "style", "nav", "footer", "aside", "form", "header"]):
        tag.decompose()

    # Get all paragraph text
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p") if p.get_text(strip=True)]
    return "\n\n".join(paragraphs)

# Takes a URL and returns a StandardDoc object
# Parses the HTML content and extracts the title, author, content, and tags
# Returns a StandardDoc object with the parsed data
def process_article(url: str) -> StandardDoc:
    response = requests.get(url, timeout=10)
    response.raise_for_status()

    raw_html = response.text
    clean_text = clean_html(raw_html)

    soup = BeautifulSoup(raw_html, "html.parser")

    # Try to grab title and author
    title = soup.title.string if soup.title else "Untitled"
    author = soup.find("meta", {"name": "author"})
    author = author["content"] if author and author.get("content") else "Unknown"

    # Optional: use domain as tag
    domain = url.split("/")[2].replace("www.", "")
    tags = [domain.split(".")[0]]

    # Generate source_id (hash of URL)
    source_id = hashlib.md5(url.encode()).hexdigest()

    return StandardDoc(
        title=title.strip(),
        url=url,
        content=clean_text,
        author=author,
        tags=tags,
        type="article",
        source_id=source_id
    )
