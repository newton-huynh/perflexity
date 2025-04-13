def enrich_article(title, url, content, tags=[], author="Unknown", type="article"):
    return {
        "title": title,
        "url": url,
        "content": content,
        "tags": tags,
        "author": author,
        "type": type,
    }
