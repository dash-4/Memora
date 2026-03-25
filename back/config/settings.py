from pathlib import Path
from datetime import timedelta
import os
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-your-secret-key-change-in-production')

DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'memora-265q.vercel.app',
    'memora-pink-iota.vercel.app',
    'localhost',
    '127.0.0.1',
    '.vercel.app',
]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist', 
    'corsheaders',
    'django_filters',
    'taggit', 
    'accounts',
    'cards',
    'pet',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

def _normalize_database_url(raw):
    """
    Normalize `DATABASE_URL` coming from Vercel env vars.

    Sometimes Vercel provides values wrapped/serialized like:
    - "b'postgresql://...'" (bytes-literal string)
    - "b''://host/db" (broken prefix, scheme becomes "b''")

    `dj_database_url.parse()` is strict about schemes, so we aggressively extract
    the first valid postgres DSN substring.
    """
    if raw is None:
        return None

    # Be defensive: env vars should be str, but handle bytes just in case.
    if isinstance(raw, bytes):
        raw = raw.decode("utf-8", errors="replace")

    s = str(raw).strip()

    import re

    # Strip surrounding quotes: '"..."' or "'...'" (sometimes happens in env editors).
    if (s.startswith("'") and s.endswith("'")) or (s.startswith('"') and s.endswith('"')):
        s = s[1:-1].strip()

    # Fix broken bytes-prefixes with optional whitespace: b'' ://...
    s = re.sub(r"^b''\s*://", "postgresql://", s)
    s = re.sub(r'^b""\s*://', "postgresql://", s)

    # If it is a bytes-literal string like: b'postgresql://...'
    # remove the wrapper if it is properly closed.
    s = re.sub(r"^b'([^']*)'$", r"\1", s)
    s = re.sub(r'^b"([^"]*)"$', r"\1", s)

    # Final extraction: pull the first valid postgres DSN substring from anywhere.
    # This covers cases with extra prefixes/suffixes.
    m = re.search(r"(postgres(?:ql)?://[^\s'\"<>]+)", s, flags=re.IGNORECASE)
    if m:
        s = m.group(1)

    s = s.strip()

    # Last-resort sanity: if scheme is still broken but DSN delimiter exists, repair it.
    if s.startswith("b''") and "://" in s:
        rest = s.split("://", 1)[1]
        s = "postgresql://" + rest

    return s


DATABASE_URL = _normalize_database_url(os.environ.get("DATABASE_URL"))

DATABASES = {
    'default': dj_database_url.parse(DATABASE_URL, conn_max_age=600)
}
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
# STATIC_ROOT = BASE_DIR / 'staticfiles'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'OPTIONS': {'MAX_ENTRIES': 500},
    },
}
CACHE_TAGS_TTL = 300
CACHE_STATS_TTL = 120

AUTH_USER_MODEL = 'accounts.User'

# CORS_ALLOWED_ORIGINS = os.environ.get(
#     'CORS_ALLOWED_ORIGINS',
#     'http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,https://memora-r0392qk0q-dashas-projects-16d425a3.vercel.app,https://memora-pink-iota.vercel.app'
# ).split(',')
CORS_ALLOWED_ORIGINS = [
    "https://memora-pink-iota.vercel.app",
    "https://memora-265q.vercel.app", # бэкенд тоже добавляем для тестов в Browsable API
    "http://localhost:3000",
    "http://localhost:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "https://memora-pink-iota.vercel.app",
    "https://memora-265q.vercel.app",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    "DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept", "accept-encoding", "authorization", "content-type",
    "dnt", "origin", "user-agent", "x-csrftoken", "x-requested-with",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 50,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
    'EXCEPTION_HANDLER': 'config.exceptions.custom_exception_handler',
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    },
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
