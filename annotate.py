from roboflow import Roboflow
import supervision as sv
import cv2

image_location = '/home/misango/code/Architecture_ReadableML/Test_Run_CRF/image/Refined_November_2020.png'

rf = Roboflow(api_key="Dnpd4PGIz0Yu8Y5lBgup")
project = rf.workspace().project("crf_testing")
model = project.version(7).model

result = model.predict(image_location, confidence=1).json()

labels = [item["class"] for item in result["predictions"]]

detections = sv.Detections.from_inference(result)

label_annotator = sv.LabelAnnotator()
mask_annotator = sv.MaskAnnotator()

image = cv2.imread(image_location)

annotated_image = mask_annotator.annotate(
    scene=image, detections=detections)
annotated_image = label_annotator.annotate(
    scene=annotated_image, detections=detections, labels=labels)

sv.plot_image(image=annotated_image, size=(16, 16))