import google_streetview.api
from config import key  

#Defining the location
building_location = '22.3707694,114.1266983'

#Defining a date range
start_date = '2011-01'
end_date = '2024-03'
custom_date = [start_date, end_date]

# Define parameters for street view API
params = [{
    'size': '1920x1080', #Request Google for API privileges
    'location': building_location,
    'heading': '173.81',
    'pitch': '3',
    'tilt': '123.2',
    'fov':'80',
    'key': key,
    'date' : start_date
}]

while end_date < start_date:

	# Create a results object
	results = google_streetview.api.results(params)

	# Download images to directory 'downloads'
	results.download_links('images')
