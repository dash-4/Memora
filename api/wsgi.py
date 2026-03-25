import sys
from pathlib import Path

# Make `back/` importable so we can access `config.wsgi`.
BACK_DIR = Path(__file__).resolve().parents[1] / "back"
sys.path.insert(0, str(BACK_DIR))

# `back/config/wsgi.py` exports `app`.
from config.wsgi import app  # noqa: F401

