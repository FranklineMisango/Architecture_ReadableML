import google_streetview.api
from config import key  

# Defining the location
building_location = '22.3707694,114.1266983'

# Defining a date range
start_date = '2011-01'
end_date = '2024-03'
custom_date = [start_date, end_date]

# Define parameters for street view API
params = [{
    'size': '1920x1080', # Request Google for API privileges
    'location': building_location,
    'heading': '173.81',
    'pitch': '3',
    'tilt': '123.2',
    'fov':'80',
    'key': key,
    'date': start_date
}]

# Convert start_date and end_date to datetime objects for comparison
import datetime
start_date = datetime.datetime.strptime(start_date, "%Y-%m")
end_date = datetime.datetime.strptime(end_date, "%Y-%m")

while start_date < end_date:
    # Create a results object
    results = google_streetview.api.results(params)

    if results :
        print("Results saved")
    # Download images to directory 'downloads'
    results.download_links('images')
    
    # Move to the next month
    start_date += datetime.timedelta(days=30)  # Assuming each month has 30 days for simplicity
    params[0]['date'] = start_date.strftime("%Y-%m")
