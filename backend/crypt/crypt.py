#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import json 
from cryptography.fernet import Fernet 

# Creating a class for performing encryption and decryption 
class Cryptography:
    # Init method 
    def __init__(self):
        # Using try except method to read the encryption key 
        try: 
            # Load the encryption key 
            self.encryptionKey = bytes(os.getenv("ENCRYPTION_KEY").encode()) 
            self.cipherSuite = Fernet(self.encryptionKey)
        
        # Except if the key is not found 
        except Exception as error: 
            # Raise an error 
            raise Exception(error); 
        
    # Creating a method for decrypting the clearance code data 
    def decryptClearanceCode(self, clearanceCode:str) -> dict: 
        # Checking if the clearance Code is an empty string 
        if (clearanceCode == ""): 
            # Building the clearance response data 
            clearanceResponseData = {
                "status": "info", 
                "message": "Clearance code missing", 
                "statusCode": 404
            }
            
            # Sending the error response 
            return clearanceResponseData
        
        # Decrypt the incoming data by using try except block 
        try: 
            # Decrypt the clearance code 
            decryptedBytes = self.cipherSuite.decrypt(clearanceCode.encode())
            clearanceData = json.loads(decryptedBytes.decode())
            
            # Building the clearance response data 
            clearanceResponseData = {
                "status": "success", 
                "clearanceData": clearanceData, 
                "message": "|Clearance data decrypted", 
                "statusCode": 200
            }
            
            # Returning the response 
            return clearanceResponseData
        
        # Except there was an error decrypting the clearance code 
        # Execute this block of code 
        except Exception as error: 
            # Create the error response 
            clearanceResponseData = {
                "status": "error", 
                "message": f"Invalid Key code {str(error)}", 
                "statusCode": 500
            }
            
            # Sending the error response data 
            return clearanceResponseData
        