from rest_framework.routers import DefaultRouter
from .views import DeckViewSet, CardViewSet

router = DefaultRouter()
router.register(r'decks', DeckViewSet)
router.register(r'cards', CardViewSet)

urlpatterns = router.urls