#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import json 
from bson.objectid import ObjectId 

# Creating a class for handling the database operations 
class HandleUsersDatabase: 
    # Creating a method for getting the user's information 
    def getUsersInformation(self, collectionName, email): 
        # Creating the mongodb query 
        query = { "email": email }
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Find one data by the specified email address 
        userData = collection.find_one(query, {
            "_id": 1, 
            "fullname": 1, 
            "email": 1, 
            "password": 1
        })
        
        # If the returned data type is None type, execute the block of code 
        # below 
        if userData is None: 
            # Return the None type as a data 
            return None; 
        
        # Else convert the data into a json object 
        else: 
            # Convert the MongoDB documents into a json object 
            userData = json.dumps(dict(userData), default=str)
            
            # Returning the json object 
            return userData; 
        
    # Creating a method for saving the user's information 
    def saveUsersInformation(self, collectionName, data): 
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Saving the users data 
        result = collection.insert_one(data)
        
        # Returning the result 
        return result.acknowledged