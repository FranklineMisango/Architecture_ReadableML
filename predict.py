from roboflow import Roboflow
import json 



rf = Roboflow(api_key="Dnpd4PGIz0Yu8Y5lBgup")
project = rf.workspace("franklines-space-ywbil").project("crf_testing")
model = project.version(5).model
image_location = "/home/misango/code/Architecture_ReadableML/Test_images/Test_screenshot.png"

# infer on a local image
saved_json = model.predict(image_location, confidence=40, labels='draw').json()
# Save the JSON object to a file
with open('saved_prediction.json', 'w') as f:
    json.dump(saved_json, f)

# visualize your prediction
model.predict(image_location, confidence=1).save("prediction.jpg")


# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())