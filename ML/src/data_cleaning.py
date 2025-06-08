
import logging

import pandas as pd
import numpy as np
from abc import ABC, abstractmethod
from sklearn.preprocessing import LabelEncoder

# Strategy Interface
class DataCleaningStrategy(ABC):
    """
    Abstract base class for data cleaning strategies.
    
    This interface defines a contract for cleaning strategies to process a pandas DataFrame.
    Each concrete strategy should implement the `clean` method to perform a specific cleaning task.
    """
    @abstractmethod
    def clean(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean the input DataFrame.
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame.
        """
        pass

class BasicCleaningStrategy(DataCleaningStrategy):
    """
    Concrete strategy for basic data cleaning operations.
    """
    def clean(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Perform basic cleaning operations on the DataFrame.
        
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame.
        """
        logging.info("Performing basic cleaning operations")
        # Dropping duplicated values based on 'booking_id'
        df = df.drop_duplicates(subset=['booking_id'])
        # Remove unnecessary columns
        df = df.drop(columns=['booking_id'])
        return df

# Concrete Strategy: Handle Missing Values
class MissingValueHandler(DataCleaningStrategy):
    """
    Concrete strategy for handling missing values in the dataset.
    """
    def clean(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Handle missing values in the DataFrame.
        
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame with missing values handled.
        """
        logging.info("Handling missing values")
        # Impute numerical columns with median
        numerical_cols = ['number_of_adults', 'number_of_children', 'number_of_weekend_nights',
                         'number_of_week_nights', 'lead_time', 'average_price', 'special_requests',
                         'car_parking_space', 'p_c', 'p_not_c']
        for col in numerical_cols:
            df[col] = df[col].fillna(df[col].median())
        # Impute categorical columns with mode
        categorical_cols = ['type_of_meal', 'room_type', 'market_segment_type', 'booking_status']
        for col in categorical_cols:
            df[col] = df[col].fillna(df[col].mode()[0])
        # Drop rows with missing date_of_reservation
        df = df.dropna(subset=['date_of_reservation'])
        return df

# Concrete Strategy: Handle Outliers
class OutlierHandler(DataCleaningStrategy):
    """
    Concrete strategy for handling outliers in the dataset.
    """
    def clean(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Handle outliers in the DataFrame.
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame with outliers handled.
        """
        logging.info("Handling outliers")
        # Remove rows with zero adults and children
        df = df[(df['number_of_adults'] > 0) | (df['number_of_children'] > 0)]
        # Replace zero/negative average_price with median
        median_price = df['average_price'].median()
        df.loc[df['average_price'] <= 0, 'average_price'] = median_price
        # Apply IQR-based capping for continuous numeric features
        continuous_cols = ['number_of_adults', 'number_of_children', 'number_of_weekend_nights', 
                           'number_of_week_nights']
        Q1 = df[continuous_cols].quantile(0.25)
        Q3 = df[continuous_cols].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        df[continuous_cols] = df[continuous_cols].clip(lower=lower, upper=upper, axis=1)
        # Cap lead_time at 365 days
        df['lead_time'] = df['lead_time'].clip(upper=365)
        return df

# Concrete Strategy: Standardize Dates
class DateStandardizer(DataCleaningStrategy):
    """
    Concrete strategy for standardizing date formats in the dataset.
    """
    def clean(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Standardize date formats in the DataFrame.
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame with standardized date formats.
        """
        logging.info("Standardizing date formats")
        # Convert to datetime, handle invalid dates
        df['date_of_reservation'] = pd.to_datetime(df['date_of_reservation'], errors='coerce')
        # Impute NaT with mode date
        mode_date = df['date_of_reservation'].mode()[0]
        df['date_of_reservation'] = df['date_of_reservation'].fillna(mode_date)
        # Fix invalid dates (e.g., 2018-2-29 to 2018-2-28)
        df['date_of_reservation'] = df['date_of_reservation'].apply(
            lambda x: x.replace(day=28) if x.month == 2 and x.day == 29 else x
        )
        return df

# Concrete Strategy: Encode Categorical Variables
class CategoricalEncoder(DataCleaningStrategy):
    """
    Concrete strategy for encoding categorical variables in the dataset.
    """
    def clean(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Encode categorical variables in the DataFrame.
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame with categorical variables encoded.
        """
        logging.info("Encoding categorical variables")
        # One-hot encode categorical features
        cat_cols = ['type_of_meal', 'room_type', 'market_segment_type']
        df = pd.get_dummies(df, columns=cat_cols, drop_first=True)
        # Label encode booking_status
        le = LabelEncoder()
        df['booking_status'] = le.fit_transform(df['booking_status'])
        return df

# Context Class
class DataCleaner:
    """
    Context class that orchestrates the application of cleaning strategies.
    """
    def __init__(self, strategies: list[DataCleaningStrategy]):
        """
        Initialize with a list of cleaning strategies.
        Args:
            strategies (list[DataCleaningStrategy]): List of strategies to apply.
        """
        self.strategies = strategies
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Apply all cleaning strategies to the DataFrame.
        Args:
            df (pd.DataFrame): The DataFrame to clean.
        Returns:
            pd.DataFrame: The cleaned DataFrame.
        """
        logging.info("Starting data cleaning process")
        cleaned_df = df.copy()
        for strategy in self.strategies:
            cleaned_df = strategy.clean(cleaned_df)
        logging.info("Data cleaning completed")
        return cleaned_df
