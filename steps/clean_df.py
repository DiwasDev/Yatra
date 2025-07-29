import logging

import pandas as pd
import numpy as np

from src.data_cleaning import (
    DataCleaner,
    BasicCleaningStrategy,
    MissingValueHandler,
    OutlierHandler,
    DateStandardizer,
    CategoricalEncoder,
    DataDivideStrategy
)

from typing import Tuple
from typing import Annotated


from zenml import step

@step
def clean_df(df: pd.DataFrame) -> Tuple[
    Annotated[pd.DataFrame, "X_train"],
    Annotated[pd.DataFrame, "X_test"],
    Annotated[pd.Series, "y_train"],
    Annotated[pd.Series, "y_test"]
    ]:
    """
    Clean the input DataFrame by performing basic cleaning operations.

    Args:
        df (pd.DataFrame): The DataFrame to clean.

    Returns:
        pd.DataFrame: The cleaned DataFrame.
    """
    logging.info("Performing basic cleaning operations")
    
    try:
         strategies = [
        BasicCleaningStrategy(),
        DateStandardizer(),
        MissingValueHandler(),
        OutlierHandler(),
        CategoricalEncoder(),
        DataDivideStrategy()
        ]
         
         # Clean data
         cleaner = DataCleaner(strategies)
         X_train, X_test, y_train, y_test = cleaner.clean_data(df)

         return  X_train, X_test, y_train, y_test
    
    except Exception as e:
        logging.error(f"Error in clean_df step: {str(e)}")
        raise e
