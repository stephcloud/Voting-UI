localStorage.clear();

let votes = {
    Amara: 0,
    Rita: 0,
    Loveth: 0,
    Steph: 0
};

const voters = new Set();
const form = document.getElementById("voteForm");
const voterName = document.getElementById("voterName");
const candidate = document.getElementById("candidate");
const totalVotes = document.getElementById("totalVotes");
const AmaraVotes = document.getElementById("LilianVotes");
const RitaVotes = document.getElementById("AustinVotes");
const LovethVotes = document.getElementById("KosiVotes");
const StephVotes = document.getElementById("DavidVotes");

const winnerModal = document.getElementById("winnerModal");
const winnerName = document.getElementById("winnerName");
const closeModal = document.getElementById("closeModal");

const leaderboard = document.getElementById("leaderboard");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = voterName.value.trim();
    const selected = candidate.value;

    if (name === "" || selected === "") {
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

function updateVoteCount() {

    AmaraVotes.textContent = votes.Amara;
    RitaVotes.textContent = votes.Rita;
    LovethVotes.textContent = votes.Loveth;
    StephVotes.textContent = votes.Steph;

    const total =
        votes.Amara +
        votes.Rita +
        votes.Loveth +
        votes.Steph;

    totalVotes.textContent = total;

    updateLeaderboard();

}

function updateLeaderboard() {

    leaderboard.innerHTML = "";

    Object.entries(votes)
        .sort((a, b) => b[1] - a[1])
        .forEach(([name, score]) => {

            leaderboard.innerHTML += `

            <div class="flex justify-between bg-gray-100 p-3 rounded-lg mt-2">

                <span>${name}</span>

                <span>${score}</span>

            </div>

            `;

        });

}

function showWinner() {

    let winner = "";
    let highest = -1;

    for (let person in votes) {

        if (votes[person] > highest) {

            highest = votes[person];
            winner = person;

        }

    }

    winnerName.innerHTML = `

    <div class="text-6xl">🏆</div>

    <h2 class="text-3xl font-bold text-green-600 mt-3">

    ${winner}

    </h2>

    <p class="text-xl mt-3">

    ${highest} Vote(s)

    </p>

    `;

    winnerModal.classList.remove("hidden");

}

closeModal.addEventListener("click", function () {

    winnerModal.classList.add("hidden");

});


const clock = document.getElementById("clock");

setInterval(function () {

    clock.textContent = new Date().toLocaleTimeString();

}, 1000);

updateVoteCount();