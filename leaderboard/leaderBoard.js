document.addEventListener("DOMContentLoaded", () => {
    const leaderboardData = [
      {
        player: "Alice",
        image:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        score: 300,
      },
      {
        player: "Bob",
        image:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        score: 250,
      },
      {
        player: "Charlie",
        image:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        score: 200,
      },
      {
        player: "Dave",
        image:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        score: 150,
      },
      {
        player: "Eve",
        image:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        score: 100,
      },
      {
        player: "Eve",
        image:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
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
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        score: 400,
      });
      updateLeaderboard(leaderboardData);
    }, 5000);
  });