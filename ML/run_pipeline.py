import logging

from pipelines.training_pipeline import train_pipeline      


if __name__ == "__main__":
    train_pipeline(data_path = "/home/diwas/Yatra/Yatra/ML/data/booking_cleaned.csv")