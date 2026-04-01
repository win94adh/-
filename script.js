document.addEventListener("DOMContentLoaded", () => {

  const saveBtn = document.getElementById("saveSelection");
  const resetBtn = document.getElementById("resetSelection");

  const scoresDiv = document.getElementById("scores");
  const newsDiv = document.getElementById("newsList");

  const teamButtons = document.querySelectorAll("#teamButtons button");
  const leagueButtons = document.querySelectorAll("#leagueButtons button");

  let selectedTeam = localStorage.getItem("team") || "";
  let selectedLeague = localStorage.getItem("league") || "";
  let locked = localStorage.getItem("locked") === "true";

  init();

  function init() {
    highlightSelected();

    if (locked) lockSelection();

    if (selectedTeam || selectedLeague) {
      displayScores(selectedTeam, selectedLeague);
      displayNews(selectedTeam, selectedLeague);
    }
  }

  // 🔥 팀 선택 (푸시락)
  teamButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (locked) return;

      if (selectedTeam === btn.dataset.team) {
        selectedTeam = "";
      } else {
        selectedTeam = btn.dataset.team;
      }

      highlightSelected();
    });
  });

  // 🔥 리그 선택 (푸시락)
  leagueButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (locked) return;

      if (selectedLeague === btn.dataset.league) {
        selectedLeague = "";
      } else {
        selectedLeague = btn.dataset.league;
      }

      highlightSelected();
    });
  });

  // 저장
  saveBtn.addEventListener("click", () => {
    if (!selectedTeam || !selectedLeague) {
      alert("팀과 리그를 모두 선택하세요!");
      return;
    }

    localStorage.setItem("team", selectedTeam);
    localStorage.setItem("league", selectedLeague);
    localStorage.setItem("locked", "true");

    lockSelection();

    displayScores(selectedTeam, selectedLeague);
    displayNews(selectedTeam, selectedLeague);
  });

  // 다시 고르기
  resetBtn.addEventListener("click", () => {
    localStorage.clear();

    selectedTeam = "";
    selectedLeague = "";
    locked = false;

    unlockSelection();
    highlightSelected();

    scoresDiv.innerHTML = "";
    newsDiv.innerHTML = "";
  });

  function lockSelection() {
    locked = true;
    teamButtons.forEach(btn => btn.classList.add("disabled"));
    leagueButtons.forEach(btn => btn.classList.add("disabled"));
  }

  function unlockSelection() {
    teamButtons.forEach(btn => btn.classList.remove("disabled"));
    leagueButtons.forEach(btn => btn.classList.remove("disabled"));
  }

  function highlightSelected() {
    teamButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.team === selectedTeam);
    });

    leagueButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.league === selectedLeague);
    });
  }

  function displayScores(team, league) {
    scoresDiv.innerHTML = `
      <p><strong>${team}</strong> 최근 경기</p>
      <ul>
        <li>${team} 2 : 1 상대팀</li>
        <li>${team} 0 : 0 상대팀</li>
      </ul>

      <p><strong>${league}</strong> 리그 경기</p>
      <ul>
        <li>경기 A - 3:2</li>
        <li>경기 B - 1:1</li>
      </ul>
    `;
  }

  function displayNews(team, league) {
    newsDiv.innerHTML = `
      <p><strong>${team}</strong> 뉴스</p>
      <ul>
        <li>${team} 경기 분석</li>
        <li>${team} 선수 인터뷰</li>
      </ul>

      <p><strong>${league}</strong> 뉴스</p>
      <ul>
        <li>${league} 이적시장</li>
        <li>${league} 경기 리뷰</li>
      </ul>
    `;
  }

});