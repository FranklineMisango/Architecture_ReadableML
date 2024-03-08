# Import google_streetview for the api module
import google_streetview.api
from config import key

# Define parameters for street view api
params = [{
	'size': '1920x1080', 
	'location': '22.3707816,114.1267948',
	'heading': '151.78',
	'pitch': '-0.76',
	'key': key
}]

# Create a results object
results = google_streetview.api.results(params)

# Download images to directory 'downloads'
results.download_links('images')
