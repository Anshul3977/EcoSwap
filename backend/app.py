from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random

app = Flask(__name__)
CORS(app)

# Updated product data with images
products_data = [
    {"product_id": 1, "name": "Disposable Paper Plates", "category": "Kitchen", "price": 5.99, "material": "non_biodegradable", "recycled_content": "none", "packaging": "plastic", "lifecycle": "disposable", "recyclability": "no", "popularity": 60, "image": "https://via.placeholder.com/200?text=Disposable+Paper+Plates", "carbonFootprint": 1.5, "decompositionTime": "120 days"},
    {"product_id": 2, "name": "Reusable Bamboo Plates", "category": "Kitchen", "price": 12.49, "material": "fully_biodegradable", "recycled_content": "high", "packaging": "compostable", "lifecycle": "reusable", "recyclability": "yes", "popularity": 85, "image": "https://via.placeholder.com/200?text=Reusable+Bamboo+Plates", "carbonFootprint": 0.4, "decompositionTime": "90 days"},
    {"product_id": 3, "name": "Plastic Toothbrushes", "category": "Personal Care", "price": 2.99, "material": "non_biodegradable", "recycled_content": "none", "packaging": "plastic", "lifecycle": "disposable", "recyclability": "no", "popularity": 70, "image": "https://via.placeholder.com/200?text=Plastic+Toothbrushes", "carbonFootprint": 1.0, "decompositionTime": "400 years"},
    {"product_id": 4, "name": "Bamboo Toothbrushes", "category": "Personal Care", "price": 4.99, "material": "fully_biodegradable", "recycled_content": "low", "packaging": "compostable", "lifecycle": "disposable", "recyclability": "yes", "popularity": 90, "image": "https://via.placeholder.com/200?text=Bamboo+Toothbrushes", "carbonFootprint": 0.2, "decompositionTime": "90 days"},
    {"product_id": 5, "name": "Plastic Food Containers", "category": "Home", "price": 6.49, "material": "non_biodegradable", "recycled_content": "none", "packaging": "plastic", "lifecycle": "disposable", "recyclability": "partial", "popularity": 65, "image": "https://via.placeholder.com/200?text=Plastic+Food+Containers", "carbonFootprint": 1.8, "decompositionTime": "450 years"},
    {"product_id": 6, "name": "Glass Food Containers", "category": "Home", "price": 9.99, "material": "non_biodegradable", "recycled_content": "high", "packaging": "recyclable", "lifecycle": "reusable", "recyclability": "yes", "popularity": 80, "image": "https://via.placeholder.com/200?text=Glass+Food+Containers", "carbonFootprint": 0.6, "decompositionTime": "indefinite"},
    {"product_id": 7, "name": "Disposable Plastic Cups", "category": "Kitchen", "price": 8.99, "material": "non_biodegradable", "recycled_content": "none", "packaging": "plastic", "lifecycle": "disposable", "recyclability": "no", "popularity": 50, "image": "https://via.placeholder.com/200?text=Disposable+Plastic+Cups", "carbonFootprint": 2.5, "decompositionTime": "500 years"},
    {"product_id": 8, "name": "Cotton Reusable Bags", "category": "Household", "price": 6.49, "material": "fully_biodegradable", "recycled_content": "high", "packaging": "compostable", "lifecycle": "reusable", "recyclability": "yes", "popularity": 90, "image": "https://via.placeholder.com/200?text=Cotton+Reusable+Bags", "carbonFootprint": 0.8, "decompositionTime": "90 days"},
    {"product_id": 9, "name": "Reusable Glass Bottles", "category": "Household", "price": 9.25, "material": "non_biodegradable", "recycled_content": "high", "packaging": "compostable", "lifecycle": "reusable", "recyclability": "yes", "popularity": 85, "image": "https://via.placeholder.com/200?text=Reusable+Glass+Bottles", "carbonFootprint": 1.0, "decompositionTime": "indefinite"},
    {"product_id": 10, "name": "Bounty Paper Towels", "category": "Kitchen", "price": 8.74, "material": "fully_biodegradable", "recycled_content": "low", "packaging": "compostable", "lifecycle": "disposable", "recyclability": "yes", "popularity": 70, "image": "https://via.placeholder.com/200?text=Bounty+Paper+Towels", "carbonFootprint": 1.2, "decompositionTime": "60 days"}
]
df = pd.DataFrame(products_data)

# Scoring logic
def normalize_value(value, mapping):
    for key, score in mapping.items():
        if key.lower() in value.lower():
            return score
    return 0

def score_from_response(response):
    material_score = normalize_value(response.get("material", ""), {
        "fully_biodegradable": 2.0, "compostable": 1.5, "partially_biodegradable": 1.0,
        "recyclable_only": 0.5, "non_biodegradable": 0.0
    })
    recycled_score = normalize_value(response.get("recycled_content", ""), {
        "none": 0.0, "low": 0.5, "medium": 1.0, "high": 1.5
    })
    packaging_score = normalize_value(response.get("packaging", ""), {
        "not mentioned": 0.0, "plastic": 0.0, "minimal": 1.0, "recyclable": 1.5, "compostable": 2.0
    })
    lifecycle_score = normalize_value(response.get("lifecycle", ""), {
        "disposable": 0.0, "short-term": 0.5, "durable": 1.0, "reusable": 1.5, "long-lasting": 2.0
    })
    recyclability_score = normalize_value(response.get("recyclability", ""), {
        "no": 0.0, "partial": 0.5, "yes": 1.0
    })
    total = min(10, (material_score + recycled_score + packaging_score + lifecycle_score + recyclability_score) * 2)  # Scale to 0-10
    return total

def calculate_score(row):
    data = {k: row[k] for k in ['material', 'recycled_content', 'packaging', 'lifecycle', 'recyclability']}
    return score_from_response(data)

def calculate_credits(sustainability_score):
    return int(sustainability_score * 50)  # Credits scale with score

def calculate_recyclability_percentage(row):
    return 95 if row['recyclability'].lower() == 'yes' else (50 if row['recyclability'].lower() == 'partial' else 0)

def get_concerns(row):
    concerns = []
    if row['material'].lower() == 'non_biodegradable':
        concerns.extend(['Non-biodegradable', 'Ocean pollution', 'Microplastics', 'Petroleum-based'])
    return concerns

def calculate_impact(original, eco):
    co2_saved = max(0, original['carbonFootprint'] - eco['carbonFootprint']) * 2
    plastic_reduced = max(0, 0.1 * (int(original.get('decompositionTime', '0').split()[0]) - int(eco.get('decompositionTime', '0').split()[0]))) / 10
    return {"co2Saved": co2_saved, "plasticReduced": plastic_reduced}

# Prepare data
df['sustainability_score'] = df.apply(calculate_score, axis=1)
df['credits'] = df['sustainability_score'].apply(calculate_credits)
df['recyclability_percentage'] = df.apply(calculate_recyclability_percentage, axis=1)
df = df.astype({
    'product_id': 'int64',
    'price': 'float64',
    'carbonFootprint': 'float64',
    'sustainability_score': 'float64',
    'credits': 'int64',
    'recyclability_percentage': 'int64',
    'popularity': 'int64'
}, errors='ignore')

@app.route('/search', methods=['POST'])
def search_product():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        action = data.get('action', 'search')
        product_name = data.get('name', '')
        if action == 'surprise':
            eco_product = df[df['material'] == 'fully_biodegradable'].sample(1).iloc[0]
            return jsonify({"original": {
                "id": str(eco_product['product_id']),
                "name": eco_product['name'],
                "price": float(eco_product['price']),
                "image": eco_product['image'],
                "environmentalScore": int(eco_product['sustainability_score']),
                "concerns": get_concerns(eco_product)
            }, "alternatives": []})
        if not product_name and action != 'surprise':
            return jsonify({'error': 'Product name required'}), 400
        matched = df[df['name'].str.contains(product_name, case=False, na=False)] if product_name else df
        if matched.empty:
            return jsonify({'error': 'Product not found'}), 404
        original = matched.loc[matched['sustainability_score'].idxmin()]
        alternatives = df[df.index != matched.index[matched['sustainability_score'].idxmin()]].nlargest(3, 'sustainability_score')
        original_data = {
            "id": str(original['product_id']),
            "name": original['name'],
            "price": float(original['price']),
            "image": original['image'],
            "environmentalScore": int(original['sustainability_score']),
            "concerns": get_concerns(original),
            "greenCredits": int(original['credits'])
        }
        alt_data = []
        for index, row in alternatives.iterrows():
            alt_item = {
                "id": str(row['product_id']),
                "name": row['name'],
                "brand": "EcoBrand",
                "price": float(row['price']) if pd.notna(row['price']) else 0.0,
                "image": row['image'],
                "sustainabilityScore": int(row['sustainability_score']),
                "greenCredits": int(row['credits']) if pd.notna(row['credits']) else 0,
                "ecoBenefits": ['Biodegradable', 'Renewable', 'Compostable'] if row['material'] == 'fully_biodegradable' else ['Recyclable'],
                "carbonFootprint": float(row['carbonFootprint']) if pd.notna(row['carbonFootprint']) else 0.0,
                "decompositionTime": row['decompositionTime'],
                "recyclability": int(row['recyclability_percentage']) if pd.notna(row['recyclability_percentage']) else 0
            }
            alt_data.append(alt_item)
        return jsonify({"original": original_data, "alternatives": alt_data, "totalCredits": sum(item['greenCredits'] for item in [original_data] + alt_data)})
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/cart', methods=['POST'])
def update_cart():
    try:
        data = request.get_json()
        if not data or 'items' not in data:
            return jsonify({'error': 'No cart items provided'}), 400
        cart_items = data['items']
        updated_items = []
        total = 0
        tax_rate = 0.08
        co2_saved_total = 0
        plastic_reduced_total = 0

        for item in cart_items:
            product_id = item.get('id')
            quantity = item.get('quantity', 1)
            switch_to_eco = item.get('switchToEco', False)

            product = df[df['product_id'] == int(product_id)].iloc[0]
            eco_alternative = None
            if switch_to_eco:
                eco_alternative = df[df['material'] == 'fully_biodegradable'].nlargest(1, 'sustainability_score').iloc[0]
            else:
                eco_alternative = product

            item_data = {
                "id": str(eco_alternative['product_id']),
                "name": eco_alternative['name'],
                "price": float(eco_alternative['price']) * quantity,
                "image": eco_alternative['image'],
                "quantity": quantity,
                "ecoBenefits": ['Biodegradable', 'Renewable', 'Compostable'] if eco_alternative['material'] == 'fully_biodegradable' else ['Recyclable'],
                "environmentalImpact": calculate_impact(product, eco_alternative) if switch_to_eco else None,
                "greenCredits": int(eco_alternative['credits']) * quantity
            }
            updated_items.append(item_data)
            total += item_data['price']

            if switch_to_eco:
                impact = calculate_impact(product, eco_alternative)
                co2_saved_total += impact['co2Saved'] * quantity
                plastic_reduced_total += impact['plasticReduced'] * quantity

        tax = total * tax_rate
        grand_total = total + tax

        return jsonify({
            "items": updated_items,
            "orderSummary": {
                "subtotal": round(total, 2),
                "tax": round(tax, 2),
                "total": round(grand_total, 2)
            },
            "environmentalImpact": {
                "co2Saved": round(co2_saved_total, 2),
                "plasticReduced": round(plastic_reduced_total, 2)
            },
            "totalCredits": sum(item['greenCredits'] for item in updated_items)
        })
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)