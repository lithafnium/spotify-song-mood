import xgboost as xgb
import pandas as pd
import numpy as np

from get_data import features, playlists
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, f1_score

from xgboost.sklearn import XGBClassifier


def fit_gridsearch(sk_model: XGBClassifier, training_data):
    parameters = {
        "max_depth": range(2, 10, 1),
        "n_estimators": range(20, 220, 40),
        "learning_rate": [0.1, 0.01, 0.05, 0.5],
    }

    grid_search = GridSearchCV(
        estimator=sk_model, param_grid=parameters, n_jobs=10, cv=10, verbose=True
    )

    grid_search.fit(training_data["X_train"], training_data["Y_train"])

    print(grid_search.best_estimator_)


def fit_xgb(sk_model: XGBClassifier, training_data, epochs: int = 1000):
    sk_model.fit(training_data["X_train"], training_data["Y_train"])

    # params = sk_model.get_xgb_params()

    # train = xgb.DMatrix(training_data["X_train"], label=training_data["Y_train"])
    # val = xgb.DMatrix(training_data["X_test"], label=training_data["Y_test"])

    # metrics = ["mlogloss", "merror"]
    # params["eval_metric"] = metrics

    # store = {}
    # evallist = [(val, "val"), (train, "train")]

    # xgb_model = xgb.train(
    #     params,
    #     train,
    #     epochs,
    #     evallist,
    #     evals_result=store,
    #     verbose_eval=100,
    # )

    print("-- Model Report --")
    print(
        "XGBoost Accuracy: "
        + str(
            accuracy_score(
                sk_model.predict(training_data["X_test"]), training_data["Y_test"]
            )
        )
    )
    print(
        "XGBoost F1-Score (Micro): "
        + str(
            f1_score(
                sk_model.predict(training_data["X_test"]),
                training_data["Y_test"],
                average="micro",
            )
        )
    )


def main():
    df = pd.read_csv("./data.csv")
    train, test = train_test_split(df, test_size=0.2, shuffle=True)

    xgb1 = XGBClassifier(
        eta=0.03,
        learning_rate=0.05,
        max_depth=5,
        n_estimators=140,
        min_child_weight=1,
        gamma=0,
        subsample=0.8,
        colsample_bytree=0.8,
        objective="multi:softmax",
        nthread=4,
        num_class=len(playlists),
        seed=37,
        use_label_encoder=False,
    )

    training_data = {
        "X_train": train[features[1:]],
        "Y_train": train["mood"],
        "X_test": test[features[1:]],
        "Y_test": test["mood"],
    }

    # fit_gridsearch(xgb1, training_data)
    fit_xgb(xgb1, training_data)


if __name__ == "__main__":
    main()
