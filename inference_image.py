import torch
import argparse
import cv2
import os

from utils import get_segment_labels, draw_segmentation_map, image_overlay
from PIL import Image
from config import ALL_CLASSES
from model import prepare_model

def process_image(image_path, model, device):
    try:
        # Read the image.
        image = Image.open(image_path)

        # Resize very large images (if width > 1024.) to avoid OOM on GPUs.
        if image.size[0] > 1024:
            image = image.resize((800, 800))

        # Do forward pass and get the output dictionary.
        outputs = get_segment_labels(image, model, device)
        # Get the data from the `out` key.
        outputs = outputs['out']
        segmented_image = draw_segmentation_map(outputs)
        
        final_image = image_overlay(image, segmented_image)
        return final_image
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return None

def main(args):
    # Set computation device.
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    model = prepare_model(len(ALL_CLASSES))
    ckpt = torch.load('../outputs/best_model.pth')
    model.load_state_dict(ckpt['model_state_dict'])
    model.eval().to(device)

    out_dir = os.path.join('..', 'outputs', 'inference_results')
    os.makedirs(out_dir, exist_ok=True)

    all_image_paths = os.listdir(args.input)
    for i, image_path in enumerate(all_image_paths):
        print(f"Processing Image {i+1}: {image_path}")
        # Process the image
        final_image = process_image(os.path.join(args.input, image_path), model, device)
        
        if final_image is not None:
            # Display the segmented image
            cv2.imshow('Segmented image', final_image)
            cv2.waitKey(1)

            # Save the segmented image
            cv2.imwrite(os.path.join(out_dir, image_path), final_image)

    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Construct the argument parser.
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--input', help='path to input dir')
    args = parser.parse_args()

    if args.input:
        main(args)
    else:
        print("Please provide the input directory path.")
