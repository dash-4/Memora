import os
import sys
from pathlib import Path

import django
from django.core.management import call_command
from django.core.wsgi import get_wsgi_application

# Ensure `config.*` from `back/config/*` is importable when Vercel executes from repo root.
BACK_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACK_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Cold-start initialization for serverless.
django.setup()

def _safe_run_migrations() -> None:
    try:
        # Running migrations ensures tables exist for first authorization attempts.
        call_command('migrate', interactive=False, verbosity=0)
    except Exception as exc:
        # Avoid hard 500s due to migration race conditions; request handling can still work
        # depending on DB state.
        print(f'[wsgi] migrate failed: {exc}', file=sys.stderr)


def _safe_compile_messages() -> None:
    # Compile only if there are any `.po` files present.
    locale_dir = BACK_DIR / 'locale'
    if not locale_dir.exists():
        return
    try:
        has_po = any(locale_dir.rglob('*.po'))
        if has_po:
            call_command('compilemessages', interactive=False, verbosity=0)
    except Exception as exc:
        print(f'[wsgi] compilemessages failed: {exc}', file=sys.stderr)


_safe_run_migrations()
_safe_compile_messages()

# Vercel Django setups typically look for `app`; keep `application` for compatibility.
app = get_wsgi_application()
application = app