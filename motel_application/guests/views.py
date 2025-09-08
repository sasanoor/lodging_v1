from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework import Response
from .models import AddGuest
from .serializers import GuestSerializer
# Create your views here.

class GuestViewSet(viewsets.ModelViewSet):
    queryset = AddGuest.objects.all().order_by("-created_at")
    serializer_class = GuestSerializer

    @action(detail=False, methods=["post"], url_path="add_guest")
    def add_guest(self, request):
        serializer = GuestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)