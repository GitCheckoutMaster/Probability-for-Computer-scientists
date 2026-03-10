'''
In this program, I am going to create a email spam detector using the naive bayes algorithm that I just learned. (Without scikit-learn)
'''

import csv
import math
import re

X = []  # features (text)
y = []  # labels (spam or ham)

def tokenize(text):
    return re.findall(r"[a-zA-Z]+", text.lower())

# reading the data from csv file downloaded from kaggle
with open('data/spam.csv', 'r') as f:
    csv_reader = csv.reader(f)
    for row in csv_reader:
        X.append(tokenize(row[1]))
        y.append(1 if row[0] == "spam" else 0)


class NaiveBayes:
    def __init__(self):
        self.feature_counts = {}
        self.count_of_success = 0
        self.n = 0

    def fit(self, X, y):
        self.n = len(y)

        # counting the prior (this is then divided by n to get the prior probability)
        for label in y:
            self.count_of_success += label
        
        '''
        structure for feature_counts:
            {
                "feature1": [failure_count, success_count],
                "feature2": [failure_count, success_count],
                ...
            }
        '''
        for i, features in enumerate(X):
            for feature in features:
                if feature not in self.feature_counts:
                    self.feature_counts[feature] = [0, 0]
                
                if y[i] == 1:
                    self.feature_counts[feature][1] += 1 
                else:
                    self.feature_counts[feature][0] += 1 


    def predict(self, X, y=1):
        '''
            The main idea is:
            P(y|X) = P(y) * P(Xi|y)
                      ^        ^
                      |        |
                  this is    This is the likelihood, which we are calculating here
                  the prior  p(Xi|y) is probability of feature Xi and y together / probability of y
        '''
        log_likelihood = 0

        for feature in X:
            if feature in self.feature_counts:
                success_count = self.feature_counts[feature][1]
                failure_count = self.feature_counts[feature][0]

                if y == 1:
                    log_likelihood += math.log((success_count + 1) / (self.count_of_success+2))
                else:
                    log_likelihood += math.log((failure_count + 1) / ((self.n - self.count_of_success) + 2))

        return math.log((self.count_of_success if y == 1 else self.n - self.count_of_success) / self.n) + log_likelihood


if __name__ == "__main__":
    model = NaiveBayes()
    model.fit(X, y)

    test_email = "Congratulations! You've won a free ticket to the Bahamas. Click here to claim your prize."
    test_features = tokenize(test_email)

    spam_score = model.predict(test_features, y=1)
    ham_score = model.predict(test_features, y=0)

    if spam_score > ham_score:
        print(f"The email is classified as SPAM.(spam score: {spam_score}, ham score: {ham_score})")
    else:        
        print(f"The email is classified as HAM.(spam score: {spam_score}, ham score: {ham_score})")

    test_email2 = "Hey, are we still on for the meeting tomorrow?"
    test_features2 = tokenize(test_email2)
    spam_score2 = model.predict(test_features2, y=1)
    ham_score2 = model.predict(test_features2, y=0)

    if spam_score2 > ham_score2:
        print(f"The email is classified as SPAM.(spam score: {spam_score2}, ham score: {ham_score2})")
    else:
        print(f"The email is classified as HAM.(spam score: {spam_score2}, ham score: {ham_score2})")

