'''
Well, somehow this is correct, and i understand why in code but in theory (without numbers) i still don't quite understand why the answer is O(n log n).
math is really weird, probability to be specific.
'''

import matplotlib.pyplot as plt
import numpy as np
import random

n = 5
p = 1/n
reps = 10000
X = []

for i in range(1, reps):
    trial = [0] * n
    count = 0
    while sum(trial) < n:
        random_bucket = random.randint(1, n)
        trial[random_bucket-1] = 1
        count += 1

    X.append(count)

X = np.array(X)

print(f"Mean: {np.mean(X)}")

plt.hist(X, bins=100, color='skyblue', edgecolor='black')
plt.title('Frequency Histogram')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()
