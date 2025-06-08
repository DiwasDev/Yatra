import logging

import pandas as pd
import numpy as np 

from steps.ingest_df import ingest_df
from steps.clean_df import clean_df
from steps.model_train import train_model
from steps.evaluation import evaluate

from zenml import pipeline

@pipeline
def train_pipeline(data_path:str):
    """
    A training pipeline that ingests data, cleans it, trains a model, and evaluates it.

    Args:
        data_path (str): The path to the CSV file containing the data.
    """
    # Ingest the DataFrame
    df = ingest_df(data_path=data_path)

    # Clean the DataFrame
    cleaned_df = clean_df(df)

    # Train the model
    model = train_model(df)

    # Evaluate the model
    evaluation_results = evaluate(df)