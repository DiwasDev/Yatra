import logging


import pandas as pd
from ABC import ABC, abstractmethod

class EvaluateModel(ABC):
    """Abstract base class for evaluating a model."""
    
    @abstractmethod
    def calculate_metric(self, df: pd.DataFrame):
        """
        Evaluate the model using the provided DataFrame.

        Args:
            df (pd.DataFrame): The DataFrame containing the data to evaluate.
        """
        pass

class AccuracyScore(EvaluateModel):
    """Concrete class for calculating accuracy."""
    
    def calculate_metric(self, df: pd.DataFrame):
        """
        Calculate the accuracy of the model.

        Args:
            df (pd.DataFrame): The DataFrame containing the data to evaluate.
        
        Returns:
            float: The accuracy of the model.
        """
        