import logging

import pandas as pd
import numpy as np

from zenml import step

@step
def train_model(df: pd.DataFrame):
    pass