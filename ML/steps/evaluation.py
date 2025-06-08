import logging

import pandas as pd
import numpy as np

from zenml import step

@step
def evaluate(df: pd.DataFrame):
    pass