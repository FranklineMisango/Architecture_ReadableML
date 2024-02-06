import re
def extract_lat_long_from_url(url):
    """
    Extract latitude and longitude from a Google Maps URL.
    :param url: Google Maps URL as a string.
    :return: A tuple containing latitude and longitude as strings, or (None, None) if not found.
    """
    regex = r"@([0-9.-]+),([0-9.-]+)"
    match = re.search(regex, url)
    if match:
        latitude, longitude = match.groups()
        return latitude, longitude
    else:
        return None, None

long_url = "https://www.google.com/maps/place/Kwai+Chung+Estate+Yat+Kwai+House,+Castle+Peak+Rd+-+Kwai+Chung,+Kwai+Chung/@22.3707816,114.1267948,3a,75y,177.58h,96.36t/data=!3m6!1e1!3m4!1suJNFEISDxr2sOB1f2YSDNA!2e0!7i16384!8i8192!4m17!1m9!3m8!1s0x3403f891979ab269:0x25369f1edebb106e!2sKwai+Chung+Estate+Yat+Kwai+House,+Castle+Peak+Rd+-+Kwai+Chung,+Kwai+Chung!3b1!8m2!3d22.3693916!4d114.1274462!10e5!16s%2Fg%2F12hnfykl0!3m6!1s0x3403f891979ab269:0x25369f1edebb106e!8m2!3d22.3693916!4d114.1274462!10e5!16s%2Fg%2F12hnfykl0?entry=ttu"
lat, long = extract_lat_long_from_url(long_url)
print(lat)
print(long)