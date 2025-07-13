def normalize_value(value, mapping):
    for key, score in mapping.items():
        if key.lower() in value.lower():
            return score
    return 0

def score_from_response(response):
    material_score = normalize_value(response.get("material", ""), {
        "fully_biodegradable": 2.0, "compostable": 1.5, "partially_biodegradable": 1.0,
        "recyclable_only": 0.5, "non_biodegradable": 0.25
    })
    recycled_score = normalize_value(response.get("recycled_content", ""), {
        "none": 0, "low": 0.25, "medium": 0.5, "high": 0.75
    })
    packaging_score = normalize_value(response.get("packaging", ""), {
        "not mentioned": 0, "plastic": 0.25, "minimal": 0.5, "recyclable": 0.75, "compostable": 1.0
    })
    lifecycle_score = normalize_value(response.get("lifecycle", ""), {
        "disposable": 0, "short-term": 0.25, "durable": 0.5, "reusable": 0.75, "long-lasting": 1.0
    })
    recyclability_score = normalize_value(response.get("recyclability", ""), {
        "no": 0, "partially": 0.25, "yes": 0.75
    })
    total = (material_score + recycled_score + packaging_score + lifecycle_score + recyclability_score) * 5 / 10
    return total  # 0-5 scale

def calculate_score(row):
    data = {k: row[k] for k in ['material', 'recycled_content', 'packaging', 'lifecycle', 'recyclability']}
    return score_from_response(data)

# Test function
def test_scoring():
    sample = {'material': 'fully_biodegradable', 'recycled_content': 'high', 'packaging': 'compostable', 'lifecycle': 'reusable', 'recyclability': 'yes'}
    score = score_from_response(sample)
    print(f"Test Score for {sample}: {score}/5")

if __name__ == "__main__":
    test_scoring()