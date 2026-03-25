import os
import django
from django.core.wsgi import get_wsgi_application

# 1. Устанавливаем настройки
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# 2. Инициализируем Django (это починит ошибку с переводами)
django.setup()

# 3. Импортируем call_command ПОСЛЕ django.setup()
from django.core.management import call_command

# 4. Запускаем миграции
try:
    print("Starting migrations...")
    call_command('migrate', interactive=False)
    print("Migrations finished successfully!")
except Exception as e:
    print(f"Migration failed: {e}")

# 5. Запускаем само приложение
application = get_wsgi_application()