# from django.shortcuts import render

# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from .models import AddGuest
# from .serializers import GuestSerializer
# # Create your views here.

# class GuestViewSet(viewsets.ModelViewSet):
#     queryset = AddGuest.objects.all().order_by("-created_at")
#     serializer_class = GuestSerializer

#     @action(detail=False, methods=["post"], url_path="add_guest")
#     def add_guest(self, request):
#         serializer = GuestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import AddGuest
# from .serializers import GuestSerializer


# class GuestViewSet(viewsets.ModelViewSet):
#     queryset = AddGuest.objects.all().order_by("-created_at")
#     serializer_class = GuestSerializer

#     # Optional: Custom POST action if you really want `/add_guest/`
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         return Response(
#             {"message": "Guest added successfully!", "data": serializer.data},
#             status=status.HTTP_201_CREATED,
#         )


from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AddGuest
from .serializers import GuestSerializer
from datetime import date, datetime
from django.db.models import Q

class GuestViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for Guests.
    POST /guests/ will create a new guest.
    GET /guests/ will list all guests.
    """
    queryset = AddGuest.objects.all().order_by("-created_at")
    serializer_class = GuestSerializer

    def create(self, request, *args, **kwargs):
        """
        Optional: Override create to return a custom success message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Guest added successfully!.", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )
    @action(detail=False, methods=["get"], url_path="today")
    def today_checkinlist(self, request):
        today = date.today()
        # today = datetime.strptime(date_str, "%Y-%m-%d").date()
        guests = AddGuest.objects.filter(
            Q(check_in_date__lte=today, check_out_date__gte=today) |  # guests currently staying
            Q(check_out_date=today)                                   # guests checking out today
        ).order_by("room_number")
        serializer = self.get_serializer(guests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
