from rest_framework import serializers
from .models import AddGuest

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddGuest
        fields = "__all__"
