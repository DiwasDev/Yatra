import logging

from pipelines.training_pipeline import train_pipeline      


if __name__ == "__main__":
    train_pipeline(data_path = "data/booking_cleaned.csv")