from embed import index

stats = index.describe_index_stats()
total = stats["total_vector_count"]
print(f"🧠 Pinecone index currently holds: {total} vectors")
