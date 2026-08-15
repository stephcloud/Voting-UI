interface Votes {
  Amara: number;
  Rita: number;
  Loveth: number;
  Steph: number;
}

type CandidateName = keyof Votes;

localStorage.clear();

let votes: Votes = {
  Amara: 0,
  Rita: 0,
  Loveth: 0,
  Steph: 0,
};

const voters = new Set<string>();

const form = document.getElementById("voteForm") as HTMLFormElement;
const voterName = document.getElementById("voterName") as HTMLInputElement;
const candidate = document.getElementById("candidate") as HTMLSelectElement;
const totalVotesEl = document.getElementById("totalVotes") as HTMLElement;
const AmaraVotesEl = document.getElementById("AmaraVotes") as HTMLElement;
const RitaVotesEl = document.getElementById("RitaVotes") as HTMLElement;
const LovethVotesEl = document.getElementById("LovethVotes") as HTMLElement;
const StephVotesEl = document.getElementById("StephVotes") as HTMLElement;
const winnerModal = document.getElementById("winnerModal") as HTMLElement;
const winnerNameEl = document.getElementById("winnerName") as HTMLElement;
const closeModal = document.getElementById("closeModal") as HTMLElement;
const leaderboard = document.getElementById("leaderboard") as HTMLElement;

const barColors: Record<CandidateName, string> = {
  Amara: "bg-emerald-600",
  Rita: "bg-emerald-500",
  Loveth: "bg-emerald-400",
  Steph: "bg-lime-500",
};

form.addEventListener("submit", function (e: SubmitEvent) {
  e.preventDefault();
  const name = voterName.value.trim();
  const selected = candidate.value as CandidateName;

  if (name === "" || !(selected in votes)) {
    alert("Complete the form.");
    return;
  }
  if (voters.has(name.toLowerCase())) {
    alert("You have already voted.");
    return;
  }

  voters.add(name.toLowerCase());
  votes[selected]++;
  updateVoteCount();
  showWinner();
  form.reset();
});

function updateVoteCount(): void {
  AmaraVotesEl.textContent = votes.Amara.toString();
  RitaVotesEl.textContent = votes.Rita.toString();
  LovethVotesEl.textContent = votes.Loveth.toString();
  StephVotesEl.textContent = votes.Steph.toString();

  const total = votes.Amara + votes.Rita + votes.Loveth + votes.Steph;
  totalVotesEl.textContent = total.toString();
  updateLeaderboard(total);
}

function updateLeaderboard(total: number): void {
  leaderboard.innerHTML = "";

  (Object.entries(votes) as [CandidateName, number][])
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, score]) => {
      const pct = total > 0 ? Math.round((score / total) * 100) : 0;
      leaderboard.innerHTML += `
        <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
          <div class="flex justify-between text-sm text-emerald-900 mb-1">
            <span class="font-semibold">${name}</span>
            <span>${score}</span>
          </div>
          <div class="w-full bg-emerald-100 rounded-full h-2">
            <div class="bar-fill ${barColors[name]} h-2 rounded-full" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    });
}

function showWinner(): void {
  let winner: CandidateName | "" = "";
  let highest = -1;

  for (const person in votes) {
    const typedPerson = person as CandidateName;
    if (votes[typedPerson] > highest) {
      highest = votes[typedPerson];
      winner = typedPerson;
    }
  }

  winnerNameEl.innerHTML = `
    <div class="text-6xl">⬡</div>
    <h2 class="font-display text-3xl font-bold text-emerald-700 mt-3">
      ${winner}
    </h2>
    <p class="text-xl mt-3 text-emerald-800">
      ${highest} Vote(s)
    </p>
  `;
  winnerModal.classList.remove("hidden");
}

closeModal.addEventListener("click", function () {
  winnerModal.classList.add("hidden");
});

const clock = document.getElementById("clock") as HTMLElement;
setInterval(function () {
  clock.textContent = new Date().toLocaleTimeString();
}, 1000);

updateVoteCount();