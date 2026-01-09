from rest_framework import viewsets
from .models import Deck, Card
from .serializers import DeckSerializer, CardSerializer

class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

    def get_queryset(self):
        vk_id = self.request.query_params.get('vk_id')
        if vk_id:
            return Deck.objects.filter(vk_id=vk_id)
        return Deck.objects.none()

    def perform_create(self, serializer):
        serializer.save(vk_id=self.request.data['vk_id'])

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def get_queryset(self):
        vk_id = self.request.query_params.get('vk_id')
        deck_id = self.kwargs.get('deck_pk')  # если вложенный
        if vk_id:
            return Card.objects.filter(deck__vk_id=vk_id)
        return Card.objects.none()