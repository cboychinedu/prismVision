#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import cv2 
import time 
import random 
import ollama 
import numpy as np 
from ultralytics import YOLO 

# Setting the root path to the instance segmentation model 
modelPath = os.path.sep.join(["machineLearning", "models"])

# Creating a class for loading the machine model, and 
# Performing the instance segmentation and VLM analysis
class PerformMachineLearningInference:        
    # Creating a method for performing the instance segementation 
    def performInstanceSegmentation(self, imageBytes):
        # Setting the path to the model, and some necessary configurations  
        self.modelPath = os.path.sep.join([modelPath, "yolo11n-seg.pt"]) 
        self.paddingX = 10 
        self.paddingY = 10 
        self.fontScale = 3 
        self.thickness = 15 
        self.font = cv2.FONT_HERSHEY_SIMPLEX
        self.backgroundColor = (255, 0, 189)
        self.textColor = (255, 255, 255)
        self.predictedValues = []
        
        # Using try except method to load the model and perform the ML operations 
        try:
            # Load the instance segementation model 
            self.model = YOLO(self.modelPath)
            
            # Running the inference 
            results = self.model.predict(source=imageBytes, save=False, conf=0.25)
            
            # Creating a copy of the annotated image 
            annotatedImage = results[0].orig_img.copy() 
            
            # Drawing the loop on the image 
            if results[0].masks is not None: 
                # Draw the segmentation on the image 
                for mask, box in zip(results[0].masks.xy, results[0].boxes): 
                    # Create a semi-transparent green mask overlay
                    overlay = annotatedImage.copy() 
                    points = np.array(mask, dtype=np.int32)
                    cv2.fillPoly(overlay, [points], color=(255, 0, 189))
                    
                    # Blend the overlay with the original (alpha=0.4 for transparency)
                    cv2.addWeighted(overlay, 0.4, annotatedImage, 0.6, 0, annotatedImage)
                    
                    # Get the predicted label, and it's probability scored 
                    label = f"{self.model.names[int(box.cls)]}: {float(box.conf):.2f}"
                    
                    # Saving the predicted values inside the array 
                    self.predictedValues.append(label) 
                    
                    # Find the top-most point of the mask to place the label 
                    x, y = points[np.argmin(points[:, 1])]
                    
                    # Calculate the text size 
                    (tw, th), _ = cv2.getTextSize(label, self.font, self.fontScale, self.thickness)
                    
                    # Draw a background rectangle with padding, and subtract 
                    # padding from y and add it to x/th to expand the box 
                    bgRectStart = (x, y - th - (self.paddingY * 2))
                    bgRectEnd = (x + tw + (self.paddingX * 2), y)
                    
                    # Draw the rectangle on the annotated image 
                    cv2.rectangle(annotatedImage, bgRectStart, bgRectEnd, self.backgroundColor, -1) 
                    
                    # Draw the bold text, add paddingX to the x-coordinate so the text isn't touching the 
                    # left edge, and then subtract paddingY from the y-coordinate to center it vertically 
                    textPosition = (x + self.paddingX, y - self.paddingY)
                    cv2.putText(annotatedImage, label, textPosition, 
                            self.font, self.fontScale, self.textColor, self.thickness, cv2.LINE_AA)
                    
            # Returning the segmented image inside a tuple  
            return (annotatedImage, self.predictedValues);
        
        # if the model file is not found 
        except FileNotFoundError as error: 
            # Catch specific error if the file is not found 
            raise FileNotFoundError(f"Model file not found at: {self.modelPath}")
        
        # On exception generated, return Null/None type values 
        except Exception as error: 
            # Display the error message 
            print("[ERROR]: ", error); 
            
            # Raise the error 
            raise Exception(error); 
    
    
    # Creating a method for performing the VLM inference 
    def performVlmInference(self, imageBytes, predictedValues): 
        # Using try except block to process the image 
        try: 
            # Start the timer immediately before the call 
            startTime = time.perf_counter()
            
            # Convert the list of values to a comma seperated string 
            predictedValues = ", ".join(predictedValues) 
            
            # Perform inference using ollama (Gemma- GOOGLE)
            response = ollama.generate(
                model="gemma3",
                prompt = f"""
                    Context: The following objects were detected via instance segmentation: {predictedValues}.
                    Task: Use this data and the image to write a professional narrative analysis of the scene. 
                    Focus on how these objects interact, and tell me about the objects, their predicted labels, confidence score for 
                    each labels and contextual understanding.
                    Count the number of persons in the image.  
                """, 
                images=[imageBytes]
            )
            
            # Setting the stop timer immediately after the response is received 
            stopTime = time.perf_counter() 
            
            # Getting the duration 
            duration = stopTime - startTime
            
            # Getting the inference text 
            inferenceText = response.get("response", "No interpretation available.")
            
            # Returning the result 
            return (inferenceText, duration)
            
        # On error generated, execute the block of code below 
        except Exception as error: 
            # Log the error 
            print(f"Error occured: {error}")
            
            # Return the error message 
            return (None, None); 
        
        
        
        
# prompt=f"""
#     ### SYSTEM ROLE
#     You are an expert computer vision analyst. Your task is to provide a detailed, narrative description of an image based on both the visual input and a list of detected object instances provided by a segmentation engine.

#     ### CONTEXT DATA (From YOLOv11)
#     Detected Instances: {predictedValues}

#     ### INSTRUCTIONS
#     1. Analyze the provided image in conjunction with the detected instances listed above.
#     2. Describe the scene's composition, focusing on the spatial relationships between the detected objects.
#     3. Explain the context or "story" of the image (e.g., if you see a 'car' and 'traffic light', describe the traffic situation).
#     4. Be concise but descriptive. Do not simply list the objects; weave them into a coherent narrative.
#     5. If the segmentation engine detected something unusual or specific, highlight its importance in the scene.

#     ### RESPONSE FORMAT
#     Provide a single paragraph of narrative analysis. Avoid phrases like "The image shows" or "I see." Start directly with the description.
# """,  
