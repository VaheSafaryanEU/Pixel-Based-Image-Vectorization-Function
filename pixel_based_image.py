import numpy as np
from PIL import Image
import os

def image_to_vector(image_path):
    img = Image.open(image_path).convert('L')
    img_array = np.array(img)
    img_vector = img_array.flatten()
    return img_vector

def images_to_vectors(image_folder):
    image_vectors = []
    for filename in os.listdir(image_folder):
        if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
            image_path = os.path.join(image_folder, filename)
            image_vector = image_to_vector(image_path)
            image_vectors.append(image_vector)
    return image_vectors

image_folder = "m_images" 
image_vectors = images_to_vectors(image_folder)

# Test one
if image_vectors:
    print(f"First image vector shape: {image_vectors[0].shape}")
