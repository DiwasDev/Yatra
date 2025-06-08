import logging

import pandas as pd
import numpy as np

from zenml import step

@step
def clean_df(df: pd.DataFrame):
    pass