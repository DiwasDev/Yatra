import logging 

import pandas as pd
from zenml import step

class IngestData:
    """Ingests a DataFrame from a CSV file."""
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.df = None

    def ingest_data(self) -> pd.DataFrame:
        """Ingests the DataFrame from the CSV file."""
        logging.info(f"Ingesting data from {self.data_path}")
        try:
            self.df = pd.read_csv(self.data_path)
            logging.info(f"Dat ingested from {self.data_path} with shape {self.df.shape}")
            return self.df
        except Exception as e:
            logging.error(f"Failed to ingest data from {self.data_path} {e}")
            raise e
        
@step
def ingest_df(data_path: str) -> pd.DataFrame:
    """
    Ingests a DataFrame from a CSV file.

    Args:  
        data_path (str): The path to the CSV file.
    Returns:
        pd.DataFrame: The ingested DataFrame.
    """
    try:
        ingestor = IngestData(data_path)
        df = ingestor.ingest_data()
        return df
    except Exception as e:
        logging.error(f"Error in ingest_df step: {e}")
        raise e