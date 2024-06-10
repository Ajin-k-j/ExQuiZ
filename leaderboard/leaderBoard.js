document.addEventListener("DOMContentLoaded", () => {
    const leaderboardData = [
      {
        player: "Alice",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 300,
      },
      {
        player: "Bob",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 250,
      },
      {
        player: "Charlie",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 200,
      },
      {
        player: "Dave",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 150,
      },
      {
        player: "Eve",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 100,
      },
      {
        player: "Eve",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 100,
      },
    ];

    const leaderboard = document.getElementsByTagName("tbody")[0];

    function updateLeaderboard(data) {
      leaderboard.innerHTML = "";
      data
        .sort((a, b) => b.score - a.score)
        .forEach((entry, index) => {
          const row = leaderboard.insertRow();
          const rankCell = row.insertCell(0);
          const playerCell = row.insertCell(1);
          const scoreCell = row.insertCell(2);
          rankCell.textContent = index + 1;
          const playerInfo = document.createElement("div");
          playerInfo.classList.add("player-info");
          const playerImage = document.createElement("img");
          playerImage.src = entry.image;
          playerImage.alt = entry.player;
          playerInfo.appendChild(playerImage);
          const playerName = document.createElement("span");
          playerName.textContent = entry.player;
          playerInfo.appendChild(playerName);
          playerCell.appendChild(playerInfo);
          scoreCell.textContent = entry.score;
        });
    }

    updateLeaderboard(leaderboardData);

    // Example of updating the leaderboard
    setTimeout(() => {
      leaderboardData.push({
        player: "Frank",
        image:
          "https://th.bing.com/th?id=OIP.L8bs33mJBAUBA01wBfJnjQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        score: 400,
      });
      updateLeaderboard(leaderboardData);
    }, 5000);
  });