import time
import argparse

import pandas as pd

import torch
import torch.nn.functional as F
import torch.optim as optim

from torch.utils.data import (
    Dataset,
    DataLoader,
    RandomSampler,
    SequentialSampler,
    random_split,
)
from torch import nn

from get_data import features, playlists

"""
Model will use 
- cross entropy 
- 2 hidden layers? 
"""


class MusicDataset(Dataset):
    def __init__(self, songs, moods):
        self.songs = songs
        self.moods = moods

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, i):
        return torch.FloatTensor(self.songs[i]), self.moods[i]


class SpotifyMoodModel(nn.Module):
    def __init__(self, num_features, num_classes):
        super().__init__()
        self.input = nn.Linear(num_features, 512)
        self.layer_1 = nn.Linear(512, 128)
        self.layer_2 = nn.Linear(128, 64)
        self.output = nn.Linear(64, num_classes)

        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(p=0.4)
        self.batchnorm1 = nn.BatchNorm1d(512)
        self.batchnorm2 = nn.BatchNorm1d(128)
        self.batchnorm3 = nn.BatchNorm1d(64)

    def forward(self, x):
        x = self.input(x)
        x = self.batchnorm1(x)
        x = self.relu(x)

        x = self.layer_1(x)
        x = self.batchnorm2(x)
        x = self.relu(x)
        x = self.dropout(x)

        x = self.layer_2(x)
        x = self.batchnorm3(x)
        x = self.relu(x)
        x = self.dropout(x)

        x = self.output(x)

        return x


def train(
    model: SpotifyMoodModel,
    train_dataloader,
    val_dataloader,
    epochs,
    batch_size=64,
    lr=0.01,
):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr, betas=(0.9, 0.98), eps=1e-9)

    for epoch_i in range(0, epochs):
        print(f"Beginning epoch {epoch_i + 1} of {epochs}")

        train_epoch_loss = 0
        model.train()

        for x_train_batch, y_train_batch in train_dataloader:
            b_song_features = x_train_batch
            b_moods = y_train_batch

            optimizer.zero_grad()

            y_train_pred = model(b_song_features)

            train_loss = criterion(y_train_pred, b_moods)
            train_loss.backward()
            optimizer.step()

            train_epoch_loss += train_loss.item() * x_train_batch.size(0)
        print(
            f"Epoch {epoch_i + 1}: | Train Loss: {train_epoch_loss/len(train_dataloader.sampler):.5f} "
        )

    eval(model, val_dataloader)

    torch.save(model.state_dict(), "./model.pt")


def eval(model: SpotifyMoodModel, val_dataloader):
    model.eval()
    val_acc = 0
    for X_val_batch, y_val_batch in val_dataloader:
        y_val_pred = model(X_val_batch)
        y_pred_softmax = torch.log_softmax(y_val_pred, dim=1)
        _, y_pred_tags = torch.max(y_pred_softmax, dim=1)

        correct_pred = (y_pred_tags == y_val_batch).float()
        acc = correct_pred.sum() / len(correct_pred)
        acc = torch.round(acc * 100)

        val_acc += acc

    print("Model accuracy: {:.3f}%".format((val_acc / len(val_dataloader)).item()))


def load_model(path):
    model = SpotifyMoodModel(len(features[1:]), len(playlists))
    model.load_state_dict(torch.load(path))

    return model


def main(train_model: bool = False, evaluate_model: bool = False):
    # pp = pprint.PrettyPrinter(indent=4)
    if train_model:
        bs = 64

        df = pd.read_csv("./data.csv")

        moods = df["mood"].to_numpy()
        song_features = df[features[1:]].to_numpy()

        dataset = MusicDataset(song_features, moods)

        train_size = int(0.8 * len(dataset))
        val_size = len(dataset) - train_size
        train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

        model = SpotifyMoodModel(len(features[1:]), len(playlists))

        train_dataloader = DataLoader(
            train_dataset,
            sampler=RandomSampler(train_dataset),  # Sampling for training is random
            batch_size=bs,
        )

        validation_dataloader = DataLoader(
            val_dataset,
            sampler=SequentialSampler(
                val_dataset
            ),  # Sampling for validation is sequential as the order doesn't matter.
            batch_size=bs,
        )
        train(model, train_dataloader, validation_dataloader, 1000)
    if evaluate_model:
        model = load_model("./model.pt")
        eval(model, validation_dataloader)


if __name__ == "__main__":
    parser = argparse.ArgumentParser("trains or runs spotify classification model")
    parser.add_argument("--train-model", action="store_true")

    parser.add_argument("--evaluate-model", action="store_true")

    args = parser.parse_args()

    main(args.train_model, args.evaluate_model)
