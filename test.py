from roboflow import Roboflow
rf = Roboflow(api_key="Dnpd4PGIz0Yu8Y5lBgup")
project = rf.workspace("franklines-space-ywbil").project("crf_testing")
version = project.version(1)
dataset = version.download("yolov8")