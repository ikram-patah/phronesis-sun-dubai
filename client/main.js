import RebillyInstruments from "@rebilly/instruments";

const deposit = {
  token: "",
  depositRequestId: "",
};

const btnDeposit = document.getElementById("js-btn-deposit");

const learnMoreModalEl = document.getElementById("learn-more-modal");
const learnMoreMdal = new bootstrap.Modal("#learn-more-modal", {
  keyboard: false,
  backdrop: "static",
});

const depositModalEl = document.getElementById("deposit-modal");
const depositModal = new bootstrap.Modal("#deposit-modal", {
  keyboard: false,
  backdrop: "static",
});

function openDepositModal() {
  depositModal.show();
}

function initiateInstrument({ token, depositRequestId }) {
  RebillyInstruments.mount({
    apiMode: "sandbox",
    deposit: {
      depositRequestId,
    },
    jwt: token,
  });
}

btnDeposit.addEventListener("click", async () => {
  learnMoreModalEl.addEventListener("hidden.bs.modal", openDepositModal);

  btnDeposit.textContent = "Processing...";
  btnDeposit.classList.add("disabled");

  try {
    const response = await fetch("http://localhost:3000/deposit-request", {
      method: "POST",
      body: JSON.stringify({ amounts: [0.2, 0.3, 0.5].map((m) => m * 150) }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { depositRequestId, token } = await response.json();
    deposit.depositRequestId = depositRequestId;
    deposit.token = token;
  } catch (error) {
    console.log(error);
  }
  learnMoreMdal.hide();
});

depositModalEl.addEventListener("shown.bs.modal", () => {
  btnDeposit.textContent = "Deposit";
  btnDeposit.classList.remove("disabled");
  learnMoreModalEl.removeEventListener("hidden.bs.modal", openDepositModal);
  initiateInstrument({ token: deposit.token, depositRequestId: deposit.depositRequestId });
});
