#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import json 
from bson.objectid import ObjectId 

# Creating a class for handling the database operations 
class HandleUsersDatabase: 
    # Creating getInferenceById method for getting the users 
    # inference by the specified id value 
    def getInferenceById(self, collectionName, id): 
        # Creating the mongodb query 
        query = {"_id": ObjectId(id)}
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Find one inference data by the id value 
        inferenceDataById = collection.find_one(query, {
            "_id": 1, 
            "segementedImage": 1, 
            "vlmText": 1, 
            "duration": 1, 
            "createdAt": 1
        })
        
        # If the returned data type is None type, execute the block of code below 
        if inferenceDataById is None: 
            # Return the None type as a data 
            return None; 
        
        # Else convert the data into a json object 
        else: 
            # Conert the MongoDB documents into a json object 
            inferenceDataById = json.dumps(dict(inferenceDataById), default=str)
            
            # Returning the json object 
            return inferenceDataById;  
    
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
    
    # Creating a method for saving the user's predicted values on the database 
    def saveUsersInferenceInformation(self, collectionName, data): 
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Saving the user's inference data 
        # Note: PyMongo adds the '_id' to the 'data' dict during this call
        inferenceResult = collection.insert_one(data)
        
        # If the insertion was successful
        if inferenceResult.acknowledged:
            # We use json.dumps with default=str to convert the ObjectId to a string
            return json.dumps(data, default=str)
        
        # Return None or an error message if it failed
        return False 
    
    # Creating a database for getting the users analyzed history 
    def getUsersAnalyzedHistory(self, collectionName, email): 
        # Creating the the mongodb query 
        query = { "email": email }
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Find all the analyzed data for this specific user 
        results = collection.find(query, {
            "_id": 1, 
            "segementedImage": 1, 
            "vlmText": 1, 
            "duration": 1, 
            "createAt": 1, 
            "email": 1
        })
        
        # Convert the results into a list 
        resultsList = list(results) 
        
        # if the returned data type is None type, execute the block of code below 
        if not resultsList: 
            # Return none 
            return None; 
        
        # Else convert the data into a json object 
        jsonData = json.dumps(resultsList, default=str)
        
        # Return the json object 
        return jsonData; 
    
    # Creating a method for deleting the user's analyzed history data 
    def deleteUsersAnalyzedHistory(self, _id, email, collectionName="predictions"): 
        # Creating the mongodb query 
        query = { "email": email, "_id": ObjectId(_id) }
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Deleting the history data 
        result = collection.delete_one(query)
        
        # if the deleted count is greater than zero(0), 
        # Execute the block of code below 
        if result.deleted_count > 0: 
            # Returning the status report 
            return { "status": "success", "message": "History deleted!", "statusCode": 200 }; 
        
        # Else if the deleted count is equal to zero, or less than 
        # Execute the block of code below 
        else: 
            # Return none 
            return { "status": "error", "message": "Unable to delete record!", "statusCode": 402 }; 
        