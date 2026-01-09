from django.db import models

class Deck(models.Model):
    vk_id = models.BigIntegerField()  # ID пользователя из ВК
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Card(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name='cards')
    front = models.TextField()  # лицевая сторона
    back = models.TextField()   # обратная сторона
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.front[:50]