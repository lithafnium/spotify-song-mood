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
from get_data import features, playlists, search_song, setup, playlists
from pt_model import SpotifyMoodModel

"""
Model will use 
- cross entropy 
- 2 hidden layers? 
"""


def load_model(path):
    model = SpotifyMoodModel(len(features[1:]), len(playlists))
    model.load_state_dict(torch.load(path))

    return model


def main(song_title: str):
    # pp = pprint.PrettyPrinter(indent=4)
    print("Title:", song_title)
    model = load_model("./model.pt")
    model.eval()

    sp = setup()

    audio_features = torch.tensor(search_song(sp, song_title))
    audio_features = torch.unsqueeze(audio_features, 0)
    print(f"Audio features for {song_title}: {audio_features}")
    y_val_pred = model(audio_features)
    y_pred_softmax = torch.log_softmax(y_val_pred, dim=1)
    _, y_pred_tags = torch.max(y_pred_softmax, dim=1)

    print(f"Song mood for {song_title}: {playlists[y_pred_tags.item()]['mood']}")
    # print(y_pred_tags.item())


if __name__ == "__main__":
    parser = argparse.ArgumentParser("trains or runs spotify classification model")
    parser.add_argument("--song-title", type=str)

    args = parser.parse_args()

    main(args.song_title)
