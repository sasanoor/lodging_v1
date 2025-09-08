from django.db import models

class AddGuest(models.Model):
    room_number = models.IntegerField()
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip = models.CharField(max_length=20, blank=True, null=True)
    car = models.CharField(max_length=100, blank=True, null=True)
    license_plate = models.CharField(max_length=50, blank=True, null=True)
    telephone = models.CharField(max_length=50, blank=True, null=True)
    check_in_date = models.DateField()
    check_in_time = models.TimeField()
    check_out_date = models.DateField()
    check_out_time = models.TimeField(default="11:00")
    amount_cash = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    amount_credit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    amount_balance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    number_of_days = models.IntegerField(blank=True, null=True)
    clerk_name = models.CharField(max_length=100, blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    no_of_guests = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (Room {self.room_number})"
