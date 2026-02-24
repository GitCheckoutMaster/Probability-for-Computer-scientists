import numpy as np
import matplotlib.pyplot as plt

mu = 16
sd = 5

'''
Q. What this program does?
    A. This program proves the CLT(central limit theorem). 
       First it takes sample from the normal distribution (even if it is not a normal it works the same way, means sample mean will always ends up as normal thats what CLT is about) 'reps' times (ex. it pulls 5 random samples 5 times) and each time, it finds its mean (means 5 samples 5 times makes 5 means) and if we pull enough samples and plot it, it will always ends up in a normal.....
       THAT IS THE BEAUTY (aka weirdness) OF CLT.
'''
n = 50  # this means number of samples
reps = 10000  # this means number of times we get those samples

sample_means = []

for i in range(reps):
    sample = np.random.normal(mu, sd, n)
    sample_mean = np.mean(sample)
    sample_means.append(sample_mean)

sample_means = np.array(sample_means)

# plot the sample mean 
plt.hist(sample_means, bins=40, density=True)
plt.xlabel("Sample mean")
plt.ylabel("Density")
plt.title("Distribution of sample means")
plt.show()

'''
Now lets ask a weird question, what is the mean of means?
First, what it should be? What does it represent?
Mean of the mean is the mu, which is 16 at the start, or at least what it should be. E[X-bar] = mu

Now lets see what that actually is....
'''
print(np.mean(sample_means))
'''
If the samples are enough, it will be very close to 16 and if the samples and reps are infinit it should be 16
But what about the variance of sampled mean? 
well, according to CLT it should be SD^2 / n, so lets see...
'''
print(np.std(sample_means))
