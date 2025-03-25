import os
from flask import Flask, render_template

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-secret-key")

@app.route('/')
def index():
    """Render the main page with the responsive iframe."""
    return render_template('index.html')

# Additional routes can be added here if needed

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
