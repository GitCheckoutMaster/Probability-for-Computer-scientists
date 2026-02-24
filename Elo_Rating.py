from scipy.stats import norm

def define_player():
    mean = float(input("Enter the player's rating: "))
    # variance is the square of the standard deviation
    std_dev = float(input("Enter the player's standard deviation: "))
    return {"mean": mean, "std_dev": std_dev}


def calculate_win_probability_sampling(player1, player2):
    samples1 = get_samples(player1)
    samples2 = get_samples(player2)

    player1_wins = 0
    player2_wins = 0
    for i in range(len(samples1)):
        if samples1[i] > samples2[i]:
            player1_wins += 1
        elif samples1[i] < samples2[i]:
            player2_wins += 1
    
    return player1_wins / len(samples1), player2_wins / len(samples2)


def get_samples(player, num_samples=10000):
    return norm.rvs(loc=player["mean"], scale=player["std_dev"], size=num_samples)


if __name__ == "__main__":
    print("Define Player 1:")
    player1 = define_player()
    
    print("\nDefine Player 2:")
    player2 = define_player()
    
    p1_win_prob, p2_win_prob = calculate_win_probability_sampling(player1, player2)
    print(f"Player 1 win probability: {p1_win_prob}")
    print(f"Player 2 win probability: {p2_win_prob}")
